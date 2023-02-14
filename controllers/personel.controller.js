
const {personel} = require("../models")
const Op = require("../models").Sequelize.Op;
const createError = require('http-errors')

const findAll = (req, res,next) => {
    personel.findAll().then(data => {res.send(data)})
        .catch(err => {
            next(err)
        });
}
const findById = (req, res,next) => {
    const id = req.params.id;
    if (!id) throw createError(400, 'id is required')
    personel.findByPk(id).then(data => {res.send(data)})
        .catch(err => {
            next(err)
        });
}

const deletePersonel = (req, res,next) => {
    const id = req.params.id;
    if (!id) throw createError(400, 'id is required')
    personel.destroy({where: {accountId:id}}).then(data => {res.send(data)})
        .catch(err => {
            next(err)
        });
}
const updatePersonel = (req, res,next) => {
    const id = req.params.id;
    if (!id) throw createError(400, 'id is required')
    try {
        personel.update(req.body, {
            where: {id: id}
        }).then(data => {res.send(data)})
            .catch(err => {
                next(err)
            });
    }
    catch (e) {
        next(e)
    }
}
module.exports = {
    findAll,
    findById,
    deletePersonel,
    updatePersonel

}