# Demo application with MERN stack

Live website: https://psychologyapp.herokuapp.com/

Instructions to launch locally:
 - Pull the repository & and run *npm install* both on root directory and ./frontend
 - Make .env file in root directory with following lines:
 NODE_ENV = development
 PORT = 5000
 MONGO_URI = <Your mongoDB URI>
 JWT_SECRET = <Any secret key for encryption>
 ADMIN_PW = <Admin password for CMS section in the application>
 - Push dummy data to mongoDB by running *npm run data:import*
 - Run: *npm run dev*
