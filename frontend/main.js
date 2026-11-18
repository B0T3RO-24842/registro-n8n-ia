// Obtenemos referencias a los elementos del DOM
const btn        = document.getElementById('btn');
const nameInput  = document.getElementById('name');
const emailInput = document.getElementById('email');  // NUEVO
const msg        = document.getElementById('msg');
 
btn.addEventListener('click', async () => {
 
  // 1. Leemos los valores y eliminamos espacios sobrantes
  const name  = nameInput.value.trim();
  const email = emailInput.value.trim();  // NUEVO
 
  // 2. Validación del lado del cliente — antes de llamar al servidor
  if (!name) {
    showMsg('Por favor ingresa tu nombre.', 'error');
    nameInput.focus();
    return;
  }
  if (!email) {
    showMsg('Por favor ingresa tu correo electrónico.', 'error');
    emailInput.focus();
    return;
  }
 
  // 3. Mostramos estado de carga en el botón
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  msg.textContent = '';
  msg.className = '';
 
  try {
    // 4. Hacemos la petición POST al backend
    //    Enviamos name y email en el cuerpo como JSON
    const res = await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })  // NUEVO: incluye email
    });
 
    // 5. Parseamos la respuesta JSON del backend
    const data = await res.json();
 
    if (res.ok) {
      // 6a. Éxito: mostramos el mensaje y limpiamos el formulario
      showMsg(data.message, '');
      nameInput.value  = '';
      emailInput.value = '';
    } else {
      // 6b. El servidor respondió con error (4xx o 5xx)
      showMsg(data.error || 'Error al guardar el usuario.', 'error');
    }
 
  } catch (err) {
    // 7. Error de red: el backend no está corriendo o no hay conexión
    showMsg('No se pudo conectar con el servidor. ¿Está corriendo el backend?', 'error');
    console.error('Error de red:', err);
 
  } finally {
    // 8. Siempre restauramos el botón, haya éxito o error
    btn.disabled = false;
    btn.textContent = 'Enviar';
  }
});
 
// Función auxiliar para mostrar mensajes de respuesta
function showMsg(text, className) {
  msg.textContent = text;
  msg.className = className;
}
