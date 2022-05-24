const { Sequelize } = require("sequelize");
const { dbConfig } = require("../db/config_db");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.user,
	dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect,
	}
);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require("./user")(sequelize, Sequelize.DataTypes);
db.models.Note = require("./note")(sequelize, Sequelize.DataTypes);
db.models.Subject = require("./subject")(sequelize, Sequelize.DataTypes);

const user = db.models.User;
const note = db.models.Note;
const subject = db.models.Subject;

// maybe works to be tested
user.hasMany(subject, {
	constraints: false,
});
subject.belongsToMany(user, { through: note });
subject.hasMany(note);
note.belongsTo(subject);
user.hasMany(note);
note.belongsTo(user);

module.exports = {
	db,
};
