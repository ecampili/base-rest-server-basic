const { Router } = require('express');
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    patchUser } = require('../controllers/user');

const router = Router();

router.get('/', getUsers)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

router.patch('/:id', patchUser)



module.exports = router;