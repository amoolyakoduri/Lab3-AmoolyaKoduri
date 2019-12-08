const express = require('express');
const app = express();
const port = 3003;
var http = require('http').Server(app);
var cors = require('cors');
var routes = require('./routes/index').routes;
var bodyParser = require('body-parser');
var passport = require('passport');
var db_config = require('./config/database');
const schema = require('./schema/schema');
const graphqlHTTP = require('express-graphql');
db_config.connectDB();
require('./config/passport')(passport);
http.listen(port, function () {
  console.log('listening on *:3000');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));
app.use('/api', routes);
app.use("/graphql",graphqlHTTP({
  schema,
  graphiql: true
}));