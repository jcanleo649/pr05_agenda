const formContacto = document.querySelector("#formContacto");
const inpNombre = document.querySelector("#inpNombre");
const inpApellidos = document.querySelector("#inpApellidos");
const inpTelNumero = document.querySelector("#inpTelNumero");
const btnAddTel = document.querySelector("#btnAddTel");
const ulTelefonos = document.querySelector("#ulTelefonos");
const msg = document.querySelector("#msg");
const btnBorrarTodo = document.querySelector("#btnBorrarTodo");
const secContactos = document.querySelector("#secContactos");

// Creamos el array principal
let agenda = [];
// Creo un array temporal
const telefonosNuevos = [];

const CLAVE_LS_AGENDA =  "agenda";

function cargarContactos() {
  const raw = localStorage.getItem("agenda");

  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("JSON inválido:", error);
    return [];
  }
}

function guardarContactos() {
  localStorage.setItem(CLAVE_LS_AGENDA, JSON.stringify(agenda));
}

function crearId() {
  return "c_" + Math.random().toString(16).slice(2, 10);
}

function mostrarMensaje(texto) {
  msg.textContent = texto;
}

function renderTelefonosNuevos() {
  ulTelefonos.innerHTML = "";
  for (const valorStr of telefonosNuevos) {
    const li = document.createElement("li");
    li.textContent = valorStr;
    ulTelefonos.appendChild(li);
  }
}

function renderContactos() {
  secContactos.innerHTML = "";
  if (agenda.length === 0) {
    secContactos.textContent = "No hay contactos.";
    return;
  }

  for (const c of agenda) {
    const card = document.createElement("div");
    card.style.border = "1px solid #ddd";
    card.style.padding = "10px";
    card.style.marginTop = "10px";

    const h3 = document.createElement("h3");
    h3.textContent = `${c.nombre} ${c.apellidos}`;

    const p = document.createElement("p");
    p.textContent = `Teléfonos: ${c.telefonos.join(", ")}`;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Borrar";
    btn.addEventListener("click", () => borrarContacto(c.id));

    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(btn);

    secContactos.appendChild(card);
  }
}
// Pintamos todo
function render() {
  renderTelefonosNuevos();
  renderContactos();
}

function addTel() {
  const valorStr = inpTelNumero.value.trim();

  if (valorStr === "") {
      mostrarMensaje("ERROR: Debes introducir un télefono.");
      return;
  }
  if (!inpTelNumero.checkValidity()) {
    inpTelNumero.reportValidity();
    return;
  }
  if (telefonosNuevos.includes(valorStr)) {
    mostrarMensaje("Ese teléfono ya está añadido.");
    return;
  }
      telefonosNuevos.push(valorStr);

      inpTelNumero.value = "";
      inpTelNumero.focus();

      mostrarMensaje("");
      // Llamamos a render
      render();
}

function guardarContacto(e) {
  e.preventDefault();

  // Validación campo a campo
  if (!inpNombre.checkValidity()) {
    inpNombre.reportValidity();
    return;
  }
  if (!inpApellidos.checkValidity()) {
    inpApellidos.reportValidity();
    return;
  }
  if (telefonosNuevos.length === 0) {
    mostrarMensaje("Añade al menos 1 teléfono.");
    return;
  }
  // Creamos un contacto
  const contacto = {
    id: crearId(),
    nombre: inpNombre.value.trim(),
    apellidos: inpApellidos.value.trim(),
    telefonos: [...telefonosNuevos],
};
  agenda.push(contacto);
  guardarContactos();

  // Reset de formulario
  formContacto.reset();
  telefonosNuevos.length = 0;
  
  // Guardamos el contacto
  mostrarMensaje("Contacto guardado.");
  // Llamamos a render
  render();
}

function borrarContacto(id) {
  // Borramos el contacto
  agenda = agenda.filter(c => c.id !== id);
  guardarContactos();
  // Llamamos a render
  render();
}

function limpiarFormulario() {
  // Limpiamos el formulario
  telefonosNuevos.length = 0;
  mostrarMensaje("");
  // Llamamos a render
  render();
}

function borrarTodo() {
  // Preguntamos si quiere borrar toda la agenda
  if (!confirm("¿Seguro que quieres borrar toda la agenda?")) 
  return;
  // Borramos el array de agenda
  agenda.length = 0;
  guardarContactos();
  // Llamamos a render
  render();
  }

function init() {
  agenda = cargarContactos();
  // Registrar los eventos de los botones
  btnAddTel.addEventListener("click", addTel);
  btnBorrarTodo.addEventListener("click", borrarTodo);
  formContacto.addEventListener("submit", guardarContacto);
  formContacto.addEventListener("reset", limpiarFormulario);
  // Llamamos a render
  render();
}

// Inicializamos
init();