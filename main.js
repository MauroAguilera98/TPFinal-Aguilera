
class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const arroz = new Producto(1, "Arroz Molto", 3, "img/arroz.png");
const azucar = new Producto(2, "Azucar La muñeca", 2, "img/azucar.png");
const fideos = new Producto(3, "Fideos Marolio", 3, "img/fideos.png");
const mermelada = new Producto(4, "Mermelada Esnaola", 4, "img/mermelada.png");
const queso = new Producto(5, "Queso Cremoso", 7, "img/queso.png");
const sal = new Producto(6, "Sal fina Marolio", 2, "img/sal.png");
const tomate = new Producto(7, "Tomate Hornero", 2, "img/tomate.png");
const yerba = new Producto(8, "Yerba Marolio", 5, "img/yerba.png");
const lays = new Producto(9, "Papas Lays", 3, "img/descarga.png");
const pringles = new Producto(10, "Papas Pringles", 4, "img/pringles.png");
const cif = new Producto(11, "Cif Crema", 3, "img/Cif.png");
const lavandina = new Producto(12, "Lavandina Ayudin", 2, "img/lavandina.png");
const lavandinaGel = new Producto(13, "Lavandina en Gel", 3, "img/LavandinaGel.png");
const aceite = new Producto(14, "Aceite Natura", 4, "img/aceite.png");

//Array con todo nuestro catálogo de productos: 

const productos = [arroz, azucar, fideos, mermelada, queso, sal, tomate, yerba, lays, pringles, cif, lavandina, lavandinaGel, aceite];

//el Array del Carrito. 

let carrito = []; 

/** CARGAR CARRITO DESDE EL LOCALSTORAGE **/
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

//función para mostrar los productos: 

const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class= "card-body">
                        <h5>${producto.nombre}</h5>
                        <p> ${producto.precio} </p>
                        <button class="btn colorBoton" id="boton${producto.id}" > Agregar al Carrito </button>
                    </div>
                </div>
                        `
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            Toastify({
                text: "Se agrego un producto al carrito",
                duration: 3000,
                style: {
                    background: "linear-gradient(to right, #3f5efb, #fc466z)",
                }
            }).showToast();
        })

    })
}

mostrarProductos();

//API Dolar

const dolarHoy = "https://criptoya.com/api/dolar";

const divDolar = document.getElementById("divDolar");

setInterval( () => {
    fetch(dolarHoy)
        .then( response => response.json())
        .then(({blue, ccb, ccl, mep, oficial, solidario}) => {
            divDolar.innerHTML = `
            <h2>Tipos de Dolar: </h2>
            <p>Dolar oficial: ${oficial} </p>
            <p>Dolar Solidario: ${solidario} </p>
            <p>Dolar MEP: ${mep} </p>
            <p>Dolar CCL: ${ccl} </p>
            <p>Dolar CCB: ${ccb} </p>
            <p>Dolar Blue: ${blue} </p>
            `
        })
        .catch(error => console.error(error))
    }, 3000)

//función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    //localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
    mostrarCarrito();
}



//Mostrar el carrito de compras: 

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

//Función para mostrar el carrillo: 

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        console.log (producto.cantidad)
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class= "card-body">
                        <h5>${producto.nombre}</h5>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                        <button class="btn colorBoton" id="sumar${producto.id}">+</button>
                        <button class="btn colorBoton" id="restar${producto.id}">-</button>
                        <button class="btn colorBoton" id="eliminar${producto.id}" > Eliminar Producto </button>
                    </div>
                </div>
                        `
        contenedorCarrito.appendChild(card);
        
//Eliminar productos del carrito: 

const boton = document.getElementById(`eliminar${producto.id}`);
boton.addEventListener("click", () => {
    eliminarDelCarrito(producto.id);
    Toastify({
        text: "Se borro el producto del carrito",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #3f5000, #fc466b)",
        }
    }).showToast();
})
//Función que elimina el producto del carrito: 

    const eliminarDelCarrito = (id) => {
        const producto = carrito.find(producto => producto.id === id);
        const indice = carrito.indexOf(producto);
        carrito.splice(indice, 1);
        calcularTotal();
        mostrarCarrito();
    }
    
    //Sumar cantidad al producto:
    
const botonDos = document.getElementById(`sumar${producto.id}`);
botonDos.addEventListener("click", () => {
    sumarProducto(producto.cantidad);
    Toastify({
        text: "Se agrego un producto al carrito",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #3f5efb, #fc466z)",
        }
    }).showToast();
})
    
    //Funcion que suma cantidad al producto:
    
    function sumarProducto () {
        producto.cantidad++;
        calcularTotal();
        mostrarCarrito();
        console.log(producto.cantidad);
    }

    //Restar cantidad al producto:

const botonTres = document.getElementById(`restar${producto.id}`);
botonTres.addEventListener("click", () => {
    restarProducto(producto.cantidad);
    Toastify({
        text: "Se resto una unidad al producto",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #ff0000, #3f5000)",
        }
    }).showToast();
})

    //Funcion que resta cantidad al producto:

function restarProducto () {
    if (producto.cantidad > 1) {
        producto.cantidad--;
    }else {
        eliminarDelCarrito();
    }
    calcularTotal();
    mostrarCarrito();
}  
})
    //localStorage: 

    localStorage.setItem("carrito", JSON.stringify(carrito));
    }

//Vaciar todo el carrito de compras. 

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
    Toastify({
        text: "Se reinicio el carrito",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #3f5efb, #fc466b)",
        }
    }).showToast();
})

//Función que elimina todo del carrito: 

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage:
    localStorage.clear();
}

//Mostrar mensaje con el total de la compra

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `USD$${totalCompra} `;
}