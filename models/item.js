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
	price: { type: Number, minLength: 1, maxLength: 10, required: true },
	stock: { type: Number, minLength: 1, maxLength: 3, required: true },
	image: { type: String },
});

ItemSchema.virtual("url").get(function () {
	return `/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
