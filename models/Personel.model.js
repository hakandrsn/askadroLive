const {PERSONEL} = require("../constants/dbTableName")
module.exports = (sequelize, Sequelize) => {
    const personel = sequelize.define(PERSONEL, {
        firstName: {type: Sequelize.STRING},
        lastName: {type: Sequelize.STRING},
        tc: {
            type: Sequelize.STRING,
          //  unique: true,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [11, 11]
            }
        },
        phone: {
            type: Sequelize.STRING,
         //   unique: true,
            allowNull: false,

        },
        birthDate: {
            type: Sequelize.STRING,

        },
        sex: {
            type: Sequelize.STRING,
        },
        iban: {
            type: Sequelize.STRING,
         //   unique: true,
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "garson"
        }
    }, {timestamps: false})
    return personel;
}