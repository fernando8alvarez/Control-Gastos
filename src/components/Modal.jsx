import React, { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import { toUpperString } from "../helpers";
import iconoCerrarModal from "../img/cerrar.svg";

export default function Modal({
  setModal,
  animateModal,
  setAnimateModal,
  saveExpend,
  EditSpent,
  setEditSpent,
  setFilters,
}) {
  const [mensaje, setMensaje] = useState("");

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(EditSpent).length > 0) {
      setNombre(toUpperString(EditSpent.nombre));
      setCantidad(EditSpent.cantidad);
      setCategoria(EditSpent.categoria);
      setId(EditSpent.id);
      setFecha(EditSpent.fecha);
    }
  }, []);

  const hideModal = () => {
    setAnimateModal(false);
    setEditSpent({});

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 1000);
      return;
    }
    saveExpend({ nombre, cantidad, categoria, id, fecha });
    setEditSpent({});
    setFilters("todos");
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={iconoCerrarModal} alt="Cerrar modal" onClick={hideModal} />
      </div>
      <form
        className={`formulario ${animateModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>
          {Object.keys(EditSpent).length > 0 ? "Editando Gasto" : "Nuevo Gasto"}
        </legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto: </label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(toUpperString(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad: </label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto: 600, 2000, 50..."
            value={cantidad}
            onChange={(e) =>
              setCantidad(
                e.target.value === "" ? e.target.value : Number(e.target.value)
              )
            }
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria: </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccione una categoria</option>
            <option value="casa">Casa</option>
            <option value="comida">Comida</option>
            <option value="ahorro">Ahorro</option>
            <option value="ocio">Ocio</option>
            <option value="salud">salud</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="gastos">Gastos varios</option>
          </select>
        </div>
        <input
          type="submit"
          value={
            Object.keys(EditSpent).length > 0
              ? "Guardar Cambios"
              : "Añadir Gasto"
          }
        />
      </form>
    </div>
  );
}
