const express = require('express');
const bodyParser = require('body-parser');

let Player = require('./player');

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let router = express.Router();
const port = 2401; // in a deployable app this would be configurable via environment variables

let lobby = require('./lobby');

// poll for matches every 5 seconds
let heartbeat = setInterval(function () {
	console.log('heartbeat');
	lobby.findMatches();
	lobby.updateWaitingPlayers();
}, 5000);

// What happens is a player tries to join while polling is taking place?
// Actually, that can't happen, since the polling functions are synchronous and Node is single-threaded.  Yay Node!

function handlePostMatch(req, res) {
	let name = req.body.name;
	let skill = req.body.skill;
	console.log('New player submitted: ' + name + ' — ' + skill);
	if (typeof name !== 'string' || name.length < 1 || typeof skill !== 'number' || skill < 0) {
		res.status(400).send('Bad name or skill');
		return;
	}
	let player = new Player(name, skill, res);
	lobby.addPlayer(player);
}

router.route('/match').post(handlePostMatch);

app.use('/api', router);
let server = app.listen(port);
console.log('Listening on port ' + port);

function stopServer() {
	clearInterval(heartbeat);
	server.close(() => {console.log('Server closed.')});
}

module.exports = {
	handlePostMatch: handlePostMatch,
	stop: stopServer
};