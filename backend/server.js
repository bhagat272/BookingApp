require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();

dbConnect();

app.use(cors({ origin: 'http://localhost:5173' })); // Adjust the origin to match your frontend URL

app.use(express.json());
app.use(bodyParser.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/api", require("./routes/userRoutes"));
app.use('/api', require("./routes/serviceRoutes"));

app.listen(process.env.PORT, () => 
  console.log(`server is running on ${process.env.PORT}`)
);
