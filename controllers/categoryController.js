const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.category_create_post = [
	body("name", "Category name must contain 3 - 100 characters")
		.trim()
		.isLength({ min: 3, max: 100 })
		.escape(),
	body("description", "Description must not exceed 200 characters")
		.trim()
		.isLength({ max: 200 })
		.escape(),
	// to add image

	asyncHandler(async (req, res, next) => {
		const allCategory = await Category.find().exec();
		const errors = validationResult(req);
		const category = new Category({
			name: req.body.name,
			description: req.body.description,
		});
		if (!errors.isEmpty()) {
			console.log(errors.array());
		} else {
			const filterDuplicate = allCategory.filter(
				(cat) => cat.name.toLowerCase() === category.name.toLowerCase()
			);
			if (filterDuplicate.length === 0) {
				await category.save();
				res.redirect(category.url);
			} else {
				// to fix, currently just infinitely loads
				console.log(`${category.name} already exists`);
			}
		}
	}),
];

exports.category_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category Delete POST");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category Update POST");
});
