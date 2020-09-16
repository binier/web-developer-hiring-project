import {
  prisma,
  PolicyCreateInput,
  InvoiceCreateWithoutPolicyInput,
  StateCreateWithoutPolicyInput,
  PaymentCreateWithoutPolicyInput,
} from '@app/prisma';

export function createPolicy(
  policy: PolicyCreateInput,
  invoice: InvoiceCreateWithoutPolicyInput,
  state: StateCreateWithoutPolicyInput,
  payments: PaymentCreateWithoutPolicyInput
) {
  return prisma.policy.create({
    data: {
      ...policy,
      invoice: { create: invoice },
      states: { create: state },
      payments: { create: payments },
    },
  });
}
