const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const crypto = require('crypto');
const database = require('../../database/knex');

chai.should();
chai.use(chaiHttp);

describe('Authentication endpoint tests. API/V1/AUTH', () => {
    const user = {
        username: 'test' + crypto.randomBytes(6).toString('hex'),
        password: crypto.randomBytes(6).toString('hex')
    };

    describe('Successfully registers new user /api/v1/auth/register', () => {
        it('Should successfully register the new user and return 201 status', done => {
            chai.request(server)
                .post('/api/v1/auth/register')
                .send({ username: user.username, password: user.password })
                .end((err, response) => {
                    response.should.have.status(201);
                    response.should.be.a('object');
                });
            done();
        });
    });

    describe('Fails to register user because of duplicate /api/v1/auth/register', () => {
        it('Should receive text about existing duplicate and return 400 status', done => {
            chai.request(server)
                .post('/api/v1/auth/register')
                .send({ username: process.env.USERNAME, password: process.env.PASSWORD })
                .end((err, response) => {
                    response.should.have.status(400);
                    response.should.be.a('object');
                });
            done();
        });
    });

    describe('Fails to register new user with missing properties /api/v1/auth/register', () => {
        it('Should receive text about missing values and return 400 status', done => {
            chai.request(server)
                .post('/api/v1/auth/register')
                .send({ password: crypto.randomBytes(6).toString('hex') })
                .end((err, response) => {
                    response.should.have.status(400);
                    response.should.be.a('object');
                });
            done();
        });
    });

    describe('Successfully logs in to the system /api/v1/auth/login', () => {
        it('Passes correct username and password and receives 2 tokens', done => {
            chai.request(server)
                .post('/api/v1/auth/login')
                .send({ username: process.env.USERNAME, password: process.env.PASSWORD })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.have.cookie('access_token');
                    response.should.have.cookie('refresh_token');
                });
            done();
        });
    });

    describe('Log out from the system /api/v1/auth/logout', () => {
        it('Logout from the system, removes access and refresh tokens', done => {
            chai.request(server)
                .post('/api/v1/auth/logout')
                .end((err, response) => {
                    response.should.have.status(200);
                });
            done();
        });
    });

    after(async function () {
        // delete user which was created
        await database('users').where('username', user.username).del();
    });
});
