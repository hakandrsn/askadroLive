const {work} = require("../models")
const Op = require("../models").Sequelize.Op;
const createError = require('http-errors')

const create =async (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Account can not be empty!"
        });
    }
    const newWork = {
        ...req.body,
        personelId: req.body.personelId
    }
    // Save work in the database
  await work.create(newWork).then(data => {
        res.send(data)
    })
        .catch(err => {
            next(err)
        });
}
const bulkCreate = async(req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Account can not be empty!"
        });
    }
    console.log(req.body)
    const nesWorks = req.body.map((item) => {
        return {
            ...item,
            personelId: item.personelId
        }
    })
    console.log(nesWorks)

    // Save work in the database
    await  work.bulkCreate(nesWorks).then(data => {
        res.send(data)
    })
        .catch(err => {
            next(err)
        });
}
const findAll = async(req, res, next) => {
    await work.findAll().then(data => {
        res.send(data)
    })
        .catch(err => {
            next(err)
        });
}
const findByPersonel =async (req, res, next) => {
    const id = req.params.id;
    if (!id) throw next(createError(400, 'Personel id is required'))
    await work.findAll({where: {personelId: id}}).then(data => {
            if (data.length === 0) {
                next(createError(404, 'Work not found'))
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
    if (!id) throw createError(400, 'Work id is required')
    console.log(req.body)
    if (!req.body) next(createError(491, 'Work can not be empty'))
    try {
        await work.update(req.body, {
            where: {id: id}
        }).then(num => {
            if (num == 1) {
                res.send({
                    message: "Work was updated successfully."
                });
            } else {
                next(createError(404, 'Work not found'))
            }
        })
            .catch(err => {
                next(err)
            });
    } catch (e) {
        next(e)
    }
}
const deleteWork = async (req, res, next) => {
    const id = req.params.id;
    try {
        await work.destroy({
            where: {id: id}
        }).then(num => {
            if (num == 1) {
                res.send({
                    message: "Work was deleted successfully!"
                });
            } else {
                next(createError(404, 'Work not found'))
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
    findByPersonel,
    findAll,
    update,
    deleteWork,
    bulkCreate
}