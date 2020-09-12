import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';
import { Policy } from '@app/types';

@Component({
  selector: 'app-policies-table',
  templateUrl: './policies-table.component.html',
  styleUrls: ['./policies-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesTableComponent implements OnInit {
  @Input() policies: Policy[] = [];

  @Output() policyClick = new EventEmitter<{
    policy: Policy,
    column: string,
  }>();

  constructor() { }

  ngOnInit(): void {
  }

  clickPolicy(policy: Policy, column: string) {
    this.policyClick.emit({ policy, column });
  }
}
