import { setupWorker } from 'msw/browser';
import { claimsHandlers } from './handlers/claims';
import { dashboardHandlers } from './handlers/dashboard';
import { authHandlers } from './handlers/auth';
import { documentsHandlers } from './handlers/documents';
import { estimationHandlers } from './handlers/estimation';
import { appealsHandlers } from './handlers/appeals';
import { indemnityHandlers } from './handlers/indemnity';

export const worker = setupWorker(
  ...authHandlers,
  ...dashboardHandlers,
  ...claimsHandlers,
  ...documentsHandlers,
  ...estimationHandlers,
  ...appealsHandlers,
  ...indemnityHandlers,
);
