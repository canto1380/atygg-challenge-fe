const email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
const nombreApellido = /^[a-zA-ZÀ-ÿ\s]{4,60}$/;
const edad = /^[0-9]{1,3}$/;
const clave = /^[a-z0-9_-]{8,15}$/;

export { email, nombreApellido, edad, clave };
