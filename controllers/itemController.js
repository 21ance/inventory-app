const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_list = asyncHandler(async (req, res, next) => {
	const allItems = await Item.find().sort({ name: 1 }).exec();
	const allCategory = await Category.find().exec();

	res.render("item_list", {
		title: "Items",
		item: {
			name: "",
			description: "",
			category: "",
			price: "",
			stock: "",
		},
		item_list: allItems,
		category_list: allCategory,
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

exports.item_create_post = [
	body("name", "item name must contain 10 - 100 characters")
		.trim()
		.isLength({ min: 10, max: 100 })
		.escape(),
	body("description", "Description must not exceed 200 characters")
		.trim()
		.isLength({ max: 200 })
		.escape(),
	body("category", "Category must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("price", "Invalid amount")
		.trim()
		.isLength({ min: 0, max: 8 })
		.escape(),
	body("stock", "Stock limit is 0 - 999")
		.trim()
		.isLength({ min: 0, max: 3 })
		.escape(),
	// to add image

	asyncHandler(async (req, res, next) => {
		const allItems = await Item.find().exec();
		const errors = validationResult(req);
		const item = new Item({
			category: req.body.category,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			stock: req.body.stock,
		});
		if (req.body.price === "") {
			item.price = 0;
		}
		if (req.body.stock === "") {
			item.stock = 0;
		}
		if (!errors.isEmpty()) {
			console.log(errors.array());
		} else {
			const filterDuplicate = allItems.filter(
				(i) => i.name.toLowerCase() === item.name.toLowerCase()
			);
			if (filterDuplicate.length === 0) {
				await item.save();
				res.redirect(item.url);
			} else {
				// to fix, currently just infinitely loads
				console.log(`${item.name} already exists`);
			}
		}
	}),
];

exports.item_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Delete POST");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Update POST");
});
