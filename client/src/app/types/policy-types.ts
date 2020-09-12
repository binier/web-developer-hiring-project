import {
  Policy as PolicyRaw,
  State,
  Invoice,
  Payment,
} from './schema-types';

export { PolicyRaw };

export interface Policy extends PolicyRaw {
  state: Omit<State, 'policy_id'>;
  invoice: Omit<Invoice, 'policy_id'>;
  payments: Omit<Payment, 'policy_id'>[];
}
