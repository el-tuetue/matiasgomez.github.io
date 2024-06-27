const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'costo') {
            if (input.value < 0) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">el valor debe ser 25 o mayor</span>'
            }
        }
        }
        if (id == 'fecha') {
            if (validarFecha(input.value) < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No se puede pronosticar plantas para un futuro</span>'
            }
        }
    }



const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    //al limpiar volvemos el run y btn a la normalidad
    document.getElementById('nombre').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'

}

const soloNumero = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}


const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    //(1000*60*60*24) permite pasarlo a días
    const dia = (resta / (1000 * 60 * 60 * 24))
    //toFixed permite añadir cantidad de decimales 
    return dia.toFixed(0)
}
