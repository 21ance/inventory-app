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
		date_created: new Date(),
		date_modified: new Date(),
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
		date_created: new Date(),
		date_modified: new Date(),
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
		categoryCreate(3, "Laptops", false, false),
	]);
}
async function createitems() {
	console.log(categories);
	console.log("Adding Items");
	await Promise.all([
		itemCreate(
			0,
			"Ryzen 5 5600",
			"AMD Ryzen™ 5 5600 is a desktop processor that comes with 6 CPU cores, 12 threads, an AM4 socket, and a base clock speed of 3.5GHz.",
			categories[0],
			150,
			false,
			false
		),
		itemCreate(
			1,
			"Ryzen 7 5800X3D",
			"Unleash even more gaming performance with 3D-stacked L3 cache. The AMD Ryzen™ 7 5800X3D is the first desktop processor with stacked L3 cache, delivering unmatched 96MB of L3 cache paired with incredibly fast cores to create the world’s fastest gaming desktop processor.",
			categories[0],
			399,
			false,
			false
		),
		itemCreate(
			2,
			"MSI B550M PRO-VDH WIFI",
			"Supports AMD Ryzen™ 5000 & 3000 Series desktop processors (not compatible with AMD Ryzen™ 5 3400G & Ryzen™ 3 3200G) and AMD Ryzen™ 4000 G-Series desktop processors",
			categories[2],
			false,
			false,
			false
		),
		itemCreate(
			3,
			"CORSAIR VENGEANCE RGB DDR5 RAM 32GB (2x16GB) 6000MHz CL36 Intel XMP iCUE Compatible Computer Memory",
			"Dynamic Ten-Zone RGB Lighting: Illuminate your system with ten individually addressable, ultra-bright RGB LEDs per module, encased in a panoramic light bar for vivid RGB lighting from any viewing angle. Onboard Voltage Regulation: Enables easier, more finely-tuned, and more stable overclocking through CORSAIR iCUE software than previous generation motherboard control.",
			categories[0],
			105,
			false,
			false
		),
		itemCreate(
			4,
			"Lexar THOR 32GB (2x16GB) DDR5 RAM 6000MT/s CL32",
			"Speed and Power: Built to live up to its name, embodying and delivering the speed and power of Thors hammer. Superior Heatsink: With 1.6mm-thick heat spreader made with an aerospace-grade anodized aluminum, it provides a total heat dissipation area of up to 9000m.",
			categories[1],
			99,
			false,
			false
		),
		itemCreate(
			5,
			"Crucial Pro RAM 32GB Kit (2x16GB) DDR4 3200MT/s",
			"Plug-and-play high performance. Downclock capable for systems that only support 3000MT/s or 2666MT/s. Universal compatibility. Compatible with 8th to 13th Gen Intel Core or AMD Ryzen 1000 to 5000 Series desktop CPUs",
			categories[1],
			45,
			false,
			false
		),
		itemCreate(
			6,
			"Corsair VENGEANCE LPX DDR4 RAM 32GB (2x16GB) 3200MHz CL16",
			"a",
			categories[1],
			67,
			false,
			false
		),
		itemCreate(7, "Ryzen 5 3600", "", categories[1], 99.99, false, false),
		itemCreate(
			8,
			"Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6 Full HD IPS Display",
			"a",
			categories[3],
			299.99,
			false,
			false
		),
		itemCreate(
			9,
			"Lenovo V15 Laptop, 15.6 FHD Display, AMD Ryzen 5 5500U Hexa-core Processor",
			"a",
			categories[3],
			492.95,
			false,
			false
		),
	]);
}
