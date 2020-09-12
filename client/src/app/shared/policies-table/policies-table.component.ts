import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Policy } from '@app/types';

@Component({
  selector: 'app-policies-table',
  templateUrl: './policies-table.component.html',
  styleUrls: ['./policies-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesTableComponent implements OnInit {
  @Input() policies: Policy[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
