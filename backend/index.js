// Import required modules
const express = require('express');
const dbConnect = require('./conn/dbConnect');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoutes');
const bookRoute = require('./routes/bookRoutes');
const error = require('./middleware/errorMiddleware');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

dbConnect();
app.use(express.json());

app.use(cors());

app.use('/api/users', userRoute);

app.use('/api/books', bookRoute);

app.use(error.errorMiddlewareHandler);

// Set the port to listen on
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

