function Res(callback) {
	this.statusCode = undefined;
	this.message = undefined;
	this.callback = callback;
}

Res.prototype.status = function (statusCode) {
	this.statusCode = statusCode;
	return this;
};

Res.prototype.send = function (message) {
	this.message = message;
	this.callback();
};

module.exports = Res;