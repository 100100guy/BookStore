// Import required modules
const express = require('express');
const dbConnect = require('./conn/dbConnect');
const User = require('./models/User');
const userRoute = require('./routes/userRoutes');

// Create an Express application
const app = express();

app.use(express.json());

app.use('/api/users', userRoute);

dbConnect();

// Set the port to listen on
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
