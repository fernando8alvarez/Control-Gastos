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
import iconComida from "../img/icon-comida.png";
import iconCasa from "../img/icon-casa.png";
import iconPersonal from "../img/icon-personal.png";

import iconVehiculo from "../img/icon-vehiculo.png";
import iconSalud from "../img/icon-salud.png";
import iconRopa from "../img/icon-ropa.png";
import iconAhorro from "../img/icon-ahorro.png";
import iconOcio from "../img/icon-ocio.png";
import iconBelleza from "../img/icon-belleza.png";
import iconOtros from "../img/icon-otros.png";
import { toUpperString } from "../helpers";

const icons = {
  comida: iconComida,
  casa: iconCasa,
  personal: iconPersonal,
  vehículo: iconVehiculo,
  salud: iconSalud,
  ropa: iconRopa,
  ahorro: iconAhorro,
  ocio: iconOcio,
  belleza: iconBelleza,
  otros: iconOtros,
};

export default function Expent({ gasto, setEditSpent, deleteSpent, selectedCurrency }) {
  const { categoria, cantidad, id, nombre, fecha } = gasto;
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditSpent(gasto)}>Editar...</SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions >
      <SwipeAction onClick={() => deleteSpent(id)} destructive={true} >
        Borrar...
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList className="w-full h-auto flex flex-col pb-2 pr-2">
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        className="rounded-lg"
      >
        <div className="flex w-full h-full gap-2 bg-[#FFFCF5] px-2 sm:px-3 py-2 ">

          <div className="flex flex-col w-[16%] h-full items-center justify-center">
            <img src={icons[categoria]} alt="Categoria" className="w-7 sm:w-12 lg:w-9 xl:w-12" />
            <p className="font-Inter text-[10px] sm:text-sm text-[#252322]">{toUpperString(categoria)}</p>
          </div>

          <div className="flex flex-col w-full h-full gap-2 sm:gap-5 lg:gap-3 xl:gap-5 sm:justify-between items-start">
            <div className="flex w-full justify-between gap-1">
              <p className="font-Inter text-sm sm:text-lg lg:text-sm xl:text-lg text-[#252322]">{nombre}</p>
              <p className="font-Inter text-sm sm:text-lg md:text-xl lg:text-sm xl:text-lg text-[#252322]">{`${cantidad} ${selectedCurrency.symbol}`}</p>
            </div>
            <p className="flex h-auto font-Inter text-[8px] sm:text-sm lg:text-[10px] xl:text-xs text-start text-[#252322]">
              Agregado el: {formatDateHour(fecha)}
            </p>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
