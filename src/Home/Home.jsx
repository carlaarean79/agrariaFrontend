import React, { useContext } from 'react';
import './Home.css';
import Cards from '../Cards/Cards';
import { contexto } from '../Contexto/Contexto';
import ControlledCarousel from '../Carrusel/Carrusel';
import Slider from '../Slider/Slider';
import GaleriaImg from '../GaleriaDeImg/GaleriaImg';

function Home() {
    const {datos} = useContext(contexto);
    return (
        <div className='home-container-all'>
            <div className='parallax'>
                <div className='caption'>
                    <p className='titulo'>Lorem ipsum dolor sit</p>
                    <p>Tenetur tempora dignissimos nemo, dolores necessitatibus nam et, modi atque quas ratione placeat nostrum consequatur provident, facere adipisci incidunt ad at eligendi?</p>
                </div>
            </div>
            <div className='section'>
                <div className="titulo-card">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quasi quia, vero maxime dolore perferendis earum laboriosam animi provident, totam accusantium esse! Nesciunt reiciendis delectus sit? Distinctio adipisci sint accusamus?</p>
                </div>
            {/* <ControlledCarousel/> */}
            {/* <Slider /> */}
            <GaleriaImg/>
            </div>
            <div className='parallax-2'>
                <div className='caption'>
                    <p className='titulo'>Lorem ipsum dolor sit</p>
                    <p>Tenetur tempora dignissimos nemo, dolores necessitatibus nam et, modi atque quas ratione placeat nostrum consequatur provident, facere adipisci incidunt ad at eligendi?</p>
                </div>
            </div>
            <div className='section-2'>
                <div className="titulo-card">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quasi quia, vero maxime dolore perferendis earum laboriosam animi provident, totam accusantium esse! Nesciunt reiciendis delectus sit? Distinctio adipisci sint accusamus?</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
