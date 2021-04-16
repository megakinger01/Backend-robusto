const { response } = require('express')
const jwt = require('jsonwebtoken')


const validarJwt = (req, res = response, next) => {

    const token = req.header('x-token')
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion'
        })
    }

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_KEY
        )
        req.uid = uid
        req.name = name


    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })

    }
    next()
}


module.exports = { validarJwt }