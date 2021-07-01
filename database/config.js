const mongoose = require('mongoose')

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('database is connected')

    } catch (e) {
        console.log(e)
        throw new error('Error en la base de datos')
    }
}

module.exports = {
    dbConnection
}

