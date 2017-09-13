#!/usr/bin/env node

const program = require( 'commander' );
const commandUid = require( './cmd-uid.js' );


program.version( '0.1.0' );

commandUid( program );


program.parse( process.argv );

if ( !process.argv.slice( 2 ).length ) {
  program.outputHelp();
}
