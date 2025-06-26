# Análisis de diseño y experiencia de usuario

## Decisiones de diseño de interfaz

- Se optó por un diseño **inspirado en tiendas reales como Falabella**, con un estilo visual moderno, colorido y animaciones suaves.
- Se diseñó un **logo estilo pop-art** para FakeStore y otro para CyberDays, reforzando la identidad de marca.
- El carrito se mantiene siempre visible en la parte superior, con una opción de "Vaciar carrito" para una mejor gestión de compras.
- La descripción del producto aparece al hacer clic, permitiendo que la interfaz principal sea más limpia y centrada en la imagen y nombre del producto.
- Se usa una **galería superior de CyberDays** con imágenes rotativas y animadas, simulando una campaña de descuentos.

## Estructura de datos

- **Productos**: Se obtienen desde la API de FakeStore. Cada producto tiene: `id`, `title`, `price`, `image`, `description`, `category`.
- **Carrito**: Se representa como un array de objetos:
  ```javascript
  let carrito = [
    {
      id: 1,
      title: "Camisa",
      price: 15,
      quantity: 2,
      image: "url",
    },
    ...
  ];
  ```
  Se almacena en `localStorage` para mantener el estado entre sesiones.

## Justificación de filtros y búsqueda

- El campo de búsqueda permite encontrar productos por nombre.
- El filtro por categorías (camisas, electrónica, etc.) ayuda a los usuarios a navegar rápidamente sin sobrecargar visualmente la interfaz.
- Estas funciones aumentan la **usabilidad**, al permitir una interacción rápida y eficiente.