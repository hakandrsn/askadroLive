const account = require("./account.routes");
const work = require("./work.routes");
const personel = require("./personel.routes");
const address = require("./address.routes");
module.exports = app => {
    app.use('/api/account', account);
    app.use('/api/work', work);
    app.use('/api/personel', personel);
    app.use('/api/address', address);
}