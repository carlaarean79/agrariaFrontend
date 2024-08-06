import React, { useContext } from 'react';
import './Slider.css';
import { contexto } from '../Contexto/Contexto';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Slider() {
    const { datos } = useContext(contexto);

    // Verifica si los datos están disponibles
    if (!datos || !datos.imgEscuela) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div className='container-all-slider'>
            <div className='arrows'><p><FaArrowLeft /><FaArrowRight /></p></div>
            <motion.div 
                className='slider' 
                drag='x' 
                dragConstraints={{ right: 0, left:-7000 }}
                >
                {datos.imgEscuela.map((imgEscuela, id) => (
                    <motion.div key={id} className='item'>
                        <img src={imgEscuela.url} alt={imgEscuela.name} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

export default Slider;
