/* eslint-disable no-undef */
const request = require('supertest');

describe('Auth routes — login', () => {
    let app;
    let UserMock;
    let bcrypt;
    let jwt;

    beforeEach(() => {
        jest.resetModules();

        // Mock du modèle User (Sequelize)
        UserMock = { findOne: jest.fn() };

        // Mock des imports utilisés par les contrôleurs
        jest.doMock('../models', () => ({ User: UserMock }));
        jest.doMock('../middleware/userMiddleware', () => ({
            decodeToken: (_req, _res, next) => next(),
            isUserLogged: (_req, _res, next) => next(),
            isAdmin: (_req, _res, next) => next(),
        }));

        // Mock bcrypt & jsonwebtoken
        jest.doMock('bcrypt', () => ({
            compare: jest.fn(),
            hash: jest.fn(),
        }));
        jest.doMock('jsonwebtoken', () => ({
            sign: jest.fn().mockReturnValue('fake.jwt.token'),
            verify: jest.fn(),
        }));

        // Charger l'app après les mocks
        app = require('../../index');
        bcrypt = require('bcrypt');
        jwt = require('jsonwebtoken');
    });

    test('POST /login -> 200/201 et token si credentials valides', async () => {
    // L’utilisateur existe en base
        UserMock.findOne.mockResolvedValue({
            id: 1,
            email: 'user@mail.com',
            password: 'hashed-password',
            username: 'Naya',
            role_id: 2,
        });
        // Mot de passe OK
        bcrypt.compare.mockResolvedValue(true);

        const res = await request(app)
            .post('/login')             
            .send({ email: 'user@mail.com', password: 'secret' })
            .set('Content-Type', 'application/json');

        // Accepte 200 ou 201 selon implémentation
        expect([200, 201]).toContain(res.status);

        // Un token a été généré
        expect(jwt.sign).toHaveBeenCalled();
        const token = res.body?.token || res.body?.accessToken || res.text;
        expect(typeof token === 'string' && token.length > 0).toBe(true);
    });

    test('POST /login -> 401/400 si mauvais mot de passe', async () => {
        UserMock.findOne.mockResolvedValue({
            id: 1,
            email: 'user@mail.com',
            password: 'hashed-password',
            username: 'Naya',
            role_id: 2,
        });
        // Mot de passe KO
        bcrypt.compare.mockResolvedValue(false);

        const res = await request(app)
            .post('/login')
            .send({ email: 'user@mail.com', password: 'wrong' })
            .set('Content-Type', 'application/json');

        // Attendu: refus d'auth (401) ou 400 selon ton contrôleur
        expect([401, 400]).toContain(res.status);
    });
});
