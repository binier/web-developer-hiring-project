import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { asyncScheduler, Subject, of, merge } from 'rxjs';
import { map, switchMap, startWith, catchError, share, takeUntil } from 'rxjs/operators';
import { Policy, PolicyEditInput, PolicyCreateInput } from '@app/types';
import { PolicyService } from '@app/services';

function floatCompare(a: number, b: number, precision = 10) {
  [a, b] = [a, b].map(x => Math.floor(x * precision));
  return a > b ? 1 : (a < b ? -1 : 0);
}

@Component({
  selector: 'app-policy-edit',
  templateUrl: './policy-edit.component.html',
  styleUrls: ['./policy-edit.component.scss'],
})
export class PolicyEditComponent implements OnInit, OnDestroy {
  @Input() step = 1;
  /** changes to the input won't reflect in the form */
  @Input() policy: any = {};
  @Input() isNew = !this.policy.id;

  @Output() actionStarted = new EventEmitter();
  @Output() actionDone = new EventEmitter();

  @ViewChild('paymentList') paymentListEl: ElementRef;

  destroy$ = new Subject();

  form: FormGroup;
  payments: {
    id?: Policy['id'],
    amount: number
  }[] = this.policy?.payments || [];

  dateInputOpts: IAngularMyDpOptions = {
    dateRange: false,
    openSelectorTopOfInput: true,
    dateFormat: 'dd/mm/yyyy',
  };

  invoiceDueDatePickerOpts: IAngularMyDpOptions = {
    ...this.dateInputOpts,
    openSelectorTopOfInput: false,
  };

  createPolicy$ = new Subject<PolicyCreateInput>();
  editPolicy$ = new Subject<PolicyEditInput>();

  progress$ = merge(
      this.createPolicy$.pipe(map(x => ({
        action: 'create',
        policy: x,
      }))),
      this.editPolicy$.pipe(map(x => ({
        action: 'edit',
        policy: x,
      })))
    ).pipe(
      switchMap(({ action, policy }) => {
        const obs = action === 'create'
          ? this.policySrv.createPolicy(policy as PolicyCreateInput)
          : this.policySrv.editPolicy(policy as PolicyEditInput);
        return obs.pipe(
          map(x => ({ policy: x.result, done: true })),
          catchError(error => of({ policy, error, done: true })),
          startWith({ policy, done: false })
        );
      }),
      share()
    );

  constructor(
    private fb: FormBuilder,
    private policySrv: PolicyService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      // step 1
      number: [this.policy?.number, Validators.required],
      annual_premium: [this.policy?.annual_premium, [
        Validators.required,
        Validators.min(1),
      ]],
      effective_date: [this.policy?.effective_date, Validators.required],
      status: [this.policy?.state?.status || 'active', Validators.required],
      reason: [this.policy?.state?.reason],

      // step 2
      invoice_amount: [this.policy?.invoice?.amount_due, [
        Validators.required,
        Validators.min(1),
      ]],
      invoice_due_on: [this.policy?.invoice?.due_on, Validators.required],
      payment: ['', Validators.min(1)],
    }, {
      validators: [this.paymentAmountValidator()],
    });

    asyncScheduler.schedule(() => this.paymentListScrollToBottom('auto'));
    this.progress$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (!data.done) {
        return this.actionStarted.emit(data);
      }
      this.actionDone.emit(data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  get isFirstStep() { return this.step === 1; }
  get isLastStep() { return this.step === 2; }
  get isValid() { return this.form.valid; }

  get step1Valid() {
    return ['number', 'annual_premium', 'effective_date', 'status', 'reason']
      .every(x => this.form.controls[x]?.valid);
  }

  get isStepValid() {
    if (this.isFirstStep)
      return this.step1Valid;

    return this.isValid;
  }

  paymentSum() {
    return this.payments.reduce((r, x) => r + x.amount, 0);
  }

  /** TODO: currently it allows submitting without payment. */
  private paymentAmountValidator() {
    return (form: FormGroup): ValidationErrors | null => {
      const sum = this.paymentSum() + (form.controls?.payment?.value || 0);
      const invoiceAmount = form.controls.invoice_amount.value;
      const sumAndInvoiceDiff = floatCompare(sum, invoiceAmount, 1000);

      if (sumAndInvoiceDiff === 1) {
        return { paymentSumTooBig: true };
      } else if (sumAndInvoiceDiff === -1) {
        return { paymentSumTooSmall: true };
      }
      return null;
    };
  }

  private paymentListScrollToBottom(behavior: 'auto' | 'smooth') {
    this.paymentListEl?.nativeElement?.scroll({
      behavior,
      top: 10000,
      left: 0,
    });
  }

  saveInputedPayment() {
    const control = this.form?.controls?.payment;
    if (!control?.valid || !control?.value) return;

    this.payments.push({ amount: control.value });
    control.reset();
    asyncScheduler.schedule(() => this.paymentListScrollToBottom('smooth'));
  }

  resetForm() {
    this.form.reset();
  }

  prevStep() {
    --this.step;
  }

  nextStep() {
    if (!this.isStepValid) return;

    if (this.isLastStep) return this.submit();

    ++this.step;
    this.paymentListScrollToBottom('auto');
  }

  formToModel(): PolicyEditInput {
    const data = this.form.getRawValue();

    return {
      id: this.policy.id,
      number: data.number,
      annual_premium: data.annual_premium,
      effective_date: data.effective_date.singleDate.jsDate,
      state: {
        id: this.policy.state?.id,
        status: data.status,
        reason: data.reason,
      },
      invoice: {
        id: this.policy.invoice?.id,
        amount_due: data.invoice_amount,
        due_on: data.invoice_due_on.singleDate.jsDate,
      },
      payments: this.payments.map(x => ({
        id: x.id,
        payment_amount: x.amount,
      })),
    };
  }

  submit() {
    if (!this.isValid) return;

    const policy = this.formToModel();

    if (this.isNew) this.createPolicy$.next(policy);
    else this.editPolicy$.next(policy);
  }
}
