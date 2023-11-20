#! /usr/bin/env node

console.log(
	'This script populates some categories and items in the database - e.g.: node populatedb "mongodb+srv://<user>:<password>@cluster0.lz91hw2.mongodb.net/<database_name>?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect(mongoDB);
	console.log("Debug: Should be connected?");
	await createCategories();
	await createitems();
	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}

async function categoryCreate(index, name, description, image) {
	const categorydetail = {
		name: name,
	};
	if (image != false) categorydetail.image = image;
	if (description != false) categorydetail.description = description;

	const category = new Category(categorydetail);

	await category.save();
	categories[index] = category;
	console.log(`Added category: ${name}`);
}

async function itemCreate(
	index,
	name,
	description,
	category,
	price,
	stock,
	image
) {
	const itemdetail = {
		name: name,
		category: category,
	};
	if (description != false) itemdetail.description = description;
	if (price != false) itemdetail.price = price;
	if (stock != false) itemdetail.stock = stock;
	if (image != false) itemdetail.image = image;

	const item = new Item(itemdetail);
	await item.save();
	items[index] = item;
	console.log(`Added item: ${name}`);
}

async function createCategories() {
	console.log("Adding Categories");
	await Promise.all([
		categoryCreate(0, "CPU", false, false),
		categoryCreate(1, "RAM", false, false),
		categoryCreate(2, "Motherboard", false, false),
	]);
}
async function createitems() {
	console.log(categories);
	console.log("Adding Items");
	await Promise.all([
		itemCreate(
			0,
			"Ryzen 5 5600",
			false,
			categories[0],
			false,
			false,
			false
		),
		itemCreate(
			1,
			"Ryzen 7 5800X3D",
			false,
			categories[0],
			false,
			false,
			false
		),
		itemCreate(
			2,
			"B550M PRO-VDH WIFI",
			false,
			categories[2],
			false,
			false,
			false
		),
	]);
}
