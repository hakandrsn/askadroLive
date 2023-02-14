const {ACCOUNT} = require("../constants/dbTableName")
module.exports = (sequelize, Sequelize) => {
    const account = sequelize.define(ACCOUNT, {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: Sequelize.STRING,
            default: "askadro"
        },
        email: {
            type: Sequelize.STRING,
        },
        auth: {
            type: Sequelize.STRING,
            default: "user",
        },
    })
    return account;
}