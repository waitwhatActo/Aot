module.exports = {
	apps : [{
		name   : "Aot",
		script : "./index.js",
		watch : true,
		ignore_watch : [
			"lists",
			"package-lock.json",
			".git",
			"ecosystem.config.js",
			"!start.bat",
			"node_modules",
		],
		autorestart : true,
		max_memory_restart: "50M",
		post_update: [
			"ncu -u",
			"npm i",
		],
		time: true,
	}],
};