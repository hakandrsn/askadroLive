const {address} = require("../models")
const Op = require("../models").Sequelize.Op;
const createError = require('http-errors')

const create = (req, res, next) => {
    res.send({message: "address oluşturamazsınız"})
}
const findAll = (req, res, next) => {
    address.findAll().then(data => {
        res.send(data)
    })
        .catch(err => {
            next(err)
        });
}
const findByAccount = (req, res, next) => {
    const id = req.params.id;
    address.findAll({where: {accountId: id}}).then(data => {
            if (data.length === 0) {
                next(createError(404, 'address not found'))
            }
            res.send(data)
        }
    )
        .catch(err => {
            next(err)
        });
}
const update = async (req, res, next) => {
    const id = req.params.id;
    try {
        await address.update(req.body, {
            where: {id: id}
        }).then(num => {
            if (num == 1) {
                res.send({
                    message: "address was updated successfully."
                });
            } else {
                next(createError(404, 'address not found'))
            }
        })
            .catch(err => {
                next(err)
            });
    } catch (e) {
        next(e)
    }
}

const deleteAddress = async (req, res, next) => {
    const id = req.params.id;
    try {
        await address.destroy({
            where: {id: id}
        }).then(num => {
            if (num == 1) {
                res.send({
                    message: "address was deleted successfully!"
                });
            } else {
                next(createError(404, 'address not found'))
            }
        })
            .catch(err => {
                next(err)
            });
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    findByAccount,
    findAll,
    update,
    deleteAddress
}