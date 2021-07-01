const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')



const getUsers = async (req, res = response) => {
    const { desde = 0, limite = 5 } = req.query

    const promise1 = User.countDocuments({ isActive: true })

    const promise2 = User.find({ isActive: true })
        .skip(Number(desde))
        .limit(Number(limite))

    const [total, users] = await Promise.all([
        promise1,
        promise2
    ])

    res.json({
        total,
        users
    })
}

const createUser = async (req, res = response) => {

    try {
        const { name, email, password, role } = req.body
        const user = new User({
            name,
            email,
            password,
            role
        });

        // encriptar password
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt)


        // guardar en database
        await user.save();
        return res.json({
            user
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: e.message
        })
    }
}

const updateUser = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, email, ...rest } = req.body


    // validar contra base de datos
    if (password) {
        // encriptar password
        const salt = bcrypt.genSaltSync(10);
        rest.password = bcrypt.hashSync(password, salt)
    }

    const updateUser = await User.findByIdAndUpdate(id, rest);

    return res.json({
        updateUser
    })
}

const deleteUser = async (req, res = response) => {
    const { id } = req.params

    // borar fisicamente
    //const user = await User.findByIdAndDelete(id);

    // borrar logicamente usar este modo siempre
    const user = await User.findByIdAndUpdate(id, { isActive: false })

    res.json({
        user
    })
}

const patchUser = (req, res = response) => {
    const { id } = req.params
    res.json({
        msg: 'patch User con controller',
        id
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    patchUser
}