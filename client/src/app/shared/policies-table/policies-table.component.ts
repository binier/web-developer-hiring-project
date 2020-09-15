import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { asyncScheduler, BehaviorSubject, combineLatest, merge, Observable, Subject, Subscription } from 'rxjs';
import { Policy } from '@app/types';
import { distinctUntilChanged, filter, map, scan, startWith } from 'rxjs/operators';

export interface SortEvent {
  column: string;
  rev: boolean;
}

@Component({
  selector: 'app-policies-table',
  templateUrl: './policies-table.component.html',
  styleUrls: ['./policies-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliciesTableComponent implements OnInit, OnDestroy {
  @Input() policies: Policy[] = [];

  @Output() policyClick = new EventEmitter<{
    policy: Policy,
    column: string,
  }>();
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() selectedChange = new EventEmitter<Set<Policy['id']>>();

  private subs: Subscription[] = [];

  toggleAllSelected$ = new Subject<undefined | boolean>();
  toggleSelected$ = new Subject<Policy['id']>();

  selectedIDsSet$ = merge(
      this.toggleAllSelected$.pipe(map(flag => ({
        event: 'toggleAll' as const,
        data: { flag },
      }))),
      this.toggleSelected$.pipe(map(id => ({
        event: 'toggle' as const,
        data: { id },
      })))
    )
    .pipe(
      scan((cur, { event, data }) => {
        if (event === 'toggle' && 'id' in data) {
          cur = new Set(cur);
          cur.has(data.id) ? cur.delete(data.id) : cur.add(data.id);
        } else if (event === 'toggleAll') {
          if (('flag' in data && data.flag) || this.isAllSelected(cur))
            return new Set();
          else
            return new Set(this.policies.map(({ id }) => id));
        }
        return cur;
      }, new Set<Policy['id']>()),
      startWith(new Set<any>(), asyncScheduler)
    );

  isAllSelected$: Observable<boolean> = this.selectedIDsSet$.pipe(
    map(selected => this.isAllSelected(selected))
  );

  private sortColumn$ = new BehaviorSubject<string>(null);
  private sortRev$ = new BehaviorSubject<boolean>(null);

  sort$ = combineLatest([this.sortColumn$, this.sortRev$])
    .pipe(
      filter(opts => opts.every(x => x !== null)),
      distinctUntilChanged((prev, cur) => {
        return prev.every((x, i) => x === cur[i]);
      }),
      map(([column, rev]) => ({ column, rev }))
    );

  constructor() { }

  ngOnInit(): void {
    this.subs.push(
      this.sort$.subscribe(x => this.sort.emit(x)),
      this.selectedIDsSet$.subscribe(x => this.selectedChange.emit(x))
    );
    this.doSort('number', false);
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }

  isAllSelected(selected: Set<Policy['id']>) {
    return this.policies.every(({ id }) => selected.has(id));
  }

  clickPolicy(policy: Policy, column: string) {
    this.policyClick.emit({ policy, column });
  }

  doSort(column: string, rev?: boolean): void {
    if (typeof rev !== 'boolean') {
      if (column === this.sortColumn$.value)
        rev = !this.sortRev$.value;
      else
        rev = false;
    }
    this.sortColumn$.next(column);
    this.sortRev$.next(rev);
  }
}
