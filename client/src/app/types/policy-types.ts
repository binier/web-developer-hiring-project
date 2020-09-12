import {
  Policy as PolicyRaw,
  State,
  Invoice,
  Payment,
} from './schema-types';

export { PolicyRaw };

export interface Policy extends PolicyRaw {
  state: State;
  invoice: Invoice;
  payments: Payment[];
}
