import {
  Policy as PolicyRaw,
  State,
  Invoice,
  Payment,
  PolicyCreateInput as _PolicyCreateInput,
  StateCreateInput,
  InvoiceCreateInput,
  PaymentCreateInput,
} from './schema-types';

export { PolicyRaw };

export interface Policy extends PolicyRaw {
  state: Omit<State, 'policy_id'>;
  invoice: Omit<Invoice, 'policy_id'>;
  payments: Omit<Payment, 'policy_id'>[];
}

type PolicyCreateInputPaymentType = Omit<PaymentCreateInput, 'policy'>;

export interface PolicyCreateInput extends Omit<_PolicyCreateInput, 'state' | 'invoice' | 'payments'> {
  state: Omit<StateCreateInput, 'policy'>;
  invoice: Omit<InvoiceCreateInput, 'policy'>;
  payments: PolicyCreateInputPaymentType[];
}

export interface PolicyEditInput extends Omit<_PolicyCreateInput, 'state' | 'invoice' | 'payments'> {
  id: Policy['id'];
  state: PolicyCreateInput['state'] & { id?: State['id'] };
  invoice: PolicyCreateInput['invoice'] & { id?: Invoice['id'] };
  payments: (PolicyCreateInputPaymentType & { id?: Invoice['id'] })[];
}
