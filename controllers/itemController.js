const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(async (req, res, next) => {
	const allItems = await Item.find({}).sort({ name: 1 }).exec();

	res.render("item_list", {
		title: "Items",
		item_list: allItems,
	});
});

exports.item_detail = asyncHandler(async (req, res, next) => {
	const item = await Item.findById(req.params.id).exec();
	const itemCategory = await Category.findById(item.category).exec();

	if (item === null) {
		const err = new Error("Item does not exist");
		err.status = 404;
		return next(err);
	}

	res.render("item_detail", {
		item: item,
		category: itemCategory.name,
	});
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Create GET");
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Create POST");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Delete GET");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Delete POST");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Update GET");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Update POST");
});
