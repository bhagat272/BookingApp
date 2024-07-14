// server.js

const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const passwordReset = require("./routes/passwordReset")
const morgan = require("morgan");
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

dbConnect();
 
app.use(cors());


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api", require("./routes/userRoutes"));
// Add other routes as needed
app.use("/api", require("./routes/serviceRoutes"));
app.use("/api", require("./routes/bookingRoute"));
app.use('/api', passwordReset);
app.get("/",(req,res)=>{
  res.send("Bookify Backend server")
})
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(process.env.PORT, () => 
  console.log(`Server is running on ${process.env.PORT}`)
);
