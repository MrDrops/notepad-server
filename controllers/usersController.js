const bcrypt = require("bcrypt");
const saltRounds = 10;
const { db } = require("../models");
const User = db.models.User;

//All user Controllers

registerNewUser = async (req, res) => {
	const userName = req.body.userName;
	const email = req.body.email;
	const password = req.body.password;
	console.log(email);
	// sequeliser ----
	const allUsers = await User.findAll();
	const emailArray = [];
	if (allUsers.length > 0) {
		allUsers.map((user) => {
			emailArray.push(user.email);
		});
	}
	// added working controller
	bcrypt.hash(password, saltRounds, async (err, hash) => {
		if (err) {
			console.log(req.body);
			console.log(err);
			return res.json({ message: "err", state: false });
		}
		if (emailArray.includes(email)) {
			return res.json({ message: "email already exists", state: false });
		} else {
			try {
				// for sequealizer ---
				const result = await User.create({
					firstName: "",
					lastName: "",
					userName: userName,
					email: email,
					password: hash,
				});
				res.json({
					userName: userName,
					email: email,
					message: "sucess",
					state: true,
				});
				console.log(result);
			} catch (err) {
				res.json({ message: err, state: false });
				console.log(err);
			}
		}
	});
	//redirect to user profile ------
};

getUser = async (req, res) => {
	try {
		// for sequaliser ----
		const data = await User.findAll({
			where: { id: req.params.id },
		});

		if (!data) {
			console.log(data);
			throw new Error(data, "data error");
		} else {
			res.json(data);
			console.log(data);
		}
	} catch (err) {
		res.send({ error: err });
	}
};

putUser = (req, res) => {
	const data = req.body;
	try {
		User.update(
			{
				firstName: data.firstName,
				lastName: data.lastName,
				userName: data.userName,
			},
			{ where: { id: data.id } }
		).then(() => {
			res.status(200).json({ message: "note updated" });
		});
	} catch (err) {
		res.send({ error });
	}
};

deleteUser = (req, res) => {
	res.send(`delete user with id`);
	//redirect to landing?;
};

module.exports = {
	registerNewUser,
	getUser,
	putUser,
	deleteUser,
};
