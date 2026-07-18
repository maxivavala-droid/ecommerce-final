console.log("SCRIPT FUNCIONANDO");
const productosContainer = document.getElementById("productosContainer");

const carritoContainer = document.getElementById("carrito");

const totalElemento = document.getElementById("total");

const contadorCarrito = document.getElementById("contadorCarrito");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// =============================
// CARGAR PRODUCTOS API
// =============================

async function obtenerProductos(){

    try{

        const respuesta = await fetch(
            "https://fakestoreapi.com/products"
        );


        const productos = await respuesta.json();


        mostrarProductos(productos);


    }catch(error){

        console.log(error);

        productosContainer.innerHTML = `
        
        <h3>
        No se pudieron cargar los productos
        </h3>
        
        `;

    }

}



// =============================
// MOSTRAR PRODUCTOS
// =============================

function mostrarProductos(productos){


    productosContainer.innerHTML="";


    productos.forEach(producto=>{


        const tarjeta = document.createElement("div");

        tarjeta.classList.add("card");


        tarjeta.innerHTML=`

        <img 
        src="${producto.image}" 
        class="card-img-top"
        alt="${producto.title}"
        >


        <div class="card-body">


        <h5 class="card-title">
        ${producto.title}
        </h5>


        <p class="card-text">
        $${producto.price}
        </p>


        <button class="btn btn-primary">
        Agregar al carrito
        </button>


        </div>

        `;



        tarjeta.querySelector("button")
        .addEventListener("click",()=>{


            agregarCarrito(producto);


        });



        productosContainer.appendChild(tarjeta);



    });


}



// =============================
// CARRITO
// =============================

function agregarCarrito(producto){


    const existe = carrito.find(
        item=>item.id===producto.id
    );


    if(existe){

        existe.cantidad++;

    }else{


        carrito.push({

            id:producto.id,

            titulo:producto.title,

            precio:producto.price,

            cantidad:1

        });


    }


    guardarCarrito();

    renderizarCarrito();


}



// =============================
// GUARDAR
// =============================

function guardarCarrito(){

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

}



// =============================
// MOSTRAR CARRITO
// =============================

function renderizarCarrito(){


if(!carritoContainer) return;


carritoContainer.innerHTML="";


let total=0;

let cantidad=0;



carrito.forEach(producto=>{


total += producto.precio * producto.cantidad;


cantidad += producto.cantidad;



carritoContainer.innerHTML += `


<tr>

<td>
${producto.titulo}
</td>


<td>
$${producto.precio}
</td>


<td>
${producto.cantidad}
</td>


<td>
$${(producto.precio * producto.cantidad).toFixed(2)}
</td>


<td>

<button 
class="btn btn-danger"
onclick="eliminarProducto(${producto.id})">

Eliminar

</button>

</td>


</tr>


`;



});



if(totalElemento){

totalElemento.textContent =
total.toFixed(2);

}



if(contadorCarrito){

contadorCarrito.textContent =
cantidad;

}



}




function eliminarProducto(id){


carrito =
carrito.filter(
producto=>producto.id!==id
);


guardarCarrito();

renderizarCarrito();


}



// =============================
// INICIO
// =============================


obtenerProductos();

renderizarCarrito();