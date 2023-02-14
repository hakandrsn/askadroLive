const mssql ={
    HOST: "localhost",
    PORT: "1433",
    USER: "sa",
    PASSWORD: "051212",
    DB: "askadro",
    dialect: "mssql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
const postgres ={
    HOST: "askadrovip.cmopapa3krya.us-east-1.rds.amazonaws.com",
    PORT: "5432",
    USER: "postgres",
    PASSWORD: "051212",
    DB: "askadro",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

const sqlOption =(sql)=>{
    switch (sql) {
        case "mssql":
            return mssql
        case "postgres":
            return postgres
    }
}

module.exports = sqlOption