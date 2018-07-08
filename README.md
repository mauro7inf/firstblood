# firstblood

To install, simply clone the repo and run `npm install` in this directory (assuming you already have node and npm installed).  To also run the tests, run `npm install -d` and possibly `npm install -g mocha` if you don't already have mocha installed globally.

To run the server, run `npm start`.  To run the tests, run `npm test`.  The test suite starts the server itself, so you don't need to already have the server running for this.  The test will take a bit over 2 minutes; this is in order to test the server's time-based functionality and does not reflect code execution time.