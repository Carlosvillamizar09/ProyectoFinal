let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productoSeleccionado = null;

const contenedorProductos = document.getElementById('productos');
const carritoBtn = document.getElementById('carrito-btn');
const carritoContenedor = document.getElementById('carrito-container');
const carritoItems = document.getElementById('carrito-items');
const totalSpan = document.getElementById('total');
const contador = document.getElementById('carrito-contador');
const buscarInput = document.getElementById('buscar-input');
const filtroCategoria = document.getElementById('filtro-categoria');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const vaciarBtn = document.getElementById('vaciar-carrito');

const cantidadModal = document.getElementById('cantidad-modal');
const cantidadInput = document.getElementById('cantidad-input');
const confirmarCantidad = document.getElementById('confirmar-cantidad');
const cancelarCantidad = document.getElementById('cancelar-cantidad');
