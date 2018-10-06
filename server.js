const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '???';
const GOOGLE_CLIENT_SECRET = '???';

function findOrCreateUser(data, callback) {
  callback(null, {
    id: '1111',
    googleId: data.googleId,
    username: 'user-from-google',
    displayName: 'UserFromGoogle'
  })
}

// Configure the Google strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Google API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
      if (profile) {
        console.log('profile', profile);
      }
      findOrCreateUser({googleId: profile.id}, function (err, user) {
        console.log('user', user);
        return cb(err, user);
      });
    }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Google profile is serialized
// and deserialized.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Create a new Express application.
const app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
    function (req, res) {
      res.render('home', {user: req.user});
    });

app.get('/login',
    function (req, res) {
      res.render('login');
    });

app.get('/login/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/login/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    });

app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
      res.render('profile', {user: req.user});
    });

app.listen(3000);
