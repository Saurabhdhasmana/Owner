require("dotenv").config();  
const express = require("express");
const path = require("path");
const flash = require('connect-flash');
const session = require('express-session');  
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session); 
const ownerRoutes = require("./routes/owner-routes");
const serviceRoutes = require("./routes/service-routes");
const portRoutes = require("./routes/portfolio-routes");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new RedisStore({
    host: process.env.REDIS_HOST || 'localhost',  // Use environment variable for Redis host
    port: process.env.REDIS_PORT || 6379,        // Use environment variable for Redis port
    ttl: 260, // Session TTL (optional, set it to 5 minutes)
  }),
  secret: process.env.SESSION_SECRET || 'your_secret_key',  // Secret key from .env or fallback
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Set secure cookie in production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,  // Set cookie expiration time (1 day)
  }
}));

// Flash middleware
app.use(flash());

// View engine setup
app.set("view engine", "ejs");

// Routes
app.use("/owner", ownerRoutes);
app.use("/service", serviceRoutes);
app.use("/portfolio", portRoutes);

// Start server
const port = process.env.PORT || 4000;  // Use port from .env or fallback to 4000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
