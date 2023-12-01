const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	name: { type: String, required: true, minLength: 10, maxLength: 100 },
	description: { type: String, maxLength: 200 },
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	price: { type: Number, minLength: 1, maxLength: 10 },
	stock: { type: Number, minLength: 1, maxLength: 3 },
	image: { type: String },
	date_created: { type: Date },
	date_modified: { type: Date },
});

ItemSchema.virtual("url").get(function () {
	return `/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
