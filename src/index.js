const { listen } = require('./app');
const app = require('./app');
const UserModel = require('./models/user');
const ProductModel = require('./models/product');

async function main() {
    await app.listen(app.get('port'));
    console.log('server started');
    const model = {
        rut : "1-9",
        name : "Administrador",
        lastName : "Zbrands Luuna",
        profile : 1,
        email : "test@gmail.com",
        password : "adm1234"
    };
    const newProduct = {
        sku : '1',
        name : 'One',
        brand : 'Brand One',
        price : 1000
    };
    let user = await UserModel.findOne({rut : model.rut}).exec();
    
    let token;
    if(!user){
        user = new UserModel(model);
        await user.save();
        token = await user.generateAuthToken();
    }else{
        delete model.password;
        user = await UserModel.findOneAndUpdate({rut : model.rut}, model, {
            new: true
        });
        token = await user.generateAuthToken();
    }

    let product = await ProductModel.findOne({sku : newProduct.sku}).exec();
    if(!product) {
        product = new ProductModel(newProduct);
        await product.save();
    }
    
    console.log('Admin user created');
    console.log('user:', model.email);
    console.log('password:', "adm1234");

}

main();