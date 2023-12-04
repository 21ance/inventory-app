const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// multer middleware
// https://www.youtube.com/watch?v=wIOpe8S2Mk8
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images/upload_item");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1000000,
	},
});

exports.item_list = asyncHandler(async (req, res, next) => {
	const [allItems, allCategory, categoryItemCount] = await Promise.all([
		Item.find().sort({ name: 1 }).exec(),
		Category.find().sort({ name: 1 }).exec(),
		Item.aggregate([
			{
				$group: {
					_id: "$category",
					count: { $sum: 1 },
				},
			},
			{ $sort: { _id: 1 } },
		]).exec(),
	]);

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
		category_sidebar: categoryItemCount,
	});
});

exports.item_detail = asyncHandler(async (req, res, next) => {
	const item = await Item.findById(req.params.id)
		.populate("category")
		.exec();
	const allCategory = await Category.find().sort({ name: 1 }).exec();

	if (item === null) {
		const err = new Error("Item does not exist");
		err.status = 404;
		return next(err);
	}

	res.render("item_detail", {
		title: item.name,
		item: item,
		category_list: allCategory,
	});
});

exports.item_create_post = [
	upload.single("image_upload"),

	body("name", "item name must contain 5 - 100 characters")
		.trim()
		.isLength({ min: 5, max: 100 })
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
			date_created: new Date(),
			date_modified: new Date(),
		});
		if (req.body.price === "") {
			item.price = 0;
		}
		if (req.body.stock === "") {
			item.stock = 0;
		}
		if (req.file !== undefined) {
			item.image = req.file.filename;
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
	const item = await Item.findById(req.params.id).exec();
	await Item.findByIdAndDelete(req.params.id);
	res.redirect(`/category/${item.category}`);
});

exports.item_update_post = [
	upload.single("image_upload"),

	body("name", "item name must contain 5 - 100 characters")
		.trim()
		.isLength({ min: 5, max: 100 })
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
	// to add image,

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const item = new Item({
			category: req.body.category,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			stock: req.body.stock,
			_id: req.params.id,
			date_created: req.params.date_created,
			date_modified: new Date(),
		});
		if (req.body.price === "") {
			item.price = 0;
		}
		if (req.body.stock === "") {
			item.stock = 0;
		}
		if (req.file !== undefined) {
			item.image = req.file.filename;
		}
		if (!errors.isEmpty()) {
			console.log(errors.array());
		} else {
			await Item.findByIdAndUpdate(req.params.id, item);
			res.redirect(item.url);
		}
	}),
];
