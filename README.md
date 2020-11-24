# Demo application with MERN stack

Live website: https://psychologyapp.herokuapp.com/

Instructions to launch locally:
 - Pull the repository & and run *npm install* both on root directory and ./frontend
 - Make .env file in root directory with following lines:
   - NODE_ENV = development
   - PORT = 5000
   - MONGO_URI = &lt;Your mongoDB URI&gt;
   - JWT_SECRET = &lt;Any secret key for encryption&gt;
   - ADMIN_PW = &lt;Admin password for CMS section in the application&gt;
 - Push dummy data to mongoDB by running *npm run data:import*
 - Run: *npm run dev*
