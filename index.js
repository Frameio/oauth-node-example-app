const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 5050;

const clientID = '<YOUR-CLIENT-ID>';
const clientSecret = '<YOUR-CLIENT-SECRET>';
const callbackURL = 'http://localhost:5050/callback';

// NOTE: Replace this list of scope strings with whichever you'd like the demo
// app to request consent.
const scopes = 'offline account.read asset.create';

const credentials = {
  client: {
    id: clientID,
    secret: clientSecret,
  },
  auth: {
    tokenHost: 'https://applications.frame.io',
    authorizePath: '/oauth2/auth',
    tokenPath: '/oauth2/token',
  },
  options: {
    authorizationMethod: 'header',
  },
};

const oauth2 = require('simple-oauth2').create(credentials);

const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: callbackURL,
  scope: scopes,
  state: 'some_state',
});

app.use(bodyParser());
app.use(session({ secret: '123' }));

app.get('/login', (_, res) => {
  res.redirect(authorizationUri);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  const options = {
    code,
    redirect_uri: callbackURL,
  };

  try {
    const result = await oauth2.authorizationCode.getToken(options);
    const token = oauth2.accessToken.create(result);
    return res.status(200).json(token)
  } catch (error) {
    console.error(error);
    return res.status(500).json('Authentication failed');
  }
})

app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
