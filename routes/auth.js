

// Rutas de usuarios AUTH 
//  host +  /api/auth  localhost:4000/api/auth


const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidartoken } = require('../controllers/auth');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-Jwt');




router.post(
        '/new',
        [
                check('name', 'el nombre es obligatorio').not().isEmpty(),
                check('email', 'el email es obligatorio').isEmail(),
                check('password', 'el password es obligatorio y debe tener 6 carcteres').isLength({ min: 6 }),
                validarcampos
        ],
        crearUsuario)


router.post(
        '/',
        [
                check('email', 'el email es obligatorio').isEmail(),
                check('password', 'el password es obligatorio y debe tener 6 carcteres').isLength({ min: 6 }),
                validarcampos
        ],
        loginUsuario)

router.get('/renew', validarJwt, revalidartoken)


module.exports = router