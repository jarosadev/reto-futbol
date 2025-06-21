import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, Alert, TouchableOpacity, useColorScheme} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BotonPersonalizado from '../components/BotonPersonalizado';
import ModalSeleccion from '../components/ModalSeleccion';
import {RootStackParamList, Equipo} from '../types';
import {equiposService, partidosService} from '../services/api';

type SimularPartidoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SimularPartido'>;
};

const SimularPartido: React.FC<SimularPartidoScreenProps> = ({navigation: _navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [equipoLocal, setEquipoLocal] = useState('');
  const [equipoVisitante, setEquipoVisitante] = useState('');
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(false);
  const [modalLocalVisible, setModalLocalVisible] = useState(false);
  const [modalVisitanteVisible, setModalVisitanteVisible] = useState(false);

  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    try {
      const data = await equiposService.getAll();
      setEquipos(data);
    } catch (error) {
      Alert.alert('Error', 'Error al cargar los equipos');
    }
  };

  const simularPartido = async () => {
    if (!equipoLocal || !equipoVisitante) {
      Alert.alert('Error', 'Por favor seleccione ambos equipos');
      return;
    }

    if (equipoLocal === equipoVisitante) {
      Alert.alert('Error', 'No se puede simular un partido entre el mismo equipo');
      return;
    }

    setCargando(true);
    try {
      const data = await partidosService.simular(
        parseInt(equipoLocal, 10),
        parseInt(equipoVisitante, 10)
      );

      const equipoLocalNombre = equipos.find(e => e.id.toString() === equipoLocal)?.nombre;
      const equipoVisitanteNombre = equipos.find(e => e.id.toString() === equipoVisitante)?.nombre;

      Alert.alert(
        '🎮 Resultado del Partido',
        `${equipoLocalNombre} 🏠  VS  ✈️ ${equipoVisitanteNombre}\n\n🏆 ¡${data.ganador.nombre} es el ganador!`,
        [
          {
            text: 'Aceptar',
            onPress: () => {
              setEquipoLocal('');
              setEquipoVisitante('');
            },
            style: 'default'
          }
        ],
        {
          cancelable: false
        }
      );
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView className={isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}>
      <View className="p-4">
        <View
          className={`p-6 rounded-2xl shadow-lg border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
          <Text className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Simular Partido
          </Text>

          <View className="mb-8">
            <Text className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Equipo Local
            </Text>
            <TouchableOpacity
              className={`border p-4 rounded-xl mb-6 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
              }`}
              onPress={() => setModalLocalVisible(true)}>
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">🏠</Text>
                <Text
                  className={`text-lg ${
                    equipoLocal
                      ? isDarkMode
                        ? 'text-white font-semibold'
                        : 'text-gray-900 font-semibold'
                      : 'text-gray-400'
                  }`}>
                  {equipoLocal
                    ? equipos.find(e => e.id.toString() === equipoLocal)?.nombre
                    : 'Seleccionar equipo local'}
                </Text>
              </View>
            </TouchableOpacity>

            <View className="items-center mb-6">
              <Text className={`text-3xl font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                VS
              </Text>
            </View>

            <Text className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Equipo Visitante
            </Text>
            <TouchableOpacity
              className={`border p-4 rounded-xl mb-6 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
              }`}
              onPress={() => setModalVisitanteVisible(true)}>
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">✈️</Text>
                <Text
                  className={`text-lg ${
                    equipoVisitante
                      ? isDarkMode
                        ? 'text-white font-semibold'
                        : 'text-gray-900 font-semibold'
                      : 'text-gray-400'
                  }`}>
                  {equipoVisitante
                    ? equipos.find(e => e.id.toString() === equipoVisitante)?.nombre
                    : 'Seleccionar equipo visitante'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <BotonPersonalizado
            onPress={simularPartido}
            texto={cargando ? 'Simulando...' : 'Simular Partido'}
            estilo="bg-indigo-600"
            deshabilitado={cargando}
          />
        </View>
      </View>

      <ModalSeleccion
        visible={modalLocalVisible}
        titulo="Seleccionar Equipo Local"
        datos={equipos}
        onSelect={(equipo: Equipo) => {
          setEquipoLocal(equipo.id.toString());
          setModalLocalVisible(false);
        }}
        onClose={() => setModalLocalVisible(false)}
        mensajeVacio="No hay equipos disponibles. Por favor, cree equipos primero."
      />

      <ModalSeleccion
        visible={modalVisitanteVisible}
        titulo="Seleccionar Equipo Visitante"
        datos={equipos}
        onSelect={(equipo: Equipo) => {
          setEquipoVisitante(equipo.id.toString());
          setModalVisitanteVisible(false);
        }}
        onClose={() => setModalVisitanteVisible(false)}
        mensajeVacio="No hay equipos disponibles. Por favor, cree equipos primero."
      />
    </ScrollView>
  );
};

export default SimularPartido;
