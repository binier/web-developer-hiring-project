import { Router } from 'express';
import {
  getPolicies,
  getPoliciesTotalCount,
  createPolicy,
} from '@app/services';

export function policyRouter() {
  const router = Router();

  router.post('/list', async (req, res, next) => {
    const policiesPromise = getPolicies({
      limit: Math.min(parseInt(req.body.limit) || Infinity, 20),
      offset: Math.max(parseInt(req.body.offset) || 0, 0),
      sortField: req.body.sortField || 'number',
      sortRev: !!req.body.sortRev,
    });
    const policiesTotalCountPromise = getPoliciesTotalCount();

    Promise.all([ policiesPromise, policiesTotalCountPromise ])
      .then(([policies, policiesTotalCount]) => res.json(
        { result: { policies, policiesTotalCount } }
      ))
      .catch((x: any) => next(x));
  });

  router.post('/', (req, res, next) => {
    const policy = {
      number: req.body.number,
      annual_premium: req.body.annual_premium,
      effective_date: req.body.effective_date,
    };

    const invoice = {
      amount_due: req.body.invoice?.amount_due,
      due_on: req.body.invoice?.due_on,
    };

    const state = {
      status: req.body.state?.status || 'active',
      reason: req.body.state?.reason,
    };

    const paymentsInput = Array.isArray(req.body.payments) && req.body.payments || [];
    const payments = paymentsInput.map((payment: any) => ({
      payment_amount: parseFloat(payment?.payment_amount),
    }));

    createPolicy(policy, invoice, state, payments)
      .then((x: any) => res.json({ result: x }))
      .catch((x: any) => next(x));
  });

  return router;
}
