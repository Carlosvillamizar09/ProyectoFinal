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

function renderizarProductos(lista) {
  contenedorProductos.innerHTML = '';
  lista.forEach(producto => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}" />
      <h4>${producto.title}</h4>
      <p>$${producto.price}</p>
      <button onclick="mostrarDescripcion(${producto.id})">Ver Descripción</button>
      <button onclick="elegirCantidad(${producto.id})">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

function mostrarDescripcion(id) {
  const p = productos.find(p => p.id === id);
  modalContent.innerHTML = `
    <h3>${p.title}</h3>
    <img src="${p.image}" alt="" />
    <p>${p.description}</p>
    <button onclick="cerrarModal()">Cerrar</button>
  `;
  modal.style.display = 'flex';
}
function cerrarModal() {
  modal.style.display = 'none';
}

function elegirCantidad(id) {
  productoSeleccionado = productos.find(p => p.id === id);
  cantidadInput.value = 1;
  cantidadModal.style.display = 'flex';
}
confirmarCantidad.onclick = () => {
  const cantidad = parseInt(cantidadInput.value);
  if (cantidad > 0) {
    agregarAlCarrito(productoSeleccionado, cantidad);
    cantidadModal.style.display = 'none';
    alert('¡Producto añadido correctamente al carrito!');
  }
};
cancelarCantidad.onclick = () => {
  cantidadModal.style.display = 'none';
};

function agregarAlCarrito(producto, cantidad) {
  const existente = carrito.find(p => p.id === producto.id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }
  actualizarCarrito();
}
