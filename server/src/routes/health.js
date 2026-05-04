const { Router } = require('express');

const router = Router();

router.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'API healthy' });
});

module.exports = router;