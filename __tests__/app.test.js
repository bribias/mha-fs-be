import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Hero from '../lib/models/Hero';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates a hero via POST', async () => {
    const hero = {
      name: 'Katsuki Bakgugo',
      alias: 'Kacchan',
      quirk: 'explosion',
    };
    const res = await request(app).post('/api/v1/heroes').send(hero);

    expect(res.body).toEqual({ id: '1', ...hero });
  });
  it('gets a hero by id', async () => {
    const hero = await Hero.insert({
      name: 'Katsuki Bakugo',
      alias: 'Kacchan',
      quirk: 'explosion',
    });
    const res = await request(app).get(`/api/v1/heroes/${hero.id}`);

    expect(res.body).toEqual(hero);
  });
  it('gets all hero', async () => {
    const hero1 = await Hero.insert({
      name: 'Katsuki Bakugo',
      alias: 'Kacchan',
      quirk: 'explosion',
    });
    const hero2 = await Hero.insert({
      name: 'Izuku Midoriya',
      alias: 'Deku',
      quirk: 'one for all',
    });
    const res = await request(app).get('/api/v1/heroes');

    expect(res.body).toEqual([hero1, hero2]);
  });

  it('updates a hero by id via PUT', async () => {
    const deku = {
      name: 'Izuku Midoriya',
      alias: 'Deku',
      quirk: 'one for all',
    };
    const hero = await Hero.insert({
      name: 'Katsuki Bakugo',
      alias: 'Kacchan',
      quirk: 'explosion',
    });
    const res = await request(app)
      .put(`/api/v1/heroes/${hero.id}`)
      .send(deku);
    expect(res.body).toEqual({ id: '1', ...deku });
  });

  it('deletes a hero', async () => {
    const hero = await Hero.insert({
      name: 'Katsuki Bakugo',
      alias: 'Kacchan',
      quirk: 'explosion',
    });
    const res = await request(app).delete(`/api/v1/heroes/${hero.id}`);

    expect(res.body).toEqual({
      message: `${hero.name} has been defeated`,
    });
  });
});
