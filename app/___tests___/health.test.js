const request = require('supertest');
const app = require('../../app'); // adapte le chemin

test('health', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
});
