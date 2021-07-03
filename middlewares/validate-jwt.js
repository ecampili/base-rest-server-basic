const jwt = require('jsonwebtoken')
const User = require('../models/User')

const validateJWT = async (req, res, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'no tienes permiso para realizar esta accion'
        });
    }
    try {
        //verifica JWT
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Buscar el usuario que corresponde al uid
        const user = await User.findById(uid)
        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });

        }

        // verificar que este activo
        if (!user.isActive) {
            return res.status(401).json({
                msg: 'Token no valido - isActive:false'
            });
        }



        req.user = user;
        next()

    } catch (err) {

        console.log(err)
        res.status(401).json({
            msg: 'Token no valido '
        })

    }

}

module.exports = {
    validateJWT
}