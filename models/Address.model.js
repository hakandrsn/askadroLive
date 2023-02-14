const {ADDRESS} = require("../constants/dbTableName")
module.exports= (sequelize,Sequelize) =>{
    const address = sequelize.define(ADDRESS,{
        city:{type:Sequelize.STRING},
        semt:{type:Sequelize.STRING},
        longAddress:{type:Sequelize.STRING}
    },{timestamps:false})
    return address;
}