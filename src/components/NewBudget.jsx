import { useState } from "react";
import Mensaje from "./Mensaje";

export default function NewBudget({ budget, setBudget, setIsValidBudget }) {

    const [mensaje, setMensaje] = useState("");

    const handleChange = (value) => {

        if (value === "") setBudget(value);
        else setBudget(Number(value));

        if (Number(value) && Number(value) > 0) setMensaje("");
        else if (value === "") setMensaje("");
        else setMensaje("No es un presupuesto valido");

    }

    const handleBuget = (e) => {
        e.preventDefault();

        if (budget && budget > 0) {
            setIsValidBudget(true);
        }
        else setMensaje("No es un presupuesto valido");

    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={e => handleBuget(e)} className="formulario">
                <div className="campo">
                    <label htmlFor="input-presupuesto">Definir presupuesto</label>
                    <input
                        type="number"
                        name="input-presupuesto"
                        className="nuevo-presupuesto"
                        placeholder="Añade tu presupuesto"
                        value={budget}
                        onChange={e => handleChange(e.target.value)}
                    />
                </div>

                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )
}
