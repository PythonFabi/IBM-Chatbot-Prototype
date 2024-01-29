// import router, chat moel and withAuth helper
const router = require('express').Router();
const { Chat } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new chat, once logged in
router.post('/', withAuth, async (req, res) => {
    try {
        // create a new chat with current sessions user_id
        const newChat = await Chat.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        // create new Blog, if status code is 200
        res.status(200).json(newChat);
    } catch (err) {
        res.status(400).json(err);
    }
});


// update chat based on id
router.put('/:id', withAuth, async (req, res) => {
    try {
        // updated blog based on request body
        const updatedChat = await Chat.update(
            {
                ...req.body
            },
            {
                // update based on blog id and based on user_id
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            } );
            // chat updated once status 200
            res.status(200).json(updatedChat);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete chat based on id, just when authenticated
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedChat = await Chat.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

    // give error, if not your blog
     if(!deletedBlog) {
        res.status(403).json({ message: "You don't have permission to delete this chat." });
     }

    //  success status
    res.status(200).json({ message: "Chat deleted successfully." })
    } catch (err) {
        res.status(500).json(err);
    }
});

mdoule.exports = router;