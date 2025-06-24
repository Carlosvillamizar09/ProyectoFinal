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

function actualizarCarrito() {
  carritoItems.innerHTML = '';
  let total = 0;
  carrito.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `
      ${p.title} x${p.cantidad} - $${p.price * p.cantidad}
      <button onclick="eliminarDelCarrito(${p.id})">🗑️</button>
    `;
    carritoItems.appendChild(div);
    total += p.price * p.cantidad;
  });
  totalSpan.textContent = `$${total.toFixed(2)}`;
  contador.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  actualizarCarrito();
}

vaciarBtn.onclick = () => {
  carrito = [];
  actualizarCarrito();
};

carritoBtn.onclick = () => {
  carritoContenedor.style.display = carritoContenedor.style.display === 'block' ? 'none' : 'block';
};

buscarInput.oninput = aplicarFiltros;
filtroCategoria.onchange = aplicarFiltros;

function aplicarFiltros() {
  const texto = buscarInput.value.toLowerCase();
  const cat = filtroCategoria.value;

  const filtrados = productos.filter(p =>
    (cat === 'todos' || p.category === cat) &&
    (p.title.toLowerCase().includes(texto) || p.description.toLowerCase().includes(texto))
  );
  renderizarProductos(filtrados);
}

function mostrarCyberDays(productos) {
  const gallery = document.getElementById('cyber-gallery');
  const seleccionados = productos.sort(() => 0.5 - Math.random()).slice(0, 3);
  gallery.innerHTML = '';
  seleccionados.forEach(p => {
    const img = document.createElement('img');
    img.src = p.image;
    img.alt = p.title;
    img.title = p.title;
    gallery.appendChild(img);
  });
}
