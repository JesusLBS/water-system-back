const fs = require('fs');
const path = require('path');
const axios = require('axios');

const POSTMAN_API_KEY = process.env.POSTMAN_API_KEY;
const COLLECTION_UID = process.env.POSTMAN_COLLECTION_ID;
const WORKSPACE_ID = process.env.POSTMAN_WORKSPACE_ID;

const inputFile = path.resolve('./postman/collections/water-system-back-v1.json');

try {
  const collectionJson = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  // Verificar si la colección existe
  axios
    .get(`https://api.getpostman.com/collections/${COLLECTION_UID}`, {
      headers: {
        'X-Api-Key': POSTMAN_API_KEY,
      },
    })
    .then((response) => {
      console.log('✅ La colección existe. Actualizando...');
      console.log('Response status:', response.status);
      // Actualizar la colección existente
      return axios.put(
        `https://api.getpostman.com/collections/${COLLECTION_UID}`,
        { collection: collectionJson },
        {
          headers: {
            'X-Api-Key': POSTMAN_API_KEY,
          },
        }
      );
    })
    .catch((error) => {
      if (error.response?.status === 404) {
        console.log('❌ La colección no existe. Creando...');
        // Crear una nueva colección en el espacio de trabajo especificado
        return axios.post(
          'https://api.getpostman.com/collections',
          { collection: collectionJson },
          {
            headers: {
              'X-Api-Key': POSTMAN_API_KEY,
            },
            params: {
              workspace: WORKSPACE_ID, // Especifica el workspace aquí
            },
          }
        );
      } else {
        throw error;
      }
    })
    .then((response) => {
      console.log('✅ Operación completada con éxito:');
      console.log(response.data);
    })
    .catch((error) => {
      console.error('❌ Error al manejar la colección:', error.response?.data || error.message);
    });
} catch (err) {
  console.error('❌ Error al leer o procesar el archivo JSON:', err.message);
}
