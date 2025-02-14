const CarritoCompra = require("../index");

describe("CarritoCompra", () => {
    it("Deberia crear un carrito compra", () => {
        const carrito = new CarritoCompra();
        expect(carrito).toBeDefined(); 
    });

    it("Debería agregar un producto al carrito", () => {
        const carrito = new CarritoCompra();
        const producto = { nombre: "ipod", precio: 100 };
        carrito.agregarProducto(producto);
        expect(carrito.obtenerProductos()).toEqual([producto]);
    });

    it("Debería eliminar un producto del carrito", () => {
        const carrito = new CarritoCompra();
        const producto = { nombre: "ipod", precio: 100 };
        carrito.agregarProducto(producto);
        carrito.eliminarProducto(producto);
        expect(carrito.obtenerProductos()).toEqual([]);
    });

    it("Deberia ingresar mas de un producto al carrito", () => {
        const carrito = new CarritoCompra();
        const producto1 = { nombre: "ipod", precio: 100 };
        const producto2 = { nombre: "iphone", precio: 200 };
        const producto3 = { nombre: "macpro", precio: 300 };
        carrito.agregarProducto(producto1);
        carrito.agregarProducto(producto2);
        carrito.agregarProducto(producto3);
        expect(carrito.obtenerProductos()).toEqual([producto1, producto2, producto3]); 
    });

    it("Debería calcular el total del carrito", () => {
        const carrito = new CarritoCompra();
        const producto1 = { nombre: "ipod", precio: 100 };
        const producto2 = { nombre: "iphone", precio: 200 };
        const producto3 = { nombre: "macpro", precio: 300 };
        carrito.agregarProducto(producto1);
        carrito.agregarProducto(producto2);
        carrito.agregarProducto(producto3);
        expect(carrito.calcularTotal()).toEqual(600);
    });

    it("Debería aplicar un descuento al carrito", () => {
        const carrito = new CarritoCompra();
        const producto1 = { nombre: "ipod", precio: 100 };
        const producto2 = { nombre: "iphone", precio: 200 };
        const producto3 = { nombre: "macpro", precio: 300 };
        carrito.agregarProducto(producto1);
        carrito.agregarProducto(producto2);
        carrito.agregarProducto(producto3);
        expect(carrito.aplicarDescuento(10)).toEqual(540); 
        expect(carrito.aplicarDescuento(20)).toEqual(480); 
    });
});
