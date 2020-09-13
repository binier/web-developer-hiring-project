import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Policy, Payment } from '@app/types';
import { BehaviorSubject, combineLatest, ReplaySubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators';
import { ModalComponent } from '../modal/modal.component';
import { PolicyService } from '@app/services';
import { SortEvent } from '@shared/policies-table/policies-table.component';

@Component({
  selector: 'app-policies-manager',
  templateUrl: './policies-manager.component.html',
  styleUrls: ['./policies-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesManagerComponent implements OnInit {
  offset$ = new BehaviorSubject(0);
  limit$ = new BehaviorSubject(10);
  sort$ = new ReplaySubject<SortEvent>(1);

  getPoliciesOptions$ = combineLatest([
      this.offset$,
      this.limit$,
      this.sort$,
    ]).pipe(
      distinctUntilChanged((prev, cur) => {
        return prev.every((x, i) => x === cur[i]);
      }),
      map(x => ({
        offset: x[0],
        limit: x[1],
        sortField: x[2].column,
        sortRev: x[2].rev,
      })),
    );

  private getPolicies$ = this.getPoliciesOptions$.pipe(
    switchMap(x => this.policySrv.getPolicies(x)),
  );
  policies$: Observable<Policy[]> = this.getPolicies$.pipe(
    pluck('policies'),
  );

  currentPolicy$ = new BehaviorSubject<Policy>(null);

  @ViewChild('paymentsModel', { static: true })
  paymentsModel: ModalComponent;

  constructor(private policySrv: PolicyService) { }

  ngOnInit(): void {
  }

  paymentsSum({ payments }: { payments: Payment[] }): number {
    return payments.reduce((r, x) => r + x.payment_amount, 0);
  }

  policyClick({ policy, column }: {
    policy: Policy,
    column: string,
  }): void {
    if (column === 'payments') {
      this.currentPolicy$.next(policy);
      this.paymentsModel.open();
    }
  }
}
