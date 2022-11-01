# POSITIVE VIBES - THE GOOD NEWS APP

> **An App which lets you control your News Feed from all the negativity in the World. This App allows user to remove negative news from various categories and also let the user add filter to the news on the basis of certain key words like ( "Murder, Kidnap , Riots", "Death", "Disaster").**

_It is an extended fork of [ujjwal-kr/xenon](https://github.com/ujjwal-kr/xenon), a positive news network_

> Featured with a custom setting to adjust the analysis of the news delivered.

## Our Stack

- React with Vite.
- Nodejs and Express.
- Mongo hosted on ATLAS.
- Bcrypt and JWT for user signin and auth.

## How to build

- run `npm i` in both the client and server folders to install the dependencies.
- make a new file .env in server/ and copy the contents of .example.env
- in UNIX-based systems you can run `cp server/.example.env server/.env` to execute the above action
- fill in the `PORT`, `MONGO_URI` and `JWT` according to your settings
  > NOTE: MONGO_URI could be in local network or MongoDB Atlas URI
- run `npm run dev` inside both the apps to start them in watch mode.
- visit port 3000 in your localhost to see the app live.

_Made with javascript and :heart: in India_
**Developers : [@ujjwal-kr](https://github.com/ujjwal-kr) [@kaaarigar](https://github.com/kaaarigar)**
