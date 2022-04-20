module.exports = {
	apps : [{
		name   : "Aot",
		script : "./index.js",
		watch : true,
		ignore_watch : [
			"lists",
		],
		autorestart : true,
	}],
};