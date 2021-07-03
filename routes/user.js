const { Router } = require('express');
const { check } = require('express-validator')

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    patchUser } = require('../controllers/user');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole, haveRole } = require('../middlewares/validate-roles')
const { validateRole, existsEmail, existsUserById } = require('../helpers/db-validators');

const Role = require('../models/Role');

const router = Router();

router.get('/', getUsers)

router.post('/', [
    check('name', 'El nombre es obligarorio').not().isEmpty(),
    check('password', 'El password debe de ser de  mas de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom((email) => existsEmail(email)),
    //check('role', 'No es un rol permitido').isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check('role').custom((role) => validateRole(role)),
    validateFields

], createUser)

router.put('/:id', [
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom((id) => existsUserById(id)),
    check('role').custom((role) => validateRole(role)),
    validateFields
], updateUser)

router.delete('/:id', [
    validateJWT,
    //isAdminRole, // solo apara admin
    haveRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom((id) => existsUserById(id)),
], deleteUser)

router.patch('/:id', patchUser)



module.exports = router;