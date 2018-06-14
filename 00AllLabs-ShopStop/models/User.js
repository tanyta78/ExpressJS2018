const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const propertyIsRequired = '{0} is required.';
const ObjectId = mongoose.Schema.Types.ObjectId;

let userSchema =new mongoose.Schema({
	username: {
		type: String,
		required: propertyIsRequired.replace('{0}', 'Username'),
		unique: true
	},
	password: {
		type: String,
		required: propertyIsRequired.replace('{0}', 'Password')
	},
	salt: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: propertyIsRequired.replace('{0}', 'First name'),
	},
	lastName: {
		type: String,
		required: propertyIsRequired.replace('{0}', 'Last name'),
	},
	age: {
		type: Number,
		min: [0, 'Age must be between 0 and 120'],
		max: [120, 'Age must be between 0 and 120']
	},
	gender: {
		type: String,
		enum: {
			values: ['Male', 'Female'],
			message: 'Gender should be either "Male" or "Female".'
		}
	},
	roles: [{ type: String }],
	boughtProducts: [{ type: ObjectId, ref: 'Product' }],
	createdProducts: [{ type: ObjectId, ref: 'Product' }],
	createdCategories: [{ type: ObjectId, ref: 'Category' }]
});

userSchema.method({
	authenticate:function (password) {
		let hashedPassword = encryption.generateHashedPassword(this.salt, password);

		if(hashedPassword === this.password){
			return true;
		}

		return false;
	}
});

const User = mongoose.model('User', userSchema);

module.exports=User;

module.exports.seedAdminUser=()=>{
	User.find({username:'admin'}).then(users=>{
		console.log(users);
		
		if(users.length === 0){
			let salt = encryption.generateSalt();
			let hashedPassword = encryption.generateHashedPassword(salt,'Admin12');

			let adminUser = {
				username:'admin',
				firstName:'Check',
				lastName:'In',
				salt:salt,
				password:hashedPassword,
				age:39,
				gender:'Female',
				roles:['Admin']
			}; 

			User.create(adminUser);
		}
	});
};