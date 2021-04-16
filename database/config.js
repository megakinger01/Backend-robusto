const mongoose = require('mongoose');



const dbConnection = async () => {

    try {

        await mongoose.connect(
            process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });

        console.log('DB online');

    } catch (error) {

        console.log(error);
        throw new Error('error al iniciar la conexion de la  base de datos ')
    }
}

module.exports = {
    dbConnection
}

