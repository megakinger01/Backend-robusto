const jwt = require('jsonwebtoken')



const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name }

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '5h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('no se pudo  generar el token')
            }

            resolve(token)
        })
    })


}

module.exports = {
    generarJWT
}