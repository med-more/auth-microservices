const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth routes', () => {
  const user = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    role: 'APPRENANT'
  };

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login the user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
