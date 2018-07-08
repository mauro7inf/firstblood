let assert = require('assert');
let _ = require('lodash');
let server = require('../lib/server');
let Res = require('./res');

after(function () {
	console.log('after');
	server.stop();
});

describe('Player Match Tests', function () {

	it('should match players with same skill but refuse a player with the same name', function (done) {
		let partDone = _.after(3, done);

		let req1 = {
			body: {
				name: 'Celes',
				skill: 2000
			}
		};
		let res1 = new Res(function () {
			assert.equal(res1.statusCode, 200);
			assert.equal(res1.message, 'You have been matched with Locke');
			console.log('Celes matched with Locke');
			partDone();
		});
		server.handlePostMatch(req1, res1);

		let req2 = {
			body: {
				name: 'Locke',
				skill: 2000
			}
		};
		let res2 = new Res(function () {
			assert.equal(res2.statusCode, 200);
			assert.equal(res2.message, 'You have been matched with Celes');
			console.log('Locke matched with Celes');
			partDone();
		});
		server.handlePostMatch(req2, res2);

		let req3 = {
			body: {
				name: 'Celes',
				skill: 2000
			}
		};
		let res3 = new Res(function () {
			assert.equal(res3.statusCode, 409);
			assert.equal(res3.message, 'Player already in lobby');
			console.log('Celes already in lobby');
			partDone();
		});
		server.handlePostMatch(req3, res3);
	});

	it('should refuse player with no name', function (done) {
		let req = {
			body: {
				skill: 1
			}
		};
		let res = new Res(function () {
			assert.equal(res.statusCode, 400);
			assert.equal(res.message, 'Bad name or skill');
			done();
		});
		server.handlePostMatch(req, res);
	});

	it('should refuse player with no skill', function (done) {
		let req = {
			body: {
				name: 'Leo'
			}
		};
		let res = new Res(function () {
			assert.equal(res.statusCode, 400);
			assert.equal(res.message, 'Bad name or skill');
			done();
		});
		server.handlePostMatch(req, res);
	});

	it('should eventually match players with different skill and time out anyone remaining', function (done) {
		let partDone = _.after(3, done);

		let req1 = {
			body: {
				name: 'Terra',
				skill: 1500
			}
		};
		let res1 = new Res(function () {
			assert.equal(res1.statusCode, 408);
			assert.equal(res1.message, 'No suitable matches found');
			console.log('Terra timed out');
			partDone();
		});
		setTimeout(function () {
			server.handlePostMatch(req1, res1);
		}, 27000);

		let req2 = {
			body: {
				name: 'Gau',
				skill: 2000
			}
		};
		let res2 = new Res(function () {
			assert.equal(res2.statusCode, 200);
			assert.equal(res2.message, 'You have been matched with Cyan');
			console.log('Gau matched with Cyan');
			partDone();
		});
		server.handlePostMatch(req2, res2);

		let req3 = {
			body: {
				name: 'Cyan',
				skill: 1500
			}
		};
		let res3 = new Res(function () {
			assert.equal(res3.statusCode, 200);
			assert.equal(res3.message, 'You have been matched with Gau');
			console.log('Cyan matched with Gau');
			partDone();
		});
		server.handlePostMatch(req3, res3);
	});
});