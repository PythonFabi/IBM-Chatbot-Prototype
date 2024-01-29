const router = require('express').Router();
// add the api Routes and the homeRoutes, to make them available for use
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// use the homeroutes and the api routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
