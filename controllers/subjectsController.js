//All subjects controllers
const { db } = require("../models");
const Subject = db.models.Subject;
const SubjectUser = db.models.SubjectUser;
const session = require("./sessionController");

// might need to change ---
getAllSubjectsForUser = (req, res) => {
	//get user from active user
	//const ownerId = 1; //for testing purposes
	session.getUser().then(({ id }) => {
		try {
			Subject.findAll({
				where: { ownerId: id },
			}).then((subjects) => {
				res.status(200).json(subjects);
			});
		} catch (err) {
			res.send({ error: err });
		}
	});
};

postNewSubject = (req, res) => {
	//const ownerId = 1; //get session user id
	//if (Auth(req).auth) {
	    const { title } = req.body;
		try {
			Subject.create({
				title,
				ownerId: id,
			}).then(() => {
				res.status(200).json({ message: `subject ${title} created` });
			});
		} catch (err) {
			res.send({ error: err });
		}
	//};
};

getSubject = (req, res) => {
	const id = req.params.id; //subject_id
	try {
		Subject.findAll({
			where: { id },
			// include: [{ model: SubjectUser, as: 'participants',
			// attributes: [ subjectId ] }]
		}).then((subject) => {
			res.status(200).json(subject);
		});
	} catch (err) {
		res.send({ error: err });
	}
};

putSubject = (req, res) => {
	//advanced query
	res.send(`update subject. populated subject form`);
};

deleteSubject = (req, res) => {
	const id = req.params.id;
		try {
			Subject.destroy({ where: { id } }).then(() => {
				res.status(200).json({ message: `subject ${id} destroyed` });
			});
		} catch (err) {
			res.send({ error: err });
	}
};

module.exports = {
	getAllSubjectsForUser,
	postNewSubject,
	getSubject,
	putSubject,
	deleteSubject,
};
