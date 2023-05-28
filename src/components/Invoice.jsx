import React, { useState, useEffect } from "react";
import iconoCerrarModal from '../img/cerrar.svg';
import html2canvas from "html2canvas";
import { getCurrentDate, idGenerate } from '../helpers';
import { useSpring, animated } from "@react-spring/web";

export default function Invoice({
    gastos,
    setPreviewInvoice,
    selectedCurrency,
    balance
}) {

    const [idInvoice, setIdInvoice] = useState("")

    //ANIMACION
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

    useEffect(() => {
        !idInvoice && setIdInvoice(idGenerate());
    }, [])

    const handleDownloadInvoice = () => {
        const invoiceElement = document.getElementById('invoice');

        html2canvas(invoiceElement, { scale: 1 })
            .then(canvas => {
                const link = document.createElement('a');

                link.href = canvas.toDataURL('image/png');
                link.download = `factura-${idInvoice}.png`;
                link.click();
            })

    }

    const hideInvoice = () => {
        setIdInvoice("");
        setPreviewInvoice(false)
    };

    return (
        <animated.div className='w-full flex flex-col gap-20' style={animation}>
            <div className="w-full flex justify-end ">
                <img src={iconoCerrarModal} alt="Cerrar modal" className="w-6 sm:w-8 lg:w-10 cursor-pointer" title="Cerrar" onClick={() => hideInvoice() } />
            </div>

            <div className='flex flex-col w-full justify-center items-center gap-6'>
                <div id='invoice' className='bg-white w-[220px] min-[550px]:w-[250px] sm:w-[300px] lg:w-[350px] p-5 text-xs text-slate-700 font-Roboto flex flex-col gap-1'>
                    <div className='flex flex-col w-full justify-center items-center '>
                        <h1 className="uppercase font-bold">factura</h1>
                        <p><span className='font-bold'>Elaborado:</span> Luis Fernando Alvarez</p>
                        <p><span className='font-bold'>ID-Factura: </span>{idInvoice}</p>
                        <p><span className='font-bold'>Fecha: </span>{getCurrentDate()}</p>
                    </div>
                    <div>
                        <hr className='border-1 border-dashed border-slate-700' />
                    </div>
                    <div className='w-full'>
                        <div className='flex justify-between'>
                            <p className='font-bold'>Presupuesto:</p>
                            <p>{balance.presupuesto}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='font-bold'>Gastado:</p>
                            <p>{balance.gastado}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='font-bold'>Disponible:</p>
                            <p>{balance.disponible}</p>
                        </div>
                    </div>
                    <div>
                        <hr className='border-1 border-dashed border-slate-700' />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <h1 className=' font-semibold uppercase font-Roboto'>Gastos</h1>
                    </div>
                    <div>
                        <hr className='border-1 border-dashed border-slate-700' />
                    </div>
                    <div className='w-full '>
                        {
                            gastos.length > 0 && gastos.map((item) => {

                                return (
                                    <div key={item.id} className=''>
                                        <div className='flex justify-between'>
                                            <h3>{item.nombre}</h3>
                                            <h3><span>{selectedCurrency.symbol} </span>{item.cantidad}</h3>
                                        </div>
                                    </div>
                                )

                            })
                        }
                    </div>
                    <hr className='border-1 border-dashed border-slate-700' />
                    <div className='flex justify-between font-bold uppercase'>
                        <p>Total</p>
                        <p>{balance.gastado}</p>
                    </div>
                </div>
                <button onClick={() => handleDownloadInvoice()} title='Imagen de la factura en formato png' className="w-full min-[550px]:w-fit bg-[#F2AB37] hover:bg-[#97691f] font-Inter text-lg sm:text-xl lg:text-2xl py-1 px-2 min-[550px]:px-6 sm:px-10 lg:px-16 lg:py-2 text-[#252322] rounded-lg cursor-pointer transition-colors ease-in duration-200">
                    Descargar factura
                </button>

            </div>
        </animated.div>
    )
}
