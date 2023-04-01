import { useState, useEffect } from 'react'

export default function Filters({ filters, setFilters }) {
    return (
        <div className='filtros sombra contenedor'>
            <form >
                <div className='campo'>
                    <label htmlFor="filtro">Filtrar Gastos </label>
                    <select name="filtros" id="" value={filters} onChange={(e) => { setFilters(e.target.value) }}>
                        <option value="todos">Todas las categorias</option>
                        <option value="casa">Casa</option>
                        <option value="comida">Comida</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">salud</option>
                        <option value="entretenimiento">Entretenimiento</option>
                        <option value="gastos">Gastos varios</option>
                    </select>
                </div>
            </form>
        </div>
    )
}
