const mongoose = require("mongoose");

const banschema = new mongoose.Schema({
	username: mongoose.SchemaTypes.String,
	userId: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	duration: mongoose.SchemaTypes.String,
	reason: mongoose.SchemaTypes.String,
	adminusername: mongoose.SchemaTypes.String,
	adminId: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	permanent: mongoose.SchemaTypes.Boolean,
	bantime: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
	unbantime: mongoose.SchemaTypes.String,
});

module.exports = mongoose.model("ban", banschema);