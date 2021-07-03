

const isAdminRole = (req, res, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'se quiere verificar el role sin validar token'
        })
    }


    const { role, name } = req.user

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'No eres Admin'
        })
    }

    next()

}

const haveRole = (...roles) => {

    // retorna la funcion
    return (req, res, next) => {

        //el users viene en la req si no viene es porque no se verifico token
        if (!req.user) {
            return res.status(500).json({
                msg: 'se quiere verificar el role sin validar token'
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next()
    }
}

module.exports = {
    isAdminRole,
    haveRole
}