const { listen } = require('./app');
const app = require('./app');
const UserModel = require('./models/user');
const bcrypt = require('bcryptjs');

async function main() {
    await app.listen(3000);
    console.log('server started');
    const model = {
        rut : "1-9",
        name : "Administrador",
        lastName : "Zbrands Luuna",
        profile : 1,
        email : "test@gmail.com",
        password : "adm1234"
    };
    let user = await UserModel.findOne({rut : model.rut}).exec();
    let token;
    if(!user){
        user = new UserModel(model);
        await user.save();
    }

    token = await user.generateAuthToken();
    console.log('Admin user created');
    console.log('user:', model.email);
    console.log('password:', model.password);
}

main();