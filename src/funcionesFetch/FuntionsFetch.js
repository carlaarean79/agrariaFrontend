export const fetchGet = async (url, token) => {

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                 'Authorization': `Bearer ${token}`
            }
        })
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
            return await res.json();
    } catch (error) {
        console.error(`Fetch error: ${error.message}`);
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
  

  export const fetchPut = async (url, bodi, token = localStorage.getItem('token')) => {
    try {
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
            const errorData = await res.json();
            throw new Error(errorData.message || 'Error al realizar la operación');
        }
    } catch (error) {
        console.error("Error en el fetch al intentar editar el elemento", error);
        throw error;
    }
};


     export const fetchPatch = async (url, token = localStorage.getItem('token')) =>{
       try {
        
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
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al realizar la operación');
            }
            
          } catch (error) {
           console.error(`Error en el fetch al intentar reactivar el elemento `, error);
           throw error;
          }
      }

    export  const fetchDelete = async (url, token = localStorage.getItem('token')) =>{
       try {
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
               const errorData = await res.json();
               throw new Error(errorData.message || 'Error al eliminar el producto');            
              }
          } catch (error) {
           console.error(`Error en el fetch al intentar borrar el elemento `, error);
           throw error;
          }
      }