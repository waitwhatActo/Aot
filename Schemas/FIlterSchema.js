const mongoose = require("mongoose");

const filterschema = new mongoose.Schema({
	username: mongoose.SchemaTypes.String,
	userId: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	time: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	channelId: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	content: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	type: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	action: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	caseId: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
});

module.exports = mongoose.model("filter", filterschema);