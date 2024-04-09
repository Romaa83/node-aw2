const materia = "AW2"
const carrera = "ASDS"
function obtenerCarrera(){
    return carrera
}
//como objeto (el import debe llamarse como los export)
export {materia, carrera, obtenerCarrera}
//por defecto y solo puede haber uno (el import se puede llamar de cualquier manera)
export default materia