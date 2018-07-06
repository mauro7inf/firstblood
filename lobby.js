const searchRadii = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000];

function Lobby() {
	this.lobbyPlayers = []; // players currently in lobby; we'll add new players in at the end of this array
}

// search for all matches
Lobby.prototype.findMatches = function () {
	for (let p1 = 0; p1 < this.lobbyPlayers.length - 1; p1++) { // match oldest players first
		let foundMatch = false;
		for (let p2 = p1 + 1; p2 < this.lobbyPlayers.length; p2++) {
			let searchRadius1 = searchRadii[this.lobbyPlayers[p1].searchRadiiIndex];
			let searchRadius2 = searchRadii[this.lobbyPlayers[p2].searchRadiiIndex];
			let skillDifference = Math.abs(this.lobbyPlayers[p1].skill - this.lobbyPlayers[p2].skill);
			if (skillDifference <= searchRadius1 && skillDifference <= searchRadius2) { // check for sufficiently matching skill
				foundMatch = true;
				this.lobbyPlayers[p2].match(p1.name); // return response to players
				this.lobbyPlayers[p1].match(p2.name);
				this.lobbyPlayers.splice(p2, 1); // remove player 2 from lobby
				break;
			}
		}
		if (foundMatch) {
			this.lobbyPlayers.splice(p1, 1); // remove player 1 from lobby (this will work because p1 < p2, so the previous splice won't affect this)
			p1--;
			continue;
		}
	}
};

// update waiting players
Lobby.prototype.updateWaitingPlayers = function () {
	for (let i = 0; i < this.lobbyPlayers.length; i++) {
		this.lobbyPlayers[i].searchRadiiIndex++;
		if (this.lobbyPlayers[i].searchRadiiIndex === searchRadii.length) {
			this.lobbyPlayers[i].timeout();
			this.lobbyPlayers.splice(i, 1);
			i--;
		}
	}
};

Lobby.prototype.addPlayer = function (player) {
	let playerAlreadyInLobby = false;
	for (let i = 0; i < this.lobbyPlayers; i++) {
		if (this.lobbyPlayers[i].name === player.name) {
			playerAlreadyInLobby = true;
			break;
		}
	}
	if (playerAlreadyInLobby) {
		player.alreadyExists();
	} else {
		this.lobbyPlayers.push(player);
	}
}

module.exports = new Lobby();