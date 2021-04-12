const request = require('supertest');
const app = require('../src/app');

const userLogin = {
    email : 'test@gmail.com',
    password : 'adm1234'
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