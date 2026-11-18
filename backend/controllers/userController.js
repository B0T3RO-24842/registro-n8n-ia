import { createUser } from '../models/userModel.js';
import { validar } from './validar.js';

// Webhook del flujo de n8n. Con el flujo publicado la ruta es /webhook/...;
// en modo prueba de n8n es /webhook-test/...
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL ?? 'http://localhost:5678/webhook/nuevo-usuario';

export const saveUser = async (req, res) => {
  // El frontend también valida, pero la API puede llamarse sin pasar por el formulario
  const datos = validar(req.body);
  if (datos.error) return res.status(400).json({ error: datos.error });

  try {
    await createUser(datos.name, datos.email);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Ese correo ya está registrado.' });
    }
    console.error('Error al guardar usuario en DB:', error.message);
    return res.status(500).json({ error: 'Error interno al guardar el usuario.' });
  }

  // Fire-and-forget: el usuario no espera a la IA. Si n8n falla solo se registra en consola.
  fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
    signal: AbortSignal.timeout(5000),
  })
    .then((r) => console.log(r.ok ? `n8n notificado para ${datos.email}` : `n8n respondió ${r.status}`))
    .catch((err) => console.error('No se pudo notificar a n8n:', err.message));

  return res.status(201).json({ message: '¡Usuario registrado! Pronto recibirás un correo especial 🎉' });
};
