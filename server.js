require('dotenv').config();
const express = require('express')

const app = express();
const connectDB = require('./db/connect')

const userRoute = require('./routes/users')

//middleware
app.use(express.json())


//route
app.use('/api/v1/user' , userRoute)


//running server
const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
