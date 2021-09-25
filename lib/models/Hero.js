import pool from '../utils/pool';

export default class Hero {
  id;
  name;
  alias;
  quirk;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.alias = row.alias;
    this.quirk = row.quirk;
  }
  static async insert({ name, alias, quirk }) {
    const { rows } = await pool.query(
      'INSERT INTO characters (name, alias, quirk) VALUES ($1, $2, $3) RETURNING *',
      [name, alias, quirk]
    );
    return new Hero(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM characters WHERE id=$1', [
      id,
    ]);
    return new Hero(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM characters');
    return rows.map((row) => new Hero(row));
  }
  static async updateById(id, { name, alias, quirk }) {
    const existingCharacter = await Hero.getById(id);
    const newCharacter = name ?? existingCharacter.name;
    const newAlias = alias ?? existingCharacter.alias;
    const newQuirk = quirk ?? existingCharacter.quirk;

    const { rows } = await pool.query(
      'UPDATE characters SET name=$1, alias=$2, quirk=$3 WHERE id=$4 RETURNING *',
      [newCharacter, newAlias, newQuirk, id]
    );
    return new Hero(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM characters WHERE id=$1 RETURNING *',
      [id]
    );
    return new Hero(rows[0]);
  }
}
