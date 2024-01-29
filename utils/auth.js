// add withAuth helper for authentication
const withAuth = (req, res, next) => {
    // if user not logged in, redirect to login
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        // otherwise redirect to route
        next();
    }
};

// export helper
module.exports = withAuth;
