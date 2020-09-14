import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { Policy } from '@app/types';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

export interface SortEvent {
  column: string;
  rev: boolean;
}

@Component({
  selector: 'app-policies-table',
  templateUrl: './policies-table.component.html',
  styleUrls: ['./policies-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesTableComponent implements OnInit, OnDestroy {
  @Input() policies: Policy[] = [];

  @Output() policyClick = new EventEmitter<{
    policy: Policy,
    column: string,
  }>();
  @Output() sort = new EventEmitter<SortEvent>();

  private subs: Subscription[] = [];

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
      this.sort$.subscribe(x => this.sort.emit(x))
    );
    this.doSort('number', false);
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
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
