const express = require('express');
const {resolve} = require('path');
const method = require('method-override');
const app = express();
const {port, callback} = require('./modules/port');
const cors = require('cors');
const corsConfig = require('./cors.config');

app.listen(port, callback(port));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(method('_method'));
app.use(cors(corsConfig));


app.use(require('./routes/main.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/products.routes'));
