import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';

// En módulos ES no existe __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

// El mismo servidor entrega el frontend, así que el formulario llama a /users sin CORS
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/users', userRoutes);

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
