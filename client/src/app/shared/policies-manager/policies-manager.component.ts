import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Policy } from '@app/types';
import { pluck } from 'rxjs/operators';
import { PolicyService } from '@app/services';

@Component({
  selector: 'app-policies-manager',
  templateUrl: './policies-manager.component.html',
  styleUrls: ['./policies-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesManagerComponent implements OnInit {
  private getPolicies$ = this.policySrv.getPolicies();

  policies$ = this.getPolicies$.pipe(pluck('policies'));

  constructor(private policySrv: PolicyService) { }

  ngOnInit(): void {
  }
}
