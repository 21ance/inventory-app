const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
	const allCategory = await Category.find({}).sort({ name: 1 }).exec();

	res.render("category_list", {
		title: "Categories",
		category_list: allCategory,
	});
});

exports.category_detail = asyncHandler(async (req, res, next) => {
	const [category, itemsInCategory] = await Promise.all([
		Category.findById(req.params.id).exec(),
		Item.find({ category: req.params.id }).exec(),
	]);

	if (category === null) {
		const err = new Error("Category does not exist");
		err.status = 404;
		return next(err);
	}

	res.render("category_detail", {
		title: category.name,
		category_items: itemsInCategory,
	});
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category Create GET");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category Create POST");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category Delete GET");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category Delete POST");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category Update GET");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category Update POST");
});
