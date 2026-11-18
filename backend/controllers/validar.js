// Valida el cuerpo de POST /users. Devuelve { name, email } limpios o { error }.
// Los límites coinciden con las columnas de database/schema.sql.
export function validar(body) {
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!name || name.length > 100) return { error: 'El nombre es obligatorio (máximo 100 caracteres).' };
  if (email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'El correo es obligatorio y debe ser válido.' };
  }
  return { name, email };
}
