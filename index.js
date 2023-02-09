//variable que mantiene el estado visible del carrito

const carritoVisible = false;

//esperamos que todos los elementos de la pagina se caguen para continuar con el script

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready() {
    //agrega,ps funcionalidad a los botones eliminar carrito
    const botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        const button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);    
    }

    //agrego funcionalidad al boton sumar cantidad
    const botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        const button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }
    const botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        const button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }
    //agrego funcionalidad a los botones  agregar al carrito
    const botonesAgregarCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarCarrito.length; i++) {
        const button = botonesAgregarCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

}

//elimino el item del carrito

function eliminarItemCarrito(e){
    const buttonClicked = e.target;
    buttonClicked.parentElement.remove();

    //actualizar el total del carrito una vez que hemos eliminado un  item
    actualizarTotalCarrito();
    //la siguente funcion controla si hay elementos en el carrito una vez que se elimino
    //si no hay debo ocultar el carrito
    ocultarCarrito();

}

function actualizarTotalCarrito() {
    //seleccionamos el contenedor carrito
    const carritoContenedor = document.getElementsByClassName('carrito')[0];
    const carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    //recorremos cada elmento del carrito para actualizar el total
    for (let i = 0; i < carritoItems.length; i++) {
        const item = carritoItems[i];
        const precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        
        //quitamos el simbolo peso y el punto de milesimo

        const precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        const cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        const cantidad = cantidadItem.value;
        total = total + (precio * cantidad);

        
    }
    total = Math.round(total * 100 ) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString('es') + ",00";
    
}

function ocultarCarrito() {
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        const carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        //ahora maximozo el contenedor de los elementos
        const item = document.getElementsByClassName('contenedor-items')[0];
        carritoItems.style.width = '100%'
    }
    
}

function sumarCantidad(e) {
    const buttonClicked = e.target;
    const selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;  
    //actualizamos el total
    actualizarTotalCarrito();
}
function restarCantidad(e) {
    const buttonClicked = e.target;
    const selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;

    //verificar que no sea menor a 1
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;  
        actualizarTotalCarrito(); 
    }   
}

function agregarAlCarritoClicked(e) {
    const button = e.target;
    const item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    const precio = item.getElementsByClassName('precio-item')[0].innerText;
    const imagenSrc = item.getElementsByClassName('img-item')[0].src;
    

    //la siguiente funcion agrega el elemento
    agregarItemAlCarrito(titulo, precio, imagenSrc)
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const item = document.getElementsByClassName('div');
    item.classList.add = 'item';
    const itemsCarrito = document.getElementsByClassName('carrito-items')[0];
            
}
