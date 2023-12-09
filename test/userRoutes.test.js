const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Certifique-se de que o seu aplicativo está exportado corretamente
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Routes', () => {

  it('should create a new user', (done) => {
    chai.request(app)
      .post('/user')
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
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').equal('User created successfully.');
        done();
      });
  });

  it('should get user by ID', (done) => {
    chai.request(app)
      .get('/users/1') // Use o ID válido do usuário
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('name');
        // Adicione outras verificações conforme necessário
        done();
      });
  });

  // Adicione mais testes para outras rotas e casos de uso
});