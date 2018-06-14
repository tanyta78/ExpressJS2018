const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
	res.render('category/add');
};

module.exports.addPost = (req, res) => {
	let category = req.body;
	category.creator = req.user._id;
	
	Category.create(category).then(() => {
		res.redirect('/');
	});
};

module.exports.productByCategory = (req, res)=>{
	let categoryName = req.params.category;

	Category.findOne({name:categoryName})
		.populate('products')
		.then((category)=>{
			if(!category){
				res.sendStatus(400);
				return;
			}
			console.log(category);
			

			res.render('category/products',{category:category});
		});
};