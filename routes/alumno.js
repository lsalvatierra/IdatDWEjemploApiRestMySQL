const { Router } = require ('express');

const { getAlumnos, getAlumnoById, addAlumno, updateAlumno, deleteAlumno } = require('../controllers/alumno');

const router  = Router();

router.get('/', getAlumnos);

router.get('/:id', getAlumnoById);

router.post('/', addAlumno);

router.put('/:id', updateAlumno);

router.delete('/:id', deleteAlumno);


module.exports = router;