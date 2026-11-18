CREATE DATABASE IF NOT EXISTS usuarios_db_test_ia CHARACTER SET utf8mb4;
USE usuarios_db_test_ia;

CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE, -- evita correos repetidos (y que n8n mande el mismo mensaje dos veces)
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);
