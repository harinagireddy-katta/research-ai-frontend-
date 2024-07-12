// const express = require("express")
// const app = express()
// const routesHandler= require("./routes/router.js");
// const cors = require("cors")
// const path =require("path")
// const fileUpload = require("express-fileupload");

// //const route

// app.use(cors())
// app.use(fileUpload());
// app.use("/", routesHandler);
// const PORT= 4000;
// app.listen(PORT,()=>{
//     console.log(`Running on ${PORT}`)
// })
require("dotenv").config();
const express = require("express");
const app = express();
const routesHandler = require("./routes/router.js");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("./schema/conn.js");
const path  = require('path');


// Middleware setup
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Routes setup
app.use(routesHandler);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
