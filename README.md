
A basic Team Selector app coded with Reactjs and powered by Firebase. 

Each Player ships with his respective data (Name, Team, Price and Position) allowing the user to select him to fill any of the free spots on the pitch in accordance with his adequate position, or remove him from the pitch by clicking the X button.
There are two teams for the moment (Reds and Blues), with the possibility to add more in the future as the app is still in the process of being created.
Some restrictions are imposed, such as the inability to choose more than three players from the same team.
After adding a player to the pitch, clicking at him fires a card like shape holding some more detailed info concerning the player.
You can add a player to your database by routing to ***/add***, and filling the form obviously.

The App is Responsive.

The database is initialized with some random players to enable hosting a demo on heroku : https://reactteamselector.herokuapp.com/

Run ***npm install***  followed by ***npm start***  after cloning the repo as always.

Change the base Url of the axios instance created in the ***axios-ordres.js***  file to your database Url, as well as your storage API variables in the ***firebaseconfig.js***  file, and you're good to go.
