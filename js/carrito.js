
let carrito = [];

// Cargar carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    // Uso de operador ternario para asignar valor a carrito
    carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
}

// Guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito o incrementar su cantidad si ya está en el carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(({ id }) => id == idProducto);
    const productoEnCarrito = carrito.find(({ id }) => id == idProducto);

    productoEnCarrito 
        ? productoEnCarrito.cantidad += 1 
        : carrito.push({ ...producto, cantidad: 1 });

    guardarCarritoEnLocalStorage();

    Toastify({
        text: `${producto.nombre} ha sido añadido al carrito.`,
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#6c6450",
        },
        onClick: function () { } 
}

// Calcular el total del carrito
function calcularTotalCarrito() {
    // 
    return carrito.reduce((total, { precio, cantidad }) => total + precio * cantidad, 0);
}

// Mostrar productos en el carrito
function mostrarCarrito() {
    const itemsCarrito = document.getElementById('items-carrito');
    itemsCarrito.innerHTML = '';

    carrito.forEach(({ id, imagen, nombre, precio, cantidad }) => {
        const itemCarrito = document.createElement('div');
        itemCarrito.className = 'item-carrito';
        itemCarrito.innerHTML = `
            <img src="${imagen}" alt="${nombre}">
            <h3>${nombre}</h3>
            <p>$${precio} x ${cantidad} = $${precio * cantidad}</p>
            <button onclick="eliminarDelCarrito(${id})">Eliminar</button>
        `;
        itemsCarrito.appendChild(itemCarrito);
    });

    // Calcular y mostrar el total del carrito
    const totalCarrito = calcularTotalCarrito();
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total-carrito';
    totalDiv.innerHTML = `<h3>Total: $${totalCarrito}</h3>`;
    itemsCarrito.appendChild(totalDiv);
}

// Eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(({ id }) => id != idProducto);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
}

// Proceder al pago
function procederAlPago() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No disponible!",
    });
}

// Inicializar funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeLocalStorage();

    // Uso de OR 
    document.getElementById('items-carrito') && mostrarCarrito();
});
