import React, {useState} from 'react';
import {View, ScrollView, Text, Alert, TouchableOpacity, useColorScheme} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BotonPersonalizado from '../../components/BotonPersonalizado';
import TarjetaJugador from '../../components/TarjetaJugador';
import {RootStackParamList, Jugador} from '../../types';
import {jugadoresService} from '../../services/api';
import ModalSeleccion from '../../components/ModalSeleccion';

type BuscarJugadoresScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BuscarJugadores'>;
};

const BuscarJugadores: React.FC<BuscarJugadoresScreenProps> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [posicion, setPosicion] = useState('');
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [cargando, setCargando] = useState(false);
  const [modalPosicionVisible, setModalPosicionVisible] = useState(false);

  const posiciones = [
    'Portero',
    'Defensa',
    'Mediocampista',
    'Delantero'
  ];

  const seleccionarPosicion = (pos: string) => {
    setPosicion(pos);
    setModalPosicionVisible(false);
  };

  const buscarJugadores = async () => {
    if (!posicion) {
      Alert.alert('Error', 'Por favor seleccione una posición');
      return;
    }

    setCargando(true);
    try {
      const data = await jugadoresService.getByPosicion(posicion);
      setJugadores(data);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
      setJugadores([]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView className={isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}>
      <View className="p-4">
        <View className={`p-4 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-4`}>
          <Text className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Buscar por Posición
          </Text>
          <TouchableOpacity
            className={`border p-3 rounded-xl mb-4 ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-gray-50 border-gray-300'
            }`}
            onPress={() => setModalPosicionVisible(true)}>
            <Text
              className={
                posicion
                  ? isDarkMode
                    ? 'text-white'
                    : 'text-gray-900'
                  : 'text-gray-400'
              }>
              {posicion || 'Seleccione una posición'}
            </Text>
          </TouchableOpacity>

          <BotonPersonalizado
            onPress={buscarJugadores}
            texto={cargando ? 'Buscando...' : 'Buscar Jugadores'}
            estilo="bg-blue-500"
          />
        </View>

        {jugadores.length > 0 ? (
          jugadores.map((jugador) => (
            <TarjetaJugador key={jugador.id} jugador={jugador} />
          ))
        ) : (
          <View className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Text className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {posicion ? 'No se encontraron jugadores' : 'Seleccione una posición para buscar jugadores'}
            </Text>
          </View>
        )}
      </View>

      {/* Modal para seleccionar posición */}

      
      <ModalSeleccion
        visible={modalPosicionVisible}
        titulo="Seleccionar Posición"
        datos={posiciones}
        onSelect={(pos: string) => {
          seleccionarPosicion(pos);
        }}
        onClose={() => setModalPosicionVisible(false)}
        mensajeVacio="No hay posiciones disponibles"
      />
    </ScrollView>
  );
};

export default BuscarJugadores;
