import { db } from '../config/db.js';
 
/**
 * Inserta un nuevo usuario en la tabla users.
 * @param {string} name  - Nombre del usuario
 * @param {string} email - Correo electrónico del usuario  (NUEVO)
 * @returns {object} Resultado de la inserción (insertId, affectedRows, etc.)
 */
export const createUser = async (name, email) => {
  // Los ? son placeholders — mysql2 los reemplaza de forma segura
  // Esto previene ataques de SQL Injection
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  const [result] = await db.execute(sql, [name, email]);
  return result;
};
