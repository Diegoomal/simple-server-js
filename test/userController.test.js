const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('userController', () => {

  it('should create a new user', (done) => {
    chai.request(server)
      .post('/api/user')
      .send({
        username: 'john_doe',
        name: 'John',
        lastname: 'Doe',
        birthdate: '1990-01-01',
        quickdescription: 'Programador entusiasta',
        operationradius: '10 km',
        url_img_background: 'http://example.com/background.jpg',
        url_img_user: 'http://example.com/user.jpg',
        email: 'john@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        if (err) {
          console.error('err:' + JSON.stringify(err));
        } else {
          console.log('res.body: ' + JSON.stringify(res.body));
        }
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        // expect(res.body).to.have.property('message').equal('user 1 created with success.');
        res.body.should.have.property('message');
        done();
      });
  });
  
});