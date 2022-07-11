const { response, request } = require('express');
const { getConnection } = require('../database/config');

const getAlumnos = async (req = request, res = response) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM alumno");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getAlumnoById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM alumno WHERE idalumno = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addAlumno = async (req = request, res = response) => {
    try {
        const { IdAlumno, ApeAlumno, NomAlumno, IdEsp, Proce } = req.body;
        if (IdAlumno === undefined || ApeAlumno === undefined
            || NomAlumno === undefined || IdEsp === undefined
            || Proce === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const alumno = {IdAlumno, ApeAlumno, NomAlumno, IdEsp, Proce };
        const connection = await getConnection();
        await connection.query("INSERT INTO alumno SET ?", alumno);
        res.json({ message: "Alumno agregado" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const { ApeAlumno, NomAlumno, IdEsp, Proce } = req.body;

        if (id === undefined || ApeAlumno === undefined
            || NomAlumno === undefined || IdEsp === undefined
            || Proce === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const alumno = { ApeAlumno, NomAlumno, IdEsp, Proce };
        const connection = await getConnection();
        const result = await connection.query("UPDATE alumno SET ? WHERE idalumno = ?", [alumno, id]);
        if(result.affectedRows > 0){
            res.json({ message: "Alumno actualizado" });
        }else {
            res.status(404).json({ message: "Alumno no encontrado" });
        }        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM alumno WHERE idalumno = ?", id);
        if(result.affectedRows > 0){
            res.json({ message: "Alumno eliminado" });
        }else {
            res.status(404).json({ message: "Alumno no encontrado" });
        }  
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

module.exports= {
    getAlumnos, getAlumnoById, addAlumno, updateAlumno, deleteAlumno
}