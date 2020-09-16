import { Router } from 'express';
import { policyRouter } from './policy';

export function apiRouter() {
  const router = Router();

  router.use('/policy', policyRouter());

  return router;
}
