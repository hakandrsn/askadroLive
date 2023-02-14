const {account, personel, address} = require("../models")
const Op = require("../models").Sequelize.Op;
const createError = require('http-errors')
const {USER} = require("../constants/auth");
const createWithPersonel = async (req, res, next) => {
    const {firstName, lastName, tc, phone, birthDate, role, sex, iban, city, semt, longAddress} = req.body;
    try {
        const personelControl = await personel.findOne({where: {tc: tc}})
        if (personelControl === null) {
            const newAccount = {
                password: (tc.slice(0, 8) + firstName.slice(0, 2)),
                email: (tc + "@askadro.com"),
                auth: USER
            }
            await account.create(newAccount).then(async (e, i) => {
                const newPersonel = {accountId: e.id, firstName, lastName, role, phone, tc, birthDate, sex, iban}
                const newAddress = {accountId: e.id, city, semt, longAddress}
                await personel.create(newPersonel)
                await address.create(newAddress)
                res.status(200).send({message: "Account created successfully!"})
            })
        } else {
            next(createError(400, "Bu tc ye ait bir personel bulunuyor"))
        }
    } catch
        (e) {
        next(e)
    }
}

const createWithCompany = async (req, res, next) => {
    /*    const {password, firstName, lastName, tc, phone, birthDate, role, sex, iban, city, semt, longAddress} = req.body;
        try {
            const accountControl = await account.findOne({where: {tc: tc}})
            await account.create({password}).then(async (e, i) => {
                const newCompany = {accountId: e.id}
                const newAddress = {accountId: e.id, city, semt, longAddress}
                await company.create(newCompany)
                await address.create(newAddress)
                res.status(200).send({message: "Account created successfully!"})
            })
        } catch (e) {
            res.status(500).send({message: e.message})
        }*/
    res.send({message: "Henüz hazır değil"})
}
const findAllWithAddressAndPersonel = async (req, res, next) => {
    try {
        await account.findAll({include: [address, personel]}).then(async (e, i) => {
            res.status(200).send(e)
        })
    } catch (e) {
        next(e)
    }
}
const findAllCompany = async (req, res, next) => {
    try {
        await account.findAll({where:{auth:"COMPANY"}}).then(async (e, i) => {
            res.status(200).send(e)
        })
    } catch (e) {
        next(e)
    }
}
const findAllAdmin = async (req, res, next) => {
    try {
        await account.findAll({where:{auth:"ADMIN"}}).then(async (e, i) => {
            res.status(200).send(e)
        })
    } catch (e) {
        next(e)
    }
}
const findOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        await account.findByPk(id, {include: [address, personel]}).then(async (e, i) => {
            res.status(200).send(e)
        })
    } catch (e) {
        next(e)
    }
}
const deleteAccount = async (req, res, next) => {
    const id = req.params.id;
    try {
        await account.destroy({where: {id: id}}).then(async (e, i) => {
            res.status(200).send({message: "Account deleted successfully!"})
        })
    } catch (e) {
        next(e)
    }
}
const update = async (req, res, next) => {
    const id = req.params.id;
    const {password, firstName, lastName, tc, phone, birthDate, sex, iban, role, city, semt, longAddress} = req.body;
    try {
        await account.update({password}, {where: {id: id}}).then(async (e, i) => {
                const newPersonel = {firstName, lastName, phone, tc, birthDate, sex, iban, role}
                const newAddress = {city, semt, longAddress}
                await personel.update(newPersonel, {where: {accountId: id}})
                await address.update(newAddress, {where: {accountId: id}})
                res.status(200).send({message: "Account updated successfully!"})
            }
        )
    } catch (e) {
        next(e)
    }
}

module.exports = {
    createWithPersonel,
    createWithCompany,
    findAllWithAddressAndPersonel,
    findOne,
    deleteAccount,
    update,
    findAllCompany,
    findAllAdmin,
}