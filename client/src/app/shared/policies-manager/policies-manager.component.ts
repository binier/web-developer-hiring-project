import { ChangeDetectionStrategy, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Policy, Payment } from '@app/types';
import { BehaviorSubject, combineLatest, ReplaySubject, Observable, Subject, merge, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, share, switchMap } from 'rxjs/operators';
import { ModalComponent } from '../modal/modal.component';
import { PolicyService } from '@app/services';
import { SortEvent } from '@shared/policies-table/policies-table.component';

@Component({
  selector: 'app-policies-manager',
  templateUrl: './policies-manager.component.html',
  styleUrls: ['./policies-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliciesManagerComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  setPage$ = new Subject<number>();
  setLimit$ = new Subject<number>();

  setPoliciesTotalCount$ = new Subject<number>();

  limit$ = merge(this.setLimit$, of(10)).pipe(filter(x => x > 0));
  sort$ = new ReplaySubject<SortEvent>(1);

  policiesTotalCount$ = merge(this.setPoliciesTotalCount$, of(10));
  policiesTotalPages$ = combineLatest([
      this.policiesTotalCount$,
      this.limit$,
    ])
    .pipe(
      map(([count, limit]) => Math.ceil(count / limit))
    );

  page$ = combineLatest([
      merge(this.setPage$, of(1)),
      this.policiesTotalPages$,
    ])
    .pipe(
      filter(([page, total]) => this.isPageValid(page, total)),
      map(([page]) => page)
    );

  getPoliciesOptions$ = combineLatest([
      this.page$,
      this.limit$,
      this.sort$,
    ]).pipe(
      distinctUntilChanged((prev, cur) => {
        return prev.every((x, i) => x === cur[i]);
      }),
      map(x => ({
        offset: (x[0] - 1) * x[1],
        limit: x[1],
        sortField: x[2].column,
        sortRev: x[2].rev,
      }))
    );

  private getPolicies$ = this.getPoliciesOptions$.pipe(
    switchMap(x => this.policySrv.getPolicies(x)),
    share()
  );
  policies$: Observable<Policy[]> = this.getPolicies$.pipe(
    pluck('policies')
  );

  paginationPages$ = combineLatest([
      this.page$,
      this.policiesTotalPages$,
    ]).pipe(
      map(([page, total]) => {
        if (page === 1)
          return [1, 2, 3];
        if (page === total)
          return [page - 2, page - 1, page];
        return [page - 1, page, page + 1];
      })
    );

  selectedPolicyIDs$ = new BehaviorSubject<Set<Policy['id']>>(new Set());
  selectedPolicyIDsOnPage$: Observable<Policy['id'][]> = combineLatest([
      this.policies$,
      this.selectedPolicyIDs$,
    ])
    .pipe(
      map(([ policies, selectedIDs ]) => {
        return policies
          .map(x => x.id)
          .filter(x => selectedIDs.has(x));
      })
    );
  selectedPolicyCountOnPage$ = this.selectedPolicyIDsOnPage$
    .pipe(map(x => x.length));

  currentPolicy$ = new BehaviorSubject<Policy>(null);

  @ViewChild('paymentsModel', { static: true })
  paymentsModel: ModalComponent;

  constructor(private policySrv: PolicyService) { }

  ngOnInit(): void {
    this.subs.push(this.getPolicies$
      .pipe(pluck('policiesTotalCount'))
      .subscribe(this.setPoliciesTotalCount$)
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
    this.subs = [];
  }

  paymentsSum({ payments }: { payments: Payment[] }): number {
    return payments.reduce((r, x) => r + x.payment_amount, 0);
  }

  isPageValid(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
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
