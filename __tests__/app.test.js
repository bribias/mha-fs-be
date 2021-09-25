import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Hero from '../lib/models/Hero';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates a character via POST', async () => {
    const character = {
      name: 'Katsuki Bakgugo',
      alias: 'Kacchan',
      quirk: 'explosion',
    };
    const res = await request(app).post('/api/v1/heros').send(character);

    expect(res.body).toEqual({ id: '1', ...character });
  });
  it('gets a character by id', async () => {
    const character = await Hero.insert({
      name: 'Katsuki Bakugo',
      alias: 'Kacchan',
      quirk: 'explosion',
    });
    const res = await request(app).get(`/api/v1/heros/${character.id}`);

    expect(res.body).toEqual(character);
  });
  it('gets all character', async () => {
    const character1 = await Hero.insert({
      name: 'Katsuki Bakugo',
      alias: 'Kacchan',
      quirk: 'explosion',
    });
    const character2 = await Hero.insert({
      name: 'Izuku Midoriya',
      alias: 'Deku',
      quirk: 'one for all',
    });
    const res = await request(app).get('/api/v1/heros');

    expect(res.body).toEqual([character1, character2]);
  });

  it('updates a character by id via PUT', async () => {
    const deku = {
      name: 'Izuku Midoriya',
      alias: 'Deku',
      quirk: 'one for all',
    };
    const character = await Hero.insert({
      name: 'Katsuki Bakugo',
      alias: 'Kacchan',
      quirk: 'explosion',
    });
    const res = await request(app)
      .put(`/api/v1/heros/${character.id}`)
      .send(deku);
    expect(res.body).toEqual({ id: '1', ...deku });
  });

  it('deletes a character', async () => {
    const character = await Hero.insert({
      name: 'Katsuki Bakugo',
      alias: 'Kacchan',
      quirk: 'explosion',
    });
    const res = await request(app).delete(`/api/v1/heros/${character.id}`);

    expect(res.body).toEqual({
      message: `${character.name} has been defeated`,
    });
  });
});
