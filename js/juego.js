// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

/* Estas dos variables son para guardar la posición
de la pieza vacía. Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
// Esta respuesta me ayudo a resolver este paso
// https://stackoverflow.com/questions/19458278/check-if-an-array-is-sorted-return-true-or-false

function chequearSiGano(){
    for(var i = 0; i < grilla.length; i++){      
      for(var j = 0; j < grilla[i].length; j++){
        if(grilla[i][j] > grilla[i][j+1]){
           return false;                   
        }
      }
    }
    return true; 
  }


function mostrarCartelGanador(){  
    swal(
      'Buen trabajo!',
      'Has ganado !',
      'success'
    )    
  }



function intercambiarPosiciones(filaPos1, columnaPos1, filaPos2, columnaPos2){

    var posicion1 = grilla[filaPos1][columnaPos1];
    var posicion2 = grilla[filaPos2][columnaPos2];
    grilla[filaPos1][columnaPos1] = posicion2;
    grilla[filaPos2][columnaPos2] = posicion1;
    
    var elemento1 = document.getElementById(posicion1);
    var elemento2 = document.getElementById(posicion2);

    var padre = elemento1.parentNode;

    var clon1 = elemento1.cloneNode(true);
    var clon2 = elemento2.cloneNode(true);

    padre.replaceChild(clon1, elemento2);
    padre.replaceChild(clon2, elemento1);
    
    
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){ 
  filaVacia = nuevaFila;
  columnaVacia = nuevaColumna;  
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  if((fila > -1 && fila < 3) && (columna > -1 && columna < 3)){
    return true;
  }else{
    return false;
  }
}


function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = filaVacia-1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = filaVacia+1;
    nuevaColumnaPiezaVacia = columnaVacia;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    // Completar
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia-1;

  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    // Completar
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia+1;
  }

  
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(filaVacia, columnaVacia,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}


function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();  
        },500);
      } 
      evento.preventDefault();
    }
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}


iniciar();