const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/**
 * The connection with the database is established
 */
mongoose.connect('mongodb://localhost:27017/zebrans', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(db => {
    console.log('DB connected to ', db.connection.host);

}).catch(err => console.error(err));

module.exports = mongoose;
