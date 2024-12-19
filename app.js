require("dotenv").config();
const express = require("express");
const path = require("path");
const flash = require('connect-flash');
const session = require('express-session');  
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session); 
const ownerRoutes=require("./routes/owner-routes");
const serviceRoutes=require("./routes/service-routes");
const portRoutes=require("./routes/portfolio-routes");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new RedisStore({ host: 'localhost', port: 6379 }), // Redis configuration
  secret: 'your_secret_key',  // Secret key to sign session ID cookie
  resave: false,
  saveUninitialized: false,  // Do not save uninitialized session
  cookie: { secure: false }  // 'secure: false' if you're not using https
}));
app.set("view engine", "ejs");
app.use(flash());
app.use("/owner", ownerRoutes);
app.use("/service",serviceRoutes);
app.use("/portfolio",portRoutes);

app.listen(process.env.PORT || 4000);