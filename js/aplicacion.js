// Mostrar productos en la página principal
function mostrarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>€${producto.precio}</p>
            <a href="producto.html?id=${producto.id}">Ver más</a>
        `;
        listaProductos.appendChild(productoDiv);
    });
}

// Mostrar detalles del producto
function mostrarDetalleProducto() {
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get('id');
    const producto = productos.find(p => p.id == idProducto);
    if (producto) {
        const detalleProducto = document.getElementById('detalle-producto');
        detalleProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <p>€${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
    }
}

// Inicializar funciones
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lista-productos')) {
        mostrarProductos();
    }
    if (document.getElementById('detalle-producto')) {
        mostrarDetalleProducto();
    }
});
