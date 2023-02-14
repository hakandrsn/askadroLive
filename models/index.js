const dbConfig = require("../configs/sqlOptions");
const Sequelize = require("sequelize");
const config = dbConfig("postgres");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    },
})
const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.account = require("./Account.model")(sequelize,Sequelize);
db.personel = require("./Personel.model")(sequelize,Sequelize);
db.address =require("./Address.model")(sequelize,Sequelize);
db.work = require("./Work.model")(sequelize,Sequelize);

db.account.hasOne(db.personel)
db.personel.belongsTo(db.account)

db.account.hasOne(db.address)
db.address.belongsTo(db.account)

db.personel.hasMany(db.work);
db.work.belongsTo(db.personel)


module.exports = db;