const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item List");
});

exports.item_detail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Item Detail: ${req.params.id}`);
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
