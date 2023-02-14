const {WORK} = require("../constants/dbTableName")
module.exports= (sequelize,Sequelize) =>{
    const work = sequelize.define(WORK,{
        company:{type:Sequelize.STRING},
        hour:{type:Sequelize.STRING},
        date:{type:Sequelize.STRING},
        payment:{type:Sequelize.STRING},
        role:{type:Sequelize.STRING},
    })
    return work;
}