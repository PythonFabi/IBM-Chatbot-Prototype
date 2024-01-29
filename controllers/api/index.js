// import Router with express and the required api routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');

// use the users and chats api routes for the specific actions
router.use('/users', userRoutes);
router.use('/chats', chatRoutes);

module.exports = router;