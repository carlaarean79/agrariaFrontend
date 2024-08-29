import { useContext, useState } from 'react';
 import { contexto } from '../Contexto/Contexto';
import Button from '../Button/Button';

function AlertProducto({ setAlerta, idTexto, handleAlertAction, mensaje}) {
    const { setDatos } = useContext(contexto);
    const [texto, setTexto] = useState({
        texto: mensaje,
        condicion: true,
    });

    const btnClick = (e) => {
        const btn = e.target.id;
        setTexto({ texto: 'CARGANDO...', condicion: false });
        handleAlertAction(btn);
    };

    return (
        <div className='transparenteAlerta'>
            <div className='alertaEliminar'>
                {texto.condicion ? (
                    <div className='botonSiNo'>
                        <Button btn={{ id: idTexto, clase: "alerta", texto: idTexto }} btnClick={btnClick} />
                        <Button btn={{ id: "cancelar", clase: "alerta", texto: "Cancelar" }} btnClick={btnClick} />
                    </div>
                ) : null}
                <Button btn={{ id: "cerrar", clase: "cerrar", texto: "X" }} btnClick={btnClick} />
            </div>
        </div>
    );
};

export default AlertProducto;