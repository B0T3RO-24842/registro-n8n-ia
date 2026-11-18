import mysql from 'mysql2/promise';

// Los valores por defecto sirven para un XAMPP recién instalado; en otro entorno
// se cambian con variables de entorno (ver .env.example).
export const db = mysql.createPool({
  host:     process.env.DB_HOST     ?? 'localhost',
  port:     Number(process.env.DB_PORT ?? 3306),
  user:     process.env.DB_USER     ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME     ?? 'usuarios_db_test_ia',
  waitForConnections: true,
  connectionLimit: 10,
});
