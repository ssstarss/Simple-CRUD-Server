# Simple-CRUD-Server

## Setting up

- **1** clone repository
- **2** run **npm install** command to install dependencies
- **3** run **npm run start:dev** command to run app in developer mode
- **4** run **npm run start:prod** command to compile app and run builded app

## How to use Simple-CRUD-Server App

- using **Postman with http localhost:3000** and /api/users endpoint you can try following requests:
- **GET** `api/users` is used to get all persons
- **GET** `api/users/{userId}` to get precious person
- **POST** `api/users` is used to create record about new user and store it in database
- **PUT** `api/users/{userId}` is used to update existing user
- **DELETE** `api/users/{userId}` is used to delete existing user from database

2. Users are stored as `objects` that have following properties:

   - `id` — unique identifier (`string`, `uuid`) generated on server side
   - `username` — user's name (`string`, **required**)
   - `age` — user's age (`number`, **required**)
   - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

3. Request with wrong data will cause errors in response
