// import router, chat moel and withAuth helper
const router = require('express').Router();
const { Chat } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new chat, once logged in
