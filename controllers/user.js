const { response } = require('express')


const getUsers = (req, res = response) => {
    const { name, apikey, page = 1, limit } = req.query
    res.json({
        msg: 'get User con controller',
        name,
        apikey,
        page,
        limit
    })
}

const createUser = (req, res = response) => {
    const { name, age } = req.body
    res.json({
        msg: 'create User con controller',
        name,
        age
    })
}

const updateUser = (req, res = response) => {
    const { id } = req.params
    const { name, age } = req.body
    res.json({
        msg: 'update User con controller',
        id
    })
}

const deleteUser = (req, res = response) => {
    const { id } = req.params
    res.json({
        msg: 'delete User con controller',
        id
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