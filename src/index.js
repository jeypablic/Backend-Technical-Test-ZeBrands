const { listen } = require('./app');
const app = require('./app');
const UserModel = require('./models/userModel');

async function main() {
    await app.listen(3000);
    console.log('server iniciado');
    const model = {
        rut : "1-9",
        nombre : "Administrador",
        aPaterno : "Zbrands",
        aMaterno : "luuna",
        perfil : 1,
        email : "test@gmail.com",
        password : "adm1234" 
    };
    let user = await UserModel.findOne({rut : model.rut}).exec();
    let token;
    if(!user){
        user = new UserModel(model);
        await user.save();
        token = await user.generateAuthToken();
    }else{
        user = await UserModel.findOneAndUpdate({rut : model.rut}, model, {
            new: true
        });
        token = await user.generateAuthToken();
    }
    
    console.log('Usuario administrador creado');
    console.log('usr:', model.email);
    console.log('pass:', model.password);

}

main();