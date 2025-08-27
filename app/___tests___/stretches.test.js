/* eslint-disable no-undef */
const request = require('supertest');

describe('Stretches routes', () => {
    let app;
    let StretchMock;

    beforeEach(() => {
        jest.resetModules();

        // Mock du modèle Sequelize utilisé par les contrôleurs
        StretchMock = {
            findAll: jest.fn(),
            findByPk: jest.fn(),
        };

  
        jest.doMock('../models', () => ({
            Stretch: StretchMock,
        }));

        // Mock complet des middlewares utilisés par le router
        jest.doMock('../middleware/userMiddleware', () => ({
            decodeToken: (req, _res, next) => next(),
            isUserLogged: (req, _res, next) => next(),
            isAdmin: (req, _res, next) => next(),
        }));

        app = require('../../index');
    });

    test('GET /stretches -> 200 et liste', async () => {
        StretchMock.findAll.mockResolvedValue([
            { id: 1, name: 'Biceps', description: '...' },
            { id: 2, name: 'Quadriceps', description: '...' },
        ]);

        const res = await request(app).get('/stretches');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toEqual(expect.objectContaining({ id: 1, name: expect.any(String) }));
    });

    test('GET /stretches/:id -> 200 et item', async () => {
        StretchMock.findByPk.mockResolvedValue({ id: 7, name: 'Coude', description: '...' });

        const res = await request(app).get('/stretches/7');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({ id: 7, name: 'Coude' }));
    });

    test('GET /stretches/:id -> 404 si absent', async () => {
        StretchMock.findByPk.mockResolvedValue(null);

        const res = await request(app).get('/stretches/999');

        expect([404, 400]).toContain(res.status);
    });
});
