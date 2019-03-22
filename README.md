# oauth-node-example-app

## Setup

```
$ npm install
```

## Usage: index.js

This example demonstrates a basic client using the Authorization Code grant flow.

Edit the following values in `index.js` to match your OAuth App configuration.

 - `clientID`
 - `clientSecret`
 - `callbackURL`
 - `scopes`

Next, run the application.

```
$ node index.js
```

The application will be available at `http://localhost:5050`.

## Usage: pkce.js

This example demonstrates a basic client using the Authorization Code grant flow with [Proof Key for Code Exchange (PKCE)](https://oauth.net/2/pkce/).

Edit the following values in `index.js` to match your OAuth App configuration.

 - `clientID`
 - `callbackURL`
 - `scopes`

Next, run the application.

```
$ node pkce.js
```

The application will be available at `http://localhost:5050`.
