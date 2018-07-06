function Player(name, skill, res) {
	this.name = name; // some username string
	this.skill = skill; // MMR, a number generally between about 1000 and 4000 but it could potentially go higher or lower
	this.searchRadiiIndex = 0; // index in searchRadii array for next search radius
	this.res = res; // we'll attach a response object to the player
	this.matched = false;
}

// respond to the match request with the name of the other player
Player.prototype.match = function (name) {
	this.res.status(200).send('You have been matched with ' + name);
};

Player.prototype.timeout = function () {
	this.res.status(408).send('No suitable matches found');
};

Player.prototype.alreadyExists = function () {
	this.res.status(409).send('Player already in lobby');
};

module.exports = Player;