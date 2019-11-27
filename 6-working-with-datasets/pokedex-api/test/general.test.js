'use strict';

const supertest = require('supertest');
const expect = require('chai').expect;
const app = require('../server');

describe('Basic App Tests', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
      .get('/')
      .expect(200);
  });
  it('should GET from /types', () => {
    return supertest(app)
      .get('/types')
      .expect(200);
  });
});
