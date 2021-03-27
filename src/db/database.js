const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/**
 * Se establece la conexion con la base de datos
 */
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(db => {
    console.log('DB conectada a ', db.connection.host);

}).catch(err => console.error(err));

module.exports = mongoose;
