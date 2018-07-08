# firstblood

To install, simply clone the repo and run `npm install` in this directory (assuming you already have node and npm installed).  To also run the tests, run `npm install -d` and possibly `npm install -g mocha` if you don't already have mocha installed globally.

To run the server, run `npm start`.  To run the tests, run `npm test`.  The test suite starts the server itself, so you don't need to already have the server running for this.  The test will take a bit over 2 minutes; this is in order to test the server's time-based functionality and does not reflect code execution time.

If the server is running, make a POST call to `localhost:2401/api/match` with a JSON body containing the fields `name`, with some string to serve as a username, and `skill`, with some number (between 0 and 10000, ideally) to serve as a skill rating.  The server has a heartbeat every 5 seconds; during this heartbeat, the server will check for matches with a skill close to yours initially, with the window widening every time.  Consequently, do not expect an instant response.  Timeouts will happen after a bit over 90 seconds if a match is not found by then.