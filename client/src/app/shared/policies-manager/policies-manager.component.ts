import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Policy } from '@app/types';
import { BehaviorSubject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Payment } from '@app/types';
import { ModalComponent } from '../modal/modal.component';
import { PolicyService } from '@app/services';

@Component({
  selector: 'app-policies-manager',
  templateUrl: './policies-manager.component.html',
  styleUrls: ['./policies-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesManagerComponent implements OnInit {
  private getPolicies$ = this.policySrv.getPolicies();
  currentPolicy$ = new BehaviorSubject<Policy>(null);

  policies$ = this.getPolicies$.pipe(pluck('policies'));

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
