import R from 'ramda';
import {
  prisma,
  PolicyCreateInput,
  InvoiceCreateWithoutPolicyInput,
  StateCreateWithoutPolicyInput,
  PaymentCreateWithoutPolicyInput,
} from '@app/prisma';

export interface GetPoliciesArgs {
  limit?: number;
  offset?: number;
  sortField?: string;
  sortRev?: boolean;
}

export async function getPolicies({
  limit = 10,
  offset = 0,
  sortField = 'number',
  sortRev = false,
}: GetPoliciesArgs = {}) {
  console.log({limit, offset, sortField, sortRev})
  const policies = await prisma.policy.findMany({
    include: {
      states: {
        orderBy: { updated: 'desc' },
        take: 1,
      },
      invoice: true,
      payments: true,
    },
    orderBy: {
      [sortField]: sortRev ? 'desc' : 'asc',
    },
    take: limit,
    skip: offset,
  });

  return policies.map(policy => ({
    ...R.omit(['states'], policy),
    state: policy.states[0],
  }));
}

export function getPoliciesTotalCount() {
  return prisma.policy.count();
}

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
