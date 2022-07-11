const { response, request } = require('express');
const { getConnection } = require('../database/config');



const usuariosGet = async (req = request, res = response) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM alumno");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


const usuariosPost = async (req, res = response) => {
    res.json({
        msg : "Método POST"
    })

}


const usuariosPut = async (req, res = response) => {
    res.json({
        msg : "Método PUT"
    })
}

const usuariosDelete = async (req, res = response) => {
    res.json({
        msg : "Método DELETE"
    })
}

module.exports= {
    usuariosGet, usuariosPost, usuariosPut, usuariosDelete
}