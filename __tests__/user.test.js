const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
require('../data/data_helper');

describe('User routes', () => {
  // beforeEach(async done => {
  //   agent
  //     .post('/api/v1/signup')
  //     .send({
  //       email: 'test@test.com',
  //       password: '1234'
  //     })
  //     .end((err, response) => {
  //       token = response.body.token;
  //       done();
  //     });

  //Sign Up
  it('creates a new User signup via POST', async () => {
    return request(app)
      .post('/api/v1/signup')
      .send({
        email: 'test@test.com',
        password: '1234'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          email: 'test@test.com',
        });
      });
  });

  //Login

});
// });
