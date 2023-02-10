//variable que mantiene el estado visible del carrito

var carritoVisible = false;

//esperamos que todos los elementos de la pagina se caguen para continuar con el script

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //agrega,ps funcionalidad a los botones eliminar carrito
  const botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
  for (let i = 0; i < botonesEliminarItem.length; i++) {
    const button = botonesEliminarItem[i];
    button.addEventListener("click", eliminarItemCarrito);
  }

  //agrego funcionalidad al boton sumar cantidad
  const botonesSumarCantidad =
    document.getElementsByClassName("sumar-cantidad");
  for (let i = 0; i < botonesSumarCantidad.length; i++) {
    const button = botonesSumarCantidad[i];
    button.addEventListener("click", sumarCantidad);
  }
  const botonesRestarCantidad =
    document.getElementsByClassName("restar-cantidad");
  for (let i = 0; i < botonesRestarCantidad.length; i++) {
    const button = botonesRestarCantidad[i];
    button.addEventListener("click", restarCantidad);
  }
  //agrego funcionalidad a los botones  agregar al carrito
  const botonesAgregarCarrito = document.getElementsByClassName("boton-item");
  for (let i = 0; i < botonesAgregarCarrito.length; i++) {
    const button = botonesAgregarCarrito[i];
    button.addEventListener("click", agregarAlCarritoClicked);
  }

  //agregar funcionalidad al boton pagar
  document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}

//elimino el item del carrito

function eliminarItemCarrito(e) {
  const buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();

  //actualizar el total del carrito una vez que hemos eliminado un  item
  actualizarTotalCarrito();
  //la siguente funcion controla si hay elementos en el carrito una vez que se elimino
  //si no hay debo ocultar el carrito
  ocultarCarrito();
}

function actualizarTotalCarrito() {
  //seleccionamos el contenedor carrito
  const carritoContenedor = document.getElementsByClassName("carrito")[0];
  const carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
  var total = 0;

  //recorremos cada elmento del carrito para actualizar el total
  for (let i = 0; i < carritoItems.length; i++) {
    const item = carritoItems[i];
    const precioElemento = item.getElementsByClassName(
      "carrito-item-precio"
    )[0];

    //quitamos el simbolo peso y el punto de milesimo

    const precio = parseFloat(
      precioElemento.innerText.replace("$", "").replace(".", "")
    );
    const cantidadItem = item.getElementsByClassName(
      "carrito-item-cantidad"
    )[0];
    const cantidad = cantidadItem.value;
    total = total + precio * cantidad;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("carrito-precio-total")[0].innerText =
    "$" + total.toLocaleString("es") + ",00";
}

function ocultarCarrito() {
  const carritoItems = document.getElementsByClassName("carrito-items")[0];
  if (carritoItems.childElementCount == 0) {
    const carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "-100%";
    carrito.style.opacity = "0";
    carritoVisible = false;

    //ahora maximozo el contenedor de los elementos
    const item = document.getElementsByClassName("contenedor-items")[0];
    carritoItems.style.width = "100%";
  }
}

function sumarCantidad(e) {
  const buttonClicked = e.target;
  const selector = buttonClicked.parentElement;
  var cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual++;
  selector.getElementsByClassName("carrito-item-cantidad")[0].value =
    cantidadActual;
  //actualizamos el total
  actualizarTotalCarrito();
}
function restarCantidad(e) {
  const buttonClicked = e.target;
  const selector = buttonClicked.parentElement;
  var cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual--;

  //verificar que no sea menor a 1
  if (cantidadActual >= 1) {
    selector.getElementsByClassName("carrito-item-cantidad")[0].value =
      cantidadActual;
    actualizarTotalCarrito();
  }
}

function agregarAlCarritoClicked(e) {
  const button = e.target;
  const item = button.parentElement;
  var titulo = item.getElementsByClassName("titulo-item")[0].innerText;
  const precio = item.getElementsByClassName("precio-item")[0].innerText;
  const imagenSrc = item.getElementsByClassName("img-item")[0].src;

  //la siguiente funcion agrega el elemento
  agregarItemAlCarrito(titulo, precio, imagenSrc);

  //hacemos visible el carrito cuando agrega por primera vez
  hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  const item = document.createElement("div");
  item.classList.add = "item";
  var itemsCarrito = document.getElementsByClassName("carrito-items")[0];

  const nombresItemsCarrito = itemsCarrito.getElementsByClassName(
    "carrito-item-titulo"
  );
  for (let i = 0; i < nombresItemsCarrito.length; i++) {
    if (nombresItemsCarrito[i].innerText == titulo) {
      alert("El articulo ya se encuantra en el carrito");
      return;
    }
  }
  const itemCarritoContenido = `
    <div class="carrito-item">
      <img src="${imagenSrc}" alt="reloj de lujo" width="80px">
      <div class="carrito-item-detalles">
         <span class="carrito-item-titulo">${titulo}</span>
         <div class="selector-cantidad">
            <i class='bx bx-minus restar-cantidad'></i>
            <input type="text" value="1" class="carrito-item-cantidad" disabled>
            <i class='bx bx-plus sumar-cantidad'></i>
         </div>
          <span class="carrito-item-precio">${precio}</span>
      </div>
         <span class="btn-eliminar">
            <i class='bx bxs-trash-alt'></i>
         </span>
    </div>
    `;
  item.innerHTML = itemCarritoContenido;
  itemsCarrito.append(item);

  //agregamos la funcionalidad eliminar del carrito

  item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
  
  
  //agregamos la funcionalidad de sumar del nuevo item
  
  const botonesSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
  botonesSumarCantidad.addEventListener('click',sumarCantidad);
  
  //agregamos la funcionalidad de sumar del nuevo item
  
  const botonesRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
  botonesRestarCantidad.addEventListener('click', restarCantidad);
}


function  pagarClicked(e) {
    alert ("Gracias por su compra")
       //eliminamos los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
        
    }
    actualizarTotalCarrito();

    //funcion que oculto el carrito
    ocultarCarrito();
}
function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    const items = document.getElementsByClassName(' contenedor-items')[0];
    items.style.width = '60%';
    
}