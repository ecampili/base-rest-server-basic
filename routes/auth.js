const { Router } = require('express');
const { check } = require('express-validator')


const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('password', 'la password es obligatoria').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    //check('email').custom((email) => existsEmail(email)),
    validateFields
], login)

module.exports = router;