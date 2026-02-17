const formContacto = document.querySelector("#formContacto");
const inpNombre = document.querySelector("#inpNombre");
const inpApellidos = document.querySelector("#inpApellidos");
const inpTelNumero = document.querySelector("#inpTelNumero");
const btnAddTel = document.querySelector("#btnAddTel");
const ulTelefonos = document.querySelector("#ulTelefonos");
const msg = document.querySelector("#msg");
const btnBorrarTodo = document.querySelector("#btnBorrarTodo");
const secContactos = document.querySelector("#secContactos");

/* Creamos el array */
let agenda = [
    {
    id: "c_xxxxx",
    nombre: "Ana",
    apellidos: "Pérez",
    telefonos: []
    }
];
const CLAVE_LS_AGENDA =  "agenda";

/* Inicializamos */
function init() {

    /* Registrar los eventos de los botones */
    btnAddTel.addEventListener("click", addTel);
    btnBorrarTodo.addEventListener("click", borrarTodo);
    
    render();
} 
init();
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
/* Creo un array temporal */
const telefonosNuevos = [];

function addTel() {
    const valorStr = inpTelNumero.value;

    if (valorStr === "") {
        mostrarMensaje("ERROR: Debes introducir un télefono.");
        return;
    } else {
        agenda.push(telefonosNuevos);

        inpTelNumero.value = "";
        inpTelNumero.focus();

        render();
    }
    localStorage.setItem(CLAVE_LS_AGENDA, JSON.stringify(agenda));
}

function borrarTodo() {
  // TODO: Borrar el array de agenda
  agenda.length = 0;
  localStorage.setItem(CLAVE_LS_AGENDA, JSON.stringify(agenda));
  // TODO: llamar a render()
  render();
}

function listaTelefonos() {

}
