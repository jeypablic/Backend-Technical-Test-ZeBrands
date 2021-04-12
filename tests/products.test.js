const request = require('supertest');
const app = require('../src/app');
const ProductModel = require('../src/models/product');

const userLogin = {
    email : 'test@gmail.com',
    password : 'adm1234'
};

const newProduct = {
    sku : '2',
    name : 'Two',
    brand : 'Brand Two',
    price : 2000
};
const existProduct = {
    sku : '1',
    name : 'One',
    brand : 'Brand One',
    price : 1000
};

let tokenId;

describe('/auth', () =>{
    it("respond with 200 where user login", (done) => {
        request(app)
            .post(`/api/${process.env.VERSION_API}/auth/login`)
            .send(userLogin)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                tokenId = res.body.token;
                done();
            });
    });
});

describe("/products", () => {
    describe("GET /:atr/:value", () => {
        it("respond with code 401 where are not autorized", (done) => {
        request(app)
            .get(`/api/${process.env.VERSION_API}/products/sku/1`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end(err => {
                if(err) return done(err);
                done();
            });
        });

        it("respond with code 200 when product found", (done) => {
            request(app)
                .get(`/api/${process.env.VERSION_API}/products/sku/1`)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + tokenId)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(err => {
                    if(err) return done(err);
                    done();
                });
        });

        it("respond with code 500 when product not found", (done) => {
            request(app)
                .get(`/api/${process.env.VERSION_API}/products/sku/1`)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + tokenId)
                .expect('Content-Type', /json/)
                .expect(500)
                .end(err => {
                    if(err) return done(err);
                    done();
                });
        });
    });

    describe("GET /", () => {
        it("respond with json containing a list of all products", (done) => {
          request(app)
            .get(`/api/${process.env.VERSION_API}/products`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if(err) return done(err);
                done();
            });;
        });
    });

    describe("POST /", () =>{
        it('respond whit 201 product created', (done) => {
            request(app)
                .post(`/api/${process.env.VERSION_API}/products`)
                .send(newProduct)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + tokenId)
                .expect('Content-Type', /json/)
                .expect(201)
                .expect({message : 'Product successfully registered'})
                .end((err) => {
                    if (err) return done(err);
                    ProductModel.deleteOne({sku : newProduct.sku}, function(err, result) {
                        if (err) {
                            console.err(err);
                        } else {
                            done();
                        }
                    });
                });
        });
        it('respond whit 500 when product has exist', (done) => {
            request(app)
                .post(`/api/${process.env.VERSION_API}/products`)
                .send(existProduct)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + tokenId)
                .expect('Content-Type', /json/)
                .expect(500)
                .expect({ message: 'Product is already registered' })
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });   
    });
    describe("PUT /", () =>{
        it('respond whit code 200 when product update', (done) => {
            request(app)
            .put(`/api/${process.env.VERSION_API}/products/${existProduct.sku}`)
            .send({name : 'Test Update'})
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + tokenId)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({message : 'Product updated successfully'})
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
        });

        it('respond whit code 500 when product not exist', (done) => {
            request(app)
            .put(`/api/${process.env.VERSION_API}/products/11111`)
            .send({name : 'Test Update'})
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + tokenId)
            .expect('Content-Type', /json/)
            .expect(500)
            .expect({message : 'Product not found'})
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
        });
    });
});