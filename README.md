# hkt-tech-test

For convenience, this web app is hosted on https://hkt-tech-test.herokuapp.com/

The username is admin and password is hktadmpass

## How to start

Configure your environment variables placing a .env file containing the following:

PORT = 3000
ADMIN_USER = admin
ADMIN_PASSWORD = hktadmpass
FAKE_TOKEN = fAkeTOkEntoBEPasseD

Then run:

npm install
npm run heroku-postbuild
npm start
