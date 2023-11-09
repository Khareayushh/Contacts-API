const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

connectDb();
app.use(express.json());

// app.get('/api/contacts', (req, res) => {
//     res.status(200).json({ message: "Get all the contacts "});
// })

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})