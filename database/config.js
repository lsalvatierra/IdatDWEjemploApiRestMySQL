const mysql = require('mysql')
const promisemysql = require("promise-mysql");


const connection = promisemysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});

const getConnection = () => {
    try{
        console.log('Base de datos online');
        return connection;
    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos.')
    }
};

module.exports = {
    getConnection
};

