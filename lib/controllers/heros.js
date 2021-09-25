import { Router } from 'express';
import Hero from '../models/Hero';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const character = await Hero.insert(req.body);
      res.send(character);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await Hero.getById(id);
      res.send(character);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const character = await Hero.getAll();
      res.send(character);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const newInfo = req.body;
      const updatedCharacter = await Hero.updateById(id, newInfo);

      res.send(updatedCharacter);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await Hero.deleteById(id);
      res.send({ message: `${character.name} has been defeated` });
    } catch (err) {
      next(err);
    }
  });
