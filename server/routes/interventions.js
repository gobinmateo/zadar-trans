import express from 'express';

const router = express.Router();

router.get('/:interventionID', (req, res) => {
  res.send({});
});

module.exports = router;
