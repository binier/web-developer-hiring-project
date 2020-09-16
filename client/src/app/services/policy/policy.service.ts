import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as R from 'ramda';
import { asyncScheduler, interval, Observable, of } from 'rxjs';
import { PolicyRaw, Policy, PolicyCreateInput, PolicyEditInput } from '@app/types';
import { first, observeOn } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const genPolicy = (index: number): Policy => ({
  id: index * 5 + 1,
  number: `A-${index + 1}`,
  annual_premium: 107.45,
  effective_date: new Date('2020-08-28T11:36:34.441Z'),
  created: new Date('2020-08-28T11:36:34.441Z'),
  updated: new Date('2020-08-28T11:36:34.441Z'),

  state: {
    id: index * 5 + 2,
    status: 'active',
    reason: 'policy created',
    created: new Date('2020-08-28T11:36:34.441Z'),
    updated: new Date('2020-08-28T11:36:34.441Z'),
  },

  invoice: {
    id: index * 5 + 3,
    amount_due: 107.45,
    due_on: new Date('2020-08-28T11:36:34.441Z'),
    created: new Date('2020-08-28T11:36:34.441Z'),
    updated: new Date('2020-08-28T11:36:34.441Z'),
  },

  payments: [
    {
      id: index * 5 + 4,
      payment_amount: 100,
      created: new Date('2020-08-28T11:36:34.441Z'),
      updated: new Date('2020-08-28T11:36:34.441Z'),
    },
    {
      id: index * 5 + 5,
      payment_amount: 7.45,
      created: new Date('2020-08-28T11:36:34.441Z'),
      updated: new Date('2020-08-28T11:36:34.441Z'),
    },
  ],
});

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  readonly API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getPolicies({
    offset = 0,
    limit = 10,
    sortField = 'number',
    sortRev = false,
  }): Observable<{
    policies: Policy[],
    policiesTotalCount: number,
  }> {
    let policies = [...Array(limit)]
      .map((_, i) => genPolicy(offset + i));

    policies = R.sort(R.path(sortField.split('.')), policies);
    if (sortRev) policies = policies.reverse();

    return of({
      policies,
      policiesTotalCount: 85,
    }).pipe(observeOn(asyncScheduler));
  }

  createPolicy(policy: PolicyCreateInput) {
    return this.http.post<{ result: PolicyRaw }>(
      `${this.API_URL}/policy`,
      policy
    );
  }
}
