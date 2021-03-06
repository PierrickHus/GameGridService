var mongoose = require('mongoose');
var uuid = require('uuid-lib');
var randomstring = require('randomstring');

var Schema = mongoose.Schema;


/**
 * Tile Schema
 */
var WorldSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	finished: {
		type: Boolean,
		default: false,
		required: 'World finished is mandatory'
	},
	token: {
		type: String,
		default: function() {return uuid.raw()},
		trim: true,
		required: 'The token is mandatory'
	},
	seed: {
		type: String,
		default: function() {return randomstring.generate()},
		trim: true,
		required: 'Seed is required'
	},
	size: {
		minx: {
			type: Number,
			default: 0,
			required: 'Min x is required'
		},
		miny: {
			type: Number,
			default: 0,
			required: 'Min y is required'
		},
		maxx: {
			type: Number,
			default: 65,
			required: 'Max x is required'
		},
		maxy: {
			type: Number,
			default: 65,
			required: 'Max y is required'
		}
	},
	world: {
		name: {
			type: String,
			default: '',
			trim: true,
			required: 'The world name is mandatory'
		},
		description: {
			type: String,
			default: '',
			trim: true
		},
		rules: {
			type: Schema.ObjectId,
			ref: 'Rule',
			required: 'Rules are mandatory'
		}

	}
});

WorldSchema.index({token: 1}, {unique: true});
WorldSchema.index({'world.name': 1}, {unique: true});

module.exports = mongoose.model('World', WorldSchema);

// Format d'une carte
/*
	{
		id: Number,
		seed: String,
		size: Object {
			minx: Number,
			miny: Number,
			maxx: Number,
			maxy: Number
		},
		tiles: Array<Tile>
	}
*/
