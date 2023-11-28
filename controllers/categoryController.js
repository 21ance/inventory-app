const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.category_list = asyncHandler(async (req, res, next) => {
	const allCategory = await Category.find({}).sort({ name: 1 }).exec();

	res.render("category_list", {
		title: "Categories",
		category: { name: "", description: "" },
		category_list: allCategory,
	});
});

exports.category_detail = asyncHandler(async (req, res, next) => {
	const allCategory = await Category.find({}).sort({ name: 1 }).exec();
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
		category: category,
		category_items: itemsInCategory,
		category_list: allCategory,
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
	// note: delete button is already hidden on front end
	// still check if there are items in category
	const allItemsInCategory = await Item.find({
		category: req.body.categoryid,
	}).exec();
	if (allItemsInCategory.length === 0) {
		await Category.findByIdAndDelete(req.params.id);
	}
	res.redirect("/categories");
});

exports.category_update_post = [
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
			_id: req.params.id,
		});
		if (!errors.isEmpty()) {
			console.log(errors.array());
		} else {
			const filterDuplicate = allCategory.filter(
				(cat) => cat.name.toLowerCase() === category.name.toLowerCase()
			);
			if (filterDuplicate.length === 0) {
				console.log(category);
				await Category.findByIdAndUpdate(req.params.id, category);
				res.redirect(category.url);
			} else {
				// to fix, currently just infinitely loads
				console.log(`${category.name} already exists`);
			}
		}
	}),
];
