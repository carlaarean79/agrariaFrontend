export const fetchGet = async (url, token) => {

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                 'Authorization': `Bearer ${token}`
            }
        })
        return await res.json();
    } catch (error) {
        throw error;

    }

}

export const fetchPost = async (url, data) => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token recuperado:', token); // Verifica el token recuperado
        
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Si necesitas enviar un token, sino, puedes eliminar esta línea
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw error;
    }
  };
  

   export const fetchPut = async (url, token, bodi) =>{
       try {
        const token = localStorage.getItem('token');
              const res = await fetch(url, {
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                      ...(token && { "Authorization": `Bearer ${token}` })
                  },
                  body: JSON.stringify(bodi),
              });
              if (res.ok) {
                  return await res.json();
              } else {
                  // Manejar el caso de respuesta no exitosa aquí
                  console.log("Error en la solicitud HTTP:", res.status, res.statusText);
              }
          } catch (error) {
           console.error(`Error en el fetch al intentar editar el elemento `, error);
           throw error;
          }
      }

     export const fetchPatCh = async (url, token) =>{
       try {
        const token = localStorage.getItem('token');
        
              const res = await fetch(url, {
                  method: "PATCH",
                  headers: {
                      "Content-Type": "application/json",
                      ...(token && { "Authorization": `Bearer ${token}` })
                  }
              });
              if (res.ok) {
                  return await res.json();
              } else {
                  // Manejar el caso de respuesta no exitosa aquí
                  console.log("Error en la solicitud HTTP:", res.status, res.statusText);
              }
          } catch (error) {
           console.error(`Error en el fetch al intentar reactivar el elemento `, error);
           throw error;
          }
      }

    export  const fetchDelete = async (url, token) =>{
       try {
        const token = localStorage.getItem('token');
              const res = await fetch(url, {
                  method: "DELETE",
                  headers: {
                      "Content-Type": "application/json",
                      ...(token && { "Authorization": `Bearer ${token}` })
                  }
              });
              if (res.ok) {
                  return await res.json();
              } else {
                  // Manejar el caso de respuesta no exitosa aquí
                  console.log("Error en la solicitud HTTP:", res.status, res.statusText);
               const errorData = await res.json();
               throw new Error(errorData.message || 'Error al eliminar el producto');            
              }
          } catch (error) {
           console.error(`Error en el fetch al intentar borrar el elemento `, error);
           throw error;
          }
      }