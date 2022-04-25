# React-IMS
React/JavaScript inventory management system

To view web app: https://react-inventory-system.herokuapp.com/ 

Items needed
Node.js , Go to nodejs.org download latest version 
Visual Studio Code editor, or any ide with a terminal built in

From download of master branch on github from this url  https://github.com/MendokusaiCode/React-IMS

or copy this url and from Visual studio code and from new window click the "explorer" button in top left and click clone from github and insert the copied URL

From project root directory type "npm install" within the terminal press enter

Next within the terminal type "cd .\client\"

Now you are within the client folder once again, type in "npm install" press enter

Next type within the terminal "cd .." and press enter

Now we need to connect to a real mongoDB database, 

 Create a account with MongoDB, from here click "create", 

 choose the shared option,

 click create cluster,

 follow prompts given,

 once cluster shows up connect the cluster by choosing "connect",

next choose "connect your appliacation"

now you should see your connection string,

Copy this connection string to your clipboard

Once this cluster is created within the root directory create a new file and title it ".env"

 Within this .env file type 
        " URI = (put your cluster connection string here) will look something like this "mongodb+srv://andrew:<password>@cluster0.a3fmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        port = 5000"

the <password> portion of the string will need to be replaced with the password you set for the cluster and remove the arrows surrounding it

Using the example above if we used "apple" as the cluster password the connection string will look like "mongodb+srv://andrew:apple@cluster0.a3fmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

Then type in terminal "npm run dev" 

once the application is launched it should be on localhost:3000

The tables for the data will be auto completed in mongoDB cluster on application launch 

Next to work with the system we need to create an admin in the MonogDB cluster

From the launched application create a user by naviagting to the login tab and clicking the "not a user?" button

From this fill out the form and enter in your new user. Next we need to set this created user as an admin for your database

Go to the MongoDB window from where you created the cluster and click on browse collections, you should now see a users collections 

click the users collections and click "edit document" button or the pencil icon with the user you created

Now update their role to "admin"

Finally you can use the application, with the admin you created you can set new admins within the system

Have fun with our application! 
                    -Andrew C. and Caleb C.
