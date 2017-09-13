const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const helmet = require( 'helmet' );
const uuid = require( 'uuid/v4' );
const {passport} = require( './auth' );
const {readData} = require('./read-data-from-excel');
const app = express();
app.enable( 'trust proxy' );
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( bodyParser.json() );
app.use( morgan( 'common' ) );
app.use( helmet() );

const database = {};

app.get( '/', passport.authenticate( 'basic', {session: false} ), (req, res) => {
  res.json( {
    status: 'OK',
    data: Object.values( readData() )
  } )
} );

app.listen( 8600, '127.0.0.1', () => {
  console.info( 'Server started!!!!' );
} );
