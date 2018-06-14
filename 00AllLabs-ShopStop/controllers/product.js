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
	productObj.creator = req.user._id;

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
			res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
			return;
		}

		if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
			Category.find().then((categories) => {
				res.render('product/edit', {
					product: product,
					categories: categories
				});
			});
		} else {
			res.redirect(`/?error=${encodeURIComponent('You do not have rights to edit this product!')}`);
			return;
		}
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

		if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {

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

		if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
			res.render('product/delete', {
				product: product
			});
		} else {
			res.redirect(
				`/?error=${encodeURIComponent('You do not have rights to delete this!')}`
			);
			return;
		}

	}).catch(() => {
		res.sendStatus(404);
	});
};

module.exports.deletePost = (req, res) => {
	let id = req.params.id;
	let creator = req.user._id;

	Product.findByIdAndRemove({ _id: id, creator: creator }).then((removedProduct) => {

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

					let boughtProductsIndex = req.user.boughtProducts.indexOf(id);
					let createdProductsIndex = req.user.createdProducts.indexOf(id);

					if (boughtProductsIndex > -1) {
						req.user.boughtProducts.splice(boughtProductsIndex, 1);
					}

					if (createdProductsIndex > -1) {
						req.user.createdProducts.splice(createdProductsIndex, 1);
					}

					req.user.save().then(() => {
						res.redirect(
							`/?success=${encodeURIComponent('Product was deleted successfully!')}`
						);
					});
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

		if (product.buyer) {
			res.redirect(
				`/?error=${encodeURIComponent('Product was already bought!')}`
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

module.exports.buyPost = (req, res) => {
	let id = req.params.id;

	Product.findById(id).then((product) => {
		if (product.buyer) {
			res.redirect(
				`/?error=${encodeURIComponent('Product was already bought!')}`
			);
			return;
		}

		product.buyer = req.user._id;
		product.save().then(() => {
			req.user.boughtProducts.push(id);
			req.user.save().then(() => {
				res.redirect('/');
			});
		});
	});
};
