import express from 'express';

import * as SearchController from '../controllers/search.controller';

const router = express.Router();

router.get('/open-interventions', [
  SearchController.getOpenInterventions
]);

export default router;
