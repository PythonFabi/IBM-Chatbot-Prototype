const router = require('express').Router();
const { Chat, User } = require('../models');
const withAuth = require('../utils/auth');

// get all the current chats from the db
router.get('/', async (req, res) => {
    try {
        // find all the chats
        const chatData = await Chat.findAndCountAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // create an array with the chatData and pass in each project with the requested Data
        const chats = chatData.map((project) => project.get({ plain: true }));

        // render the homepage with the chats and the login value
        res.render('chatpage', {
            chats,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// route for the newChat creation once logged_in
router.get('/newChat', withAuth, async (req, res) => {
    try {
        res.render('newChat', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.json(err);
    }
});

// edit chat based on id, with Authentication
router.get('/editChat/:id', withAuth, async (req, res) => {
    try {
        // get the chatData of the clicked Chat
        const chatData = await Chat.findByPk(req.params.id, {
            include: [
                {
                    // include the users username
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // get the requested chatData
        const chat = chatData.get({ plain: true });
        // render the editChat page
        res.render('editChat', {
            ...chat,
            logged_in: req.session.logged_in,
            chat_id: chat.id,
        });
    } catch (err) {
        res.json(err);
    }
})

// get the login route
router.get('/login', (req, res) => {
    // once logged in redirect to chatPage
    if (req.session.logged_in) {
        res.redirect('/chatpage');
        return;
    }


    res.render('login');
});



router.get('/logout', (req, res) => {
    // if session is logged in, the session will be destroyed and user is logged out
    if (req.session.logged_in) {
        req.session.destroy();
    }
    // redirect user after logout to the homepage
    res.redirect('/');
})

// signup route
router.get('/signup', (req, res) => {
    // render the signup page
    res.render('signup');
});

module.exports = router;
