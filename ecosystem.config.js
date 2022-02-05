module.exports = {
	apps : [{
		name   : "Aot",
		script : "./index.js",
		watch : true,
		ignore_watch : [
			"counting.txt",
		],
		autorestart : true,
	}],
};