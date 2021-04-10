const request = require('supertest');
const app = require('../src/app');

describe('POST /login', () => {
    it('algo', (done) => {
        const user = {
            email : 'user@gmail.com',
            password : 'adm1234'
        };
        request(app)
            .post('/api/v1/auth/login')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) =>{
                if(err) return done(err);
                done();
            });
    });
});