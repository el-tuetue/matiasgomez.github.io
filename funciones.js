//import permite importar funciones especificas para utilización
import { edit, getAll, remove, save, selectOne } from "./firebase.js"
let id = 0
//llamamos al evento click al presionar el botón
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        
        const tipo = document.querySelector('input[name="tipo"]:checked');
        const tipoValue = tipo? tipo.value:'';
        const plantas = {
            nom: document.getElementById('nombre').value,
            func : tipoValue,
            desc: document.getElementById('descripcion').value.trim(),
            fecha: document.getElementById('fecha').value,
            nota: document.getElementById('Unota').value,   
            alcance: document.getElementById('alcance').value,
            costo: document.getElementById('costo').value,
        }
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            save(plantas)
        } else {
            edit(id, plantas)
            id = 0
        }
        limpiar()
    }
})
//DOMContentLoaded evento que se activa cuando se recarga la web
window.addEventListener('DOMContentLoaded', () => {
    //función que permite traer la colección de planta
    getAll(planta => {
        let tabla = ''
        //recorremos cada documento de la colección 
        planta.forEach(doc => {
            //doc.data permite acceder a los valores del documento
            const item = doc.data()

            tabla += `<tr>
                <td>${item.nom}</td>
                <td>${item.func}</td>
                <td>${item.desc}</td>
                <td>${item.fecha}</td>
                <td>${item.nota}</td>
                <td>${item.alcance}</td>
                <td>${item.costo}</td>
                <td nowrap>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //llamar a todos los botones eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //saber que botón se presiono
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No prodrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    //verifica si se presionó eliminar
                    if (result.isConfirmed) {
                        //eliminar
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado.",
                            icon: "success"
                        });
                    }
                });
            })
        })
        //recorrer todos los botones con la clase warning, para seleccionar un registro
        document.querySelectorAll('.btn-warning').forEach(btn => {
            //verificamos el botón al cual se le hizo click
            //async y await permiten que espere el preceso para seguir ejecutando
            btn.addEventListener('click', async () => {
                //invocamos la función para traer el documento seleccionado 
                const emp = await selectOne(btn.id)
                //asignamos los valores del documento a una variable para su utilización
                const item = emp.data()
                //asignar los valores a los inputs
                document.getElementById('nombre').value = item.nom
                document.querySelector(`input[name="tipo"][value="${item.func}"]`).checked = true
                document.getElementById('descripcion').value = item.desc
                document.getElementById('fecha').value = item.fecha
                document.getElementById('Unota').value = item.nota
                document.getElementById('alcance').value = item.alcance
                document.getElementById('costo').value = item.costo   
                //cambiar el valor del botón 
                document.getElementById('btnGuardar').value = 'Editar'  
                //dejar readonly nombre
                document.getElementById('nombre').readOnly = true
                //añadimos el id del documento 
                id = btn.id
                
            })
        })
       
    })
})