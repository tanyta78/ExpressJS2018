const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs');

module.exports.addGet = (req, res) => {
	Category.find().then((categories) => {
		res.render('product/add', { categories: categories });
	});
};
module.exports.addPost = (req, res) => {
	let productObj = req.body;
	productObj.image = '\\' + req.file.path;

	Product.create(productObj).then((product) => {
		Category.findById(product.category).then((category) => {
			category.products.push(product._id);
			category.save();
		});
		res.redirect('/');
	});
};
module.exports.editGet = (req, res) => {
	let id = req.params.id;
	Product.findById(id).then(product => {
		if (!product) {
			res.redirect(`/?error=${encodeURIComponent('error=Product was not found!')}`);
			return;
		}

		Category.find().then((categories) => {
			res.render('product/edit', {
				product: product,
				categories: categories
			});
		});
	});
};

module.exports.editPost = (req, res) => {
	let id = req.params.id;
	let editedProduct = req.body;

	Product.findById(id).then((product) => {
		if (!product) {
			res.redirect(`/?error=${encodeURIComponent('error=Product was not found!')}`);
			return;
		}

		product.name = editedProduct.name;
		product.description = editedProduct.description;
		product.price = editedProduct.price;

		if (req.file) {
			product.image = '\\' + req.file.path;
		}

		if (product.category.toString() !== editedProduct.category) {
			Category.findById(product.category).then((currentCategory) => {
				Category.findById(editedProduct.category).then((nextCategory) => {
					let index = currentCategory.products.indexOf(product._id);
					if (index >= 0) {
						currentCategory.products.splice(index, 1);
					}
					currentCategory.save();

					nextCategory.products.push(product._id);
					nextCategory.save();

					product.category = editedProduct.category;

					product.save().then(() => {
						res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
					});
				});
			});
		} else {
			product.save().then(() => {
				res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
			});
		}
	});

};

module.exports.deleteGet = (req, res) => {
	let id = req.params.id;

	Product.findById(id).then((product) => {
		if (!product) {
			res.redirect(
				`/?error=${encodeURIComponent('Product was not found!')}`
			);
			return;
		}

		res.render('product/delete', {
			product: product
		});

	}).catch(() => {
		res.sendStatus(404);
	});
};

module.exports.deletePost = (req, res) => {
	let id = req.params.id;

	Product.findByIdAndRemove(id).then((removedProduct) => {

		Category
			.update({ _id: removedProduct.category }, { $pull: { products: removedProduct._id } })
			.then((result) => {
				console.log(result);

				let imageName = removedProduct.image.split('\\').pop();

				console.log(imageName);
				
				fs.unlink(`./content/images/${imageName}`, (err) => {
					if (err) {
						console.log(err);
						res.sendStatus(404);
						return;
					}

					res.redirect(
						`/?success=${encodeURIComponent('Product was deleted successfully!')}`
					);
				});
			}).catch(() => {
				res.redirect(
					`/?error=${encodeURIComponent('Product was not found!')}`
				);
			});
	});
};


module.exports.buyGet = (req, res) => {
	let id = req.params.id;

	Product.findById(id).then((product) => {
		if (!product) {
			res.redirect(
				`/?error=${encodeURIComponent('Product was not found!')}`
			);
			return;
		}

		res.render('product/buy', {
			product: product
		});
	}).catch(() => {
		res.sendStatus(404);
	});
};
