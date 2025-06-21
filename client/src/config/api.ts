import { Platform } from 'react-native';
import { PHYSICAL_DEVICE, LOCAL_IP, DEV_PORT, EMULATOR_HOST } from '@env';

const API_CONFIG = {
  BASE_URL: (() => {
    if (!__DEV__) {
      return 'https://produccion.com'; 
    }

    if (Platform.OS === 'android') {
      return PHYSICAL_DEVICE === 'true'
        ? `http://${LOCAL_IP}:${DEV_PORT}` 
        : `http://${EMULATOR_HOST}:${DEV_PORT}`; 
    }

    return PHYSICAL_DEVICE === 'true'
      ? `http://${LOCAL_IP}:${DEV_PORT}`
      : `http://localhost:8081`; 
  })(),

  // Endpoints
  ENDPOINTS: {
    EQUIPOS: '/api/equipos',
    JUGADORES: '/api/jugadores',
    ENTRENADORES: '/api/entrenadores',
    SIMULAR_PARTIDO: '/api/partidos/simular',
    RANKING: '/api/equipos/reportes/mas-ganados',
  },

  HEADERS: {
    'Content-Type': 'application/json',
  },

};

// Función para construir URLs completas
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export const fetchApi = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<any> => {
  try {
    const url = getApiUrl(endpoint);
    console.log(`Haciendo petición a: ${url}`, options);
    

    const response = await fetch(url, {
      headers: API_CONFIG.HEADERS,
      ...options,
    });

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('Error en fetchApi:', error);
    throw error;
  }
};

export default API_CONFIG;
