
const { Router } = require('express');
const { check } = require('express-validator')
const { validarJwt } = require('../middlewares/validar-Jwt')
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarcampos } = require('../middlewares/validar-campos');
const { isDate } = require('../middlewares/isDate');




const router = Router();

router.use(validarJwt)


router.get(
    '/',

    getEvento)

router.post(
    '/',
    [
        check('title', 'el titulo es obligatorio').not().isEmpty(),
        check('start', 'la fecha de inicio es obligatoria').custom(isDate),
        check('end', 'la fecha de finalizacion es obligatoria').custom(isDate),
        validarcampos
    ],
    crearEvento
)

router.put(
    '/:id',
    [
        check('title', 'el titulo es obligatorio').not().isEmpty(),
        check('start', 'la fecha de inicio es obligatoria').custom(isDate),
        check('end', 'la fecha de finalizacion es obligatoria').custom(isDate),
        validarcampos
    ],

    actualizarEvento)

router.delete('/:id', eliminarEvento)


module.exports = router