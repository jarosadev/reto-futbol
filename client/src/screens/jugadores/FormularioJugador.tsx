import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TextInput, ScrollView, Alert, TouchableOpacity, useColorScheme} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import BotonPersonalizado from '../../components/BotonPersonalizado';
import ModalSeleccion from '../../components/ModalSeleccion';
import {RootStackParamList, Equipo} from '../../types';
import {jugadoresService, equiposService} from '../../services/api';

type FormularioJugadorScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AgregarJugador' | 'EditarJugador'>;
  route: RouteProp<RootStackParamList, 'AgregarJugador' | 'EditarJugador'>;
};

const FormularioJugador: React.FC<FormularioJugadorScreenProps> = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [posicion, setPosicion] = useState('');
  const [numeroCamiseta, setNumeroCamiseta] = useState('');
  const [cargando, setCargando] = useState(false);
  const [modalPosicionVisible, setModalPosicionVisible] = useState(false);
  const [modalEquipoVisible, setModalEquipoVisible] = useState(false);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [equipoId, setEquipoId] = useState('');

  const isEditing = route.name === 'EditarJugador';
  const jugadorId = isEditing ? (route.params as {id: number}).id : undefined;

  const posiciones = [
    'Portero',
    'Defensa',
    'Mediocampista',
    'Delantero'
  ];

  const cargarEquipos = async () => {
    try {
      const data = await equiposService.getAll();
      setEquipos(data);
    } catch (error) {
      Alert.alert('Error', 'Error al cargar los equipos');
    }
  };

  const cargarJugador = useCallback(async () => {
    try {
      const response = await jugadoresService.getAll();
      const jugador = response.find((j: any) => j.id === jugadorId);
      if (jugador) {
        setNombre(jugador.nombre);
        setEdad(jugador.edad.toString());
        setPosicion(jugador.posicion);
        setNumeroCamiseta(jugador.numero_camiseta.toString());
        if (jugador.equipoId) {
          setEquipoId(jugador.equipoId.toString());
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar los datos del jugador');
      navigation.goBack();
    }
  }, [jugadorId, navigation]);

  useEffect(() => {
    cargarEquipos();
    if (isEditing && jugadorId) {
      cargarJugador();
    }
  }, [isEditing, jugadorId, cargarJugador]);

  const guardarJugador = async () => {
    if (!nombre.trim() || !edad || !posicion.trim() || !numeroCamiseta || !equipoId) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    const jugadorData = {
      nombre,
      edad: parseInt(edad, 10),
      posicion,
      numero_camiseta: parseInt(numeroCamiseta, 10),
      equipoId: parseInt(equipoId, 10),
    };

    setCargando(true);
    try {
      if (isEditing && jugadorId) {
        await jugadoresService.update(jugadorId, jugadorData);
        Alert.alert('Éxito', 'Jugador actualizado correctamente');
      } else {
        await jugadoresService.create(jugadorData);
        Alert.alert('Éxito', 'Jugador agregado correctamente');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {

      setCargando(false);
    }
  };

  return (
    <ScrollView className={isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}>
      <View className="p-4">
        <View className={`p-4 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-4`}>
          <Text className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? 'Editar Jugador' : 'Agregar Nuevo Jugador'}
          </Text>
          <View className="space-y-4 gap-4">
            <View>
              <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Nombre del Jugador
              </Text>
              <TextInput
                className={`border p-4 rounded-xl ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ingrese el nombre del jugador"
                placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
              />
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Edad
              </Text>
              <TextInput
                className={`border p-4 rounded-xl ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
                placeholder="Ingrese la edad"
                placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
              />
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Posición
              </Text>
              <TouchableOpacity
                className={`border p-4 rounded-xl ${
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
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Número de Camiseta
              </Text>
              <TextInput
                className={`border p-4 rounded-xl ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                value={numeroCamiseta}
                onChangeText={setNumeroCamiseta}
                keyboardType="numeric"
                placeholder="Ingrese el número de camiseta"
                placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
              />
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Equipo
              </Text>
              <TouchableOpacity
                className={`border p-4 rounded-xl ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-300'
                }`}
                onPress={() => setModalEquipoVisible(true)}>
                <Text
                  className={
                    equipoId
                      ? isDarkMode
                        ? 'text-white'
                        : 'text-gray-900'
                      : 'text-gray-400'
                  }>
                  {equipoId ? equipos.find(e => e.id.toString() === equipoId)?.nombre : 'Seleccione un equipo'}
                </Text>
              </TouchableOpacity>
            </View>

            <BotonPersonalizado
              onPress={guardarJugador}
              texto={cargando 
                ? (isEditing ? 'Guardando...' : 'Agregando...') 
                : (isEditing ? 'Guardar Cambios' : 'Agregar Jugador')
              }
              estilo={isEditing ? 'bg-yellow-600' : 'bg-green-600'}
              deshabilitado={cargando}
            />
          </View>
        </View>
      </View>

      <ModalSeleccion
        visible={modalPosicionVisible}
        titulo="Seleccionar Posición"
        datos={posiciones}
        onSelect={(selectedPosition: string) => {
          setPosicion(selectedPosition);
          setModalPosicionVisible(false);
        }}
        onClose={() => setModalPosicionVisible(false)}
        mensajeVacio="No hay posiciones disponibles"
      />

      <ModalSeleccion
        visible={modalEquipoVisible}
        titulo="Seleccionar Equipo"
        datos={equipos.map(equipo => ({
          id: equipo.id,
          nombre: equipo.nombre,
        }))}
        onSelect={(item: {id: number; nombre: string}) => {
          setEquipoId(item.id.toString());
          setModalEquipoVisible(false);
        }}
        onClose={() => setModalEquipoVisible(false)}
        mensajeVacio="No hay equipos disponibles"
      />
    </ScrollView>
  );
};

export default FormularioJugador;
