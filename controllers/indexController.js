const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
	const allItems = await Item.find().sort({ _id: -1 }).exec();
	const allCategory = await Category.find().sort({ name: 1 }).exec();

	res.render("index", {
		title: "Inventory",
		item_list: allItems,
		category_list: allCategory,
	});
});
