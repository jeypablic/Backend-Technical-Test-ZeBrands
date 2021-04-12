const request = require('supertest');
const app = require('../src/app');
const UserModel = require('../src/models/user');

const userLogin = {
    email : 'test@gmail.com',
    password : 'adm1234'
};

const newUser = {
    rut : '19-0',
    name : 'Administrador',
    lastName : 'Luuna',
    profile : 2,
    email : 'juanpablo.rodriguezyanez@gmail.com',
    password : 'adm1234'
};
const existUser = {
    rut : "1-9",
    name : "Administrador",
    lastName : "Zbrands Luuna",
    profile : 1,
    email : "test@gmail.com",
    password : "adm1234" 
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

describe("/users", () => {
    describe("GET /:atr/:value", () => {
        it("respond with code 401 where are not autorized", (done) => {
        request(app)
            .get(`/api/${process.env.VERSION_API}/users/rut/1-9`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end(err => {
                if(err) return done(err);
                done();
            });
        });

        it("respond with code 200 when user found", (done) => {
            request(app)
                .get(`/api/${process.env.VERSION_API}/users/rut/1-9`)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + tokenId)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(err => {
                    if(err) return done(err);
                    done();
                });
        });

        it("respond with code 500 when user not found", (done) => {
            request(app)
                .get(`/api/${process.env.VERSION_API}/users/rut/11-9`)
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
        it("respond with json containing a list of all users", (done) => {
          request(app)
            .get(`/api/${process.env.VERSION_API}/users`)
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
        it('respond whit 201 created', (done) => {
            request(app)
                .post(`/api/${process.env.VERSION_API}/users`)
                .send(newUser)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + tokenId)
                .expect('Content-Type', /json/)
                .expect(201)
                .expect({message : 'User successfully registered'})
                .end((err) => {
                    if (err) return done(err);
                    UserModel.deleteOne({rut : newUser.rut}, function(err, result) {
                        if (err) {
                            console.err(err);
                        } else {
                            done();
                        }
                    });
                });
        });
        it('respond whit 500 when user has exist', (done) => {
            request(app)
                .post(`/api/${process.env.VERSION_API}/users`)
                .send(existUser)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + tokenId)
                .expect('Content-Type', /json/)
                .expect(500)
                .expect({ message: 'User is already registered' })
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });   
    });
    describe("PUT /", () =>{
        it('respond whit code 200 when user update', (done) => {
            request(app)
            .put(`/api/${process.env.VERSION_API}/users/${existUser.rut}`)
            .send({name : 'Test Update'})
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + tokenId)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({message : 'User updated successfully'})
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
        });

        it('respond whit code 500 when user not exist', (done) => {
            request(app)
            .put(`/api/${process.env.VERSION_API}/users/11111`)
            .send({name : 'Test Update'})
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + tokenId)
            .expect('Content-Type', /json/)
            .expect(500)
            .expect({message : 'User not found'})
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
        });
    });
});