const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category List");
});

exports.category_detail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category Detail: ${req.params.id}`);
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
