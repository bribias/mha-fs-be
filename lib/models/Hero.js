import pool from '../utils/pool.js';

export default class Hero {
  id;
  name;
  alias;
  quirk;
  image;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.alias = row.alias;
    this.quirk = row.quirk;
    this.image = row.image;
  }
  static async insert({ name, alias, quirk, image }) {
    const { rows } = await pool.query(
      'INSERT INTO heroes (name, alias, quirk, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, alias, quirk, image]
    );
    return new Hero(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM heroes WHERE id=$1', [
      id,
    ]);
    return new Hero(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM heroes');
    return rows.map((row) => new Hero(row));
  }
  static async updateById(id, { name, alias, quirk }) {
    const existingHero = await Hero.getById(id);
    const newHero = name ?? existingHero.name;
    const newAlias = alias ?? existingHero.alias;
    const newQuirk = quirk ?? existingHero.quirk;
    const newImage = image ?? existingHero.image;

    const { rows } = await pool.query(
      'UPDATE heroes SET name=$1, alias=$2, quirk=$3, image=$4 WHERE id=$5 RETURNING *',
      [newHero, newAlias, newQuirk, newImage, id]
    );
    return new Hero(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM heroes WHERE id=$1 RETURNING *',
      [id]
    );
    return new Hero(rows[0]);
  }
}
