const mongoose = require('mongoose');
require("dotenv").config();

mongoose
    .connect("mongodb+srv://admin:admin@clusteraws.6k7qv.mongodb.net/FastSplash?retryWrites=true&w=majority")
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error(error));