import React, { useRef, useState } from "react";
import emailjs from 'emailjs-com';
import './FormContacto.css';
import { URL_SERVICE_ID, URL_TEMPLATE_ID, URL_USER_ID } from "../Endpoints/endopints";
import { fetchGet } from "../funcionesFetch/FuntionsFetch";

function ContactUs() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_lastname: '',
    messaje: '',
    user_email: '',
    user_telphone: ''
  });
  const [errors, setErrors] = useState('');
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = ['user_name', 'user_lastname', 'messaje', 'user_email'];
    let errorMessage = '';

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errorMessage = 'Por favor, complete todos los campos.';
      } else if (field === 'user_email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field])) {
        errorMessage = 'Por favor, ingrese un correo electrónico válido.';
      }
    });

    setErrors(errorMessage);
    return errorMessage === '';
  };

  const getEmailData = async () => {
    try {
      const serviceIdResponse = await fetchGet(URL_SERVICE_ID);
      const templateIdResponse = await fetchGet(URL_TEMPLATE_ID);
      const userIdResponse = await fetchGet(URL_USER_ID);

      return {
        serviceId: serviceIdResponse.serviceId,
        templateId: templateIdResponse.templateId,
        userId: userIdResponse.userId
      };

    } catch (error) {
      console.error('Error al obtener los datos sensibles:', error);
      return null;
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const emailData = await getEmailData();
    
    if (validateForm() && emailData) {
      emailjs.sendForm(emailData.serviceId, emailData.templateId, form.current, emailData.userId)
        .then((result) => {
          console.log('¡Mensaje enviado con éxito!', result.text);
          alert('¡Tu mensaje ha sido enviado con éxito!');
          form.current.reset(); // Limpiar el formulario
          setFormData({
            user_name: '',
            user_lastname: '',
            messaje: '',
            user_email: '',
            user_telphone: ''
          });
        })
        .catch((error) => {
          console.error('Error al enviar el mensaje...', error.text);
          alert('Lo sentimos, ocurrió un error al enviar tu mensaje. Por favor, inténtalo nuevamente más tarde.');
        });
    }
  };


  return (
    <>
      <h1 className="form-h1">Envíanos un mensaje</h1>
      <form ref={form} onSubmit={sendEmail} className="field">
        <div className="container-all-formulario">
          <label htmlFor="user_name">Nombre</label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            onChange={handleChange}
            value={formData.user_name}
            required
          />

          <label htmlFor="user_lastname">Apellido</label>
          <input
            type="text"
            name="user_lastname"
            id="user_lastname"
            onChange={handleChange}
            value={formData.user_lastname}
            required
          />

          <label htmlFor="messaje">Mensaje</label>
          <textarea
            name="messaje"
            id="messaje"
            onChange={handleChange}
            value={formData.messaje}
            required
          />

          <label htmlFor="user_email">Email</label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            onChange={handleChange}
            value={formData.user_email}
            required
          />

          <label htmlFor="user_telphone">Teléfono</label>
          <input
            type="text"
            name="user_telphone"
            id="user_telphone"
            onChange={handleChange}
            value={formData.user_telphone}
            required
          />

          <input type="submit" value="Enviar" />
        </div>
        <div className="logo-form">
          <img src='https://i.ibb.co/VQ8gBNm/logo-escuela.jpg' className='logo-form-contacto' alt="Logo Escuela" />
        </div>
      </form>
    </>
  );
}

export default ContactUs;
