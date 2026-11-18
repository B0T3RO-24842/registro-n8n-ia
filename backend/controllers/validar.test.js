import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validar } from './validar.js';

test('limpia espacios y pasa el correo a minúsculas', () => {
  assert.deepEqual(validar({ name: '  Ana ', email: ' ANA@Mail.com ' }), { name: 'Ana', email: 'ana@mail.com' });
});

test('rechaza nombre vacío o demasiado largo', () => {
  assert.ok(validar({ name: '  ', email: 'a@b.co' }).error);
  assert.ok(validar({ name: 'x'.repeat(101), email: 'a@b.co' }).error);
});

test('rechaza correos inválidos y cuerpos que no son texto', () => {
  for (const email of ['sin-arroba', 'a@b', 'a b@c.co', '', 42, null]) {
    assert.ok(validar({ name: 'Ana', email }).error, `debería rechazar ${email}`);
  }
  assert.ok(validar(undefined).error);
});
