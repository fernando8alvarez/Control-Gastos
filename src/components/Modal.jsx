import React, { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import { toUpperString } from "../helpers";
import iconoCerrarModal from "../img/cerrar.svg";
import { useSpring, animated } from "@react-spring/web";

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

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      mass: 10,
      tension: 2000,
      friction: 500,
    },
    delay: 800,
  });

  const hideModal = () => {
    setAnimateModal(false);
    setEditSpent({});

    setTimeout(() => {
      setModal(false);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 2000);
      return;
    }
    saveExpend({ nombre, cantidad, categoria, id, fecha });
    setEditSpent({});
    setFilters({ name: "Todas las categorias", value: "todos" });
  };


  return (
    <animated.div style={animation} className={mensaje ? "h-full w-full text-[#F2AB37] flex flex-col justify-center gap-5" : "h-full w-full text-[#F2AB37] flex flex-col justify-center gap-8 "}>
      <div className="flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <img src={iconoCerrarModal} alt="Cerrar modal" className="w-6 sm:w-8 lg:w-10 cursor-pointer" title="Cerrar" onClick={hideModal} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <legend className="text-shadow w-full text-center font-Ubuntu uppercase text-3xl min-[550px]:text-4xl lg:text-5xl text-white z-10 text-shadow">
            {Object.keys(EditSpent).length > 0 ? "Editando gasto" : "Nuevo gasto"}
          </legend>
          <p className={Object.keys(EditSpent).length > 0 ? "w-[280px] min-[550px]:w-[340px] lg:w-[450px] bg-[#F2AB37] h-4 lg:h-6 text-transparent -mt-4" : "w-[240px] min-[550px]:w-[280px] lg:w-[370px] bg-[#F2AB37] h-4 lg:h-6 text-transparent -mt-4"}>.</p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </div>
      <form
        className="w-full flex flex-col gap-20 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full sm:w-[500px] flex flex-col gap-5">
          <div className="flex flex-col font-Inter w-full justify-start gap-1">
            <label htmlFor="nombre" className="text-left text-lg sm:text-xl lg:text-2xl">Nombre del gasto: </label>
            <input
              id="nombre"
              type="text"
              placeholder="Añade el nombre del gasto..."
              value={nombre}
              onChange={(e) => setNombre(toUpperString(e.target.value))}
              maxLength="22"
              className="w-full py-2 rounded-lg pl-4 text-sm sm:text-base lg:text-lg text-[#252322] focus:outline-none focus:text-[#A6A6A6]"
            />
          </div>
          <div className="flex flex-col font-Inter w-full justify-start gap-1">
            <label htmlFor="cantidad" className="text-left text-lg sm:text-xl lg:text-2xl">Precio: </label>
            <input
              id="cantidad"
              type="number"
              placeholder="Añade el precio del gasto..."
              value={cantidad}
              onChange={(e) =>
                setCantidad(
                  e.target.value === "" ? e.target.value : Number(e.target.value)
                )
              }
              className="w-full py-2 rounded-lg pl-4 text-sm sm:text-base lg:text-lg text-[#252322] focus:outline-none focus:text-[#A6A6A6]"
            />
          </div>

          <div className="flex flex-col font-Inter w-full justify-start gap-1">
            <label htmlFor="categoria" className="text-left text-lg sm:text-xl lg:text-2xl">Categoria: </label>
            <div className="w-full bg-white flex justify-center py-2 rounded-lg">
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className=" flex text-center gap-1 items-center justify-center text-sm sm:text-base lg:text-lg text-[#252322] focus:outline-none"
              >
                <option value="">Seleccione una categoria</option>
                <option value="comida">Comida</option>
                <option value="casa">Casa</option>
                <option value="personal">Personal</option>
                <option value="vehículo">Vehículo</option>
                <option value="salud">Salud</option>
                <option value="ropa">Ropa</option>
                <option value="ahorro">Ahorro</option>
                <option value="ocio">Ocio</option>
                <option value="belleza">Belleza</option>
                <option value="otros">Otros</option>
              </select>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value={
            Object.keys(EditSpent).length > 0
              ? "Guardar cambios"
              : "Añadir gasto"
          }
          className="w-full min-[550px]:w-fit bg-[#F2AB37] hover:bg-[#97691f] font-Inter text-lg sm:text-xl lg:text-2xl py-1 px-2 min-[550px]:px-6 sm:px-10 lg:px-16 lg:py-2 text-[#252322] rounded-lg cursor-pointer transition-colors ease-in duration-200"
        />
      </form>
    </animated.div>
  );
}
