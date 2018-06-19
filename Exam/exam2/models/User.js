const mongoose = require('mongoose');
const encryption = require('../utils/encrypting');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
	email: { type: mongoose.Schema.Types.String, required: true, unique: true },
	hashedPass: { type: mongoose.Schema.Types.String, required: true },
	salt: { type: mongoose.Schema.Types.String, required: true },
	roles: [{ type: mongoose.Schema.Types.String }],
	isAdmin: { type: Boolean, default: false }

});

userSchema.method({
	authenticate: function (password) {
		return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
	}
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
	try {
		let users = await User.find();
		if (users.length > 0) return;
		const salt = encryption.generateSalt();
		const hashedPass = encryption.generateHashedPassword(salt, '123');
		return User.create({
			email: 'admin',
			salt,
			hashedPass,
			roles: ['Admin'],
			isAdmin: true
		});
	} catch (e) {
		console.log(e);
	}
};
module.exports = User;