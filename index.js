class Mascotas {
  constructor(nombre, edad,datos,img) {
    this.nombre = nombre,
    this.edad = edad,
    this.datos = datos,
    this.img = img
  }
  // metodos

}

const arrayMascotas = JSON.parse( localStorage.getItem("array")) || [];

window.addEventListener("load", () => {
  if (arrayMascotas.length > 0) {
    generarInterfaz(arrayMascotas)
  }
})
let bandera = false
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault()

  let nodo = e.target.children;

  if(bandera) {
    console.log("actualizando");
    editarCampos()
    bandera = false
  }else{
    const mascota = new Mascotas(nodo[0].value,nodo[1].value,nodo[2].value,nodo[3].value)
    arrayMascotas.push(mascota)
    generarInterfaz(arrayMascotas)
  }
  localStorage.setItem("array", JSON.stringify(arrayMascotas))
  console.log(arrayMascotas);
  form.reset()
})


const generarInterfaz = (arr) => {
  let container_mascotas = document.getElementById("container_mascotas")
container_mascotas.innerHTML = "";
  arr.map( el => container_mascotas.innerHTML += `
                                  <div class="card" id="${el.nombre}" style="width: 18rem;">
                                  <img src="${el.img}" class="card-img-top" alt="...">
                                  <div class="card-body">
                                    <h5 class="card-title">${el.nombre}</h5>
                                    <p class="card-text">${el.edad}</p>
                                    <p class="card-text">${el.datos}</p>
                                    <button type="button" class="btn btn-danger btn_eliminar">Borrar</button>
                                    <button type="button" class="btn btn-primary btn_actualizar">Actualizar</button>
                                    </div>
                                </div>        
    `
  )

  eliminar()
  actualizar()
}

const eliminar = () => {
  let btnEliminar = document.querySelectorAll(".btn_eliminar")
  for (const btn of btnEliminar) {
    btn.addEventListener("click", (event) => {
      let nodo = event.path[2]
      let buscar = arrayMascotas.findIndex( el => el.nombre == nodo.id);
      arrayMascotas.splice(buscar, 1)
      console.log(arrayMascotas);
      nodo.remove()
    })
  }
}

const actualizar = () => {
  let btnActualizar = document.querySelectorAll(".btn_actualizar");
  for (const btn of btnActualizar) {
    btn.addEventListener("click", (e) => {
        bandera = true;
        let nodo = e.path[2];
        let buscar = arrayMascotas.find( el => el.nombre == nodo.id);
        document.getElementById("nombre").value = buscar.nombre;
        document.getElementById("edad").value = buscar.edad;
        document.getElementById("datos").value = buscar.datos;
        document.getElementById("img").value = buscar.img;
    })
  }

}

const editarCampos = () => {
  let id = document.getElementById("nombre").value 
  console.log(id);
  let buscar = arrayMascotas.findIndex(el => el.nombre == id)
  console.log(arrayMascotas);
  console.log(buscar);
  console.log( arrayMascotas[buscar] );
  arrayMascotas[buscar].edad =  document.getElementById("edad").value
  arrayMascotas[buscar].datos =  document.getElementById("datos").value
  arrayMascotas[buscar].img =  document.getElementById("img").value
  generarInterfaz(arrayMascotas)
}

let input_search = document.getElementById("input_search");

input_search.addEventListener("keyup", (e) => {
  e.target.value
  let filtro = arrayMascotas.filter( el => el.nombre.includes(e.target.value))
  generarInterfaz(filtro)
  console.log(filtro);
})
