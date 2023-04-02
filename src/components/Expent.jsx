import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatDateHour } from "../helpers";
import iconAhorro from "../img/icono_ahorro.svg";
import iconCasa from "../img/icono_casa.svg";
import iconComida from "../img/icono_comida.svg";
import iconGastos from "../img/icono_gastos.svg";
import iconOcio from "../img/icono_ocio.svg";
import iconSalud from "../img/icono_salud.svg";
import iconEntretenimiento from "../img/icono_suscripciones.svg";

const icons = {
  casa: iconCasa,
  comida: iconComida,
  ahorro: iconAhorro,
  ocio: iconOcio,
  salud: iconSalud,
  entretenimiento: iconEntretenimiento,
  gastos: iconGastos,
};

export default function Expent({ gasto, setEditSpent, deleteSpent }) {
  const { categoria, cantidad, id, nombre, fecha } = gasto;
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditSpent(gasto)}>Editar...</SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteSpent(id)} destructive={true}>
        Borrar...
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={icons[categoria]} alt="Categoria" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formatDateHour(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{cantidad} $</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
