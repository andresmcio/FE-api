const cors = require('cors');

const allowedOrigins = [ 'http://localhost:3000' ];

const options = {
    origin: (origin, callback) => {
        // Check if the origin is in the allowed origins or if it's undefined
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      }
};

module.exports = options;