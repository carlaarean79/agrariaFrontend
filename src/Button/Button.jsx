import React from 'react'
import './Button.css'

function Button({btn, btnClick, titulo}) {
  return (
    <button id={btn.id} className= {btn.clase} onClick={btnClick} texto={titulo}>
        { btn.texto}
    </button>
  )
}

export default Button