const { response } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');

const login = async (req, res = response) => {

    const { password, email } = req.body;

    try {

        // verificar si email existe
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json(
                {
                    msg: 'El usuario o la passwords no son correctos - correo'
                }
            )
        }
        // verificar si el usuario esta activo
        if (!user.isActive) {
            return res.status(400).json(
                {
                    msg: 'El usuario o la passwords no son correctos - no esta activo'
                }
            )
        }

        // verificar password

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json(
                {
                    msg: 'El usuario o la passwords no son correctos - password'
                }
            )
        }

        // generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salio mal'
        })
    }



}


module.exports = {
    login
}