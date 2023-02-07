# FlashCards App
## Running the code
This code is not deployed. To run the app, you need to clone the repository. For privacy reasons, please do not open any .env file. The following steps to run the project locally assumes that [Node.js](https://nodejs.org/en/) is installed. 
### Starting Backend Server
First, open a terminal at the root of this directory. Then, move to the server folder:

`cd flashcard-app`

Install the necessary dependencies with

`npm install`

Then start the server locally with 

`npm run dev`

This will start the server at http://localhost:9000/. Server is fully started when you see the `Connected to MongoDB` message. You can open `server/index.js` to change the corresponding port if you would like. 
### Starting Frontend Webpage
Open a different terminal at the root of this directory. Then, move to the client folder:

`cd flashcard-client`

Install the necessary dependencies with 

`npm install`
 
Then start the webpage locally with 

`npm run start`

If everything goes well, You should have the webpage starting at http://localhost:3000/ 🎉. Feel free to change the port, it just have to be different from the server port. 

## App information
### App functionality
Backend
- App has user authentication, user needs to register with a unique username. 
- Passwords are hashed and encrypted when stored in the database. 
- Users are given a token when succesfully authenticated, the token allows them to access flashcards that belong to them.
- All created flashcards and users are stored in database, creating persistency.
- CORS allows cross domain request

Frontend
- After successfully logging in, users can view to all of their decks and flashcards in the \display page.
- Unauthorized users will be redirected to the login page. 
- User can create a card and a deck by pressing the add button at the lower right of the page. 
- User can add to a deck by clicking the add icon on the deck bar. 
- User can edit a flashcard by clicking the edit icon on the card.
- USer can delete a flashcard by clicking the delete icon on the card.
- User can study a deck by clicking on the study icon on the deck bar. 

### Tech Stack
MERN stack is used. 
- [MongoDB](https://www.mongodb.com/) database is used for storage of users and flashcards.
- Server framework is implemented with [Expressjs](https://expressjs.com/).
- Javascript is used to implement front and backend of the project. 
- The app uses [Node.js](https://nodejs.org/en/) for overall runtime enviroment
- [Axios](https://www.npmjs.com/package/axios) is used for calls to api services. 
- Frontend user interface is implemented with [React](https://reactjs.org/). 
- [Material UI](https://mui.com/) and [bootstrap](https://getbootstrap.com/) are used for styling the pages. 
