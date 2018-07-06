const express = require('express');
const bosyParser = require('body-parser');

let Player = require('./player');

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let router = express.Router();
const port = 2401; // in a deployable app this would be configurable via environment variables

let lobby = require('./lobby');

// poll for matches every 5 seconds
setInterval(function () {
	lobby.findMatches();
	lobby.updateWaitingPlayers();
}, 5000);

// What happens is a player tries to join while polling is taking place?
// Actually, that can't happen, since the polling functions are synchronous and Node is single-threaded.  Yay Node!

router.route('/match').post((req, res) => {
	let name = req.body.name;
	let skill = req.body.skill;
	if (typeof name !== 'string' || name.length < 1 || typeof skill !== 'number' || skill < 0) {
		res.status(400).send('Bad name or skill');
		return;
	}
	let player = new Player(name, skill, res);
	lobby.addPlayer(player);
});

app.use('/api', router);
app.listen(port);
console.log('Listening on port ' + port);