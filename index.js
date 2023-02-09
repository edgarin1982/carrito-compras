//variable que mantiene el estado visible del carrito

const CarritoVisible = false;

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
}

//elimino el item del carrito

function eliminarItemCarrito(e){
    const buttonClicked = e.target;
    buttonClicked.parentElement.remove();

    //actualizar el total del carrito una vez que hemos eliminado un  item

    actualizarTotalCarrito();
}

function actualizarTotalCarrito() {
    //seleccionamos el contenedor carrito
    const carritoContenedor = document.getElementsByClassName('carrito')[0];
    const carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    const total = 0;

    //recorremos cada elmento del carrito para actualizar el total
    
    
}
