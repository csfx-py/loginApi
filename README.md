login api with mongoose express

update: Added a hotelID field to use with a new MERN app i am developing

clone the repo and cd over to the folder, install dependencies with `yarn` or `npm i`

add a .env file in root of the app using `touch .env`

add MONGO_URI and TOKEN_SEC for connecting mongo db and jwt token key

send json requests in this format

`
{
    "name": "name string",
    "email": "mail string",
    "password": "password string",
    "hotelID": "hotelID string",
}
`