import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TextInput, ScrollView, Alert, TouchableOpacity, useColorScheme} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import BotonPersonalizado from '../../components/BotonPersonalizado';
import ModalSeleccion from '../../components/ModalSeleccion';
import {RootStackParamList, Equipo} from '../../types';
import {entrenadoresService, equiposService} from '../../services/api';

type FormularioEntrenadorScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AgregarEntrenador' | 'EditarEntrenador'>;
  route: RouteProp<RootStackParamList, 'AgregarEntrenador' | 'EditarEntrenador'>;
};

const FormularioEntrenador: React.FC<FormularioEntrenadorScreenProps> = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [estrategia, setEstrategia] = useState('');
  const [cargando, setCargando] = useState(false);
  const [modalEquipoVisible, setModalEquipoVisible] = useState(false);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [equipoId, setEquipoId] = useState('');

  const isEditing = route.name === 'EditarEntrenador';
  const entrenadorId = isEditing ? (route.params as {id: number}).id : undefined;

  const cargarEquipos = async () => {
    try {
      const data = await equiposService.getAll();
      setEquipos(data);
    } catch (error) {
      Alert.alert('Error', 'Error al cargar los equipos');
    }
  };

  const cargarEntrenador = useCallback(async () => {
    try {
      const response = await entrenadoresService.getAll();
      const entrenador = response.find((e: any) => e.id === entrenadorId);
      if (entrenador) {
        setNombre(entrenador.nombre);
        setEdad(entrenador.edad.toString());
        setEstrategia(entrenador.estrategia);
        if (entrenador.equipoId) {
          setEquipoId(entrenador.equipoId.toString());
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar los datos del entrenador');
      navigation.goBack();
    }
  }, [entrenadorId, navigation]);

  useEffect(() => {
    cargarEquipos();
    if (isEditing && entrenadorId) {
      cargarEntrenador();
    }
  }, [isEditing, entrenadorId, cargarEntrenador]);

  const guardarEntrenador = async () => {
    if (!nombre.trim() || !edad || !estrategia.trim() || !equipoId) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    const entrenadorData = {
      nombre,
      edad: parseInt(edad, 10),
      estrategia,
      equipoId: parseInt(equipoId, 10),
    };

    setCargando(true);
    try {
      if (isEditing && entrenadorId) {
        await entrenadoresService.update(entrenadorId, entrenadorData);
        Alert.alert('Éxito', 'Entrenador actualizado correctamente');
      } else {
        await entrenadoresService.create(entrenadorData);
        Alert.alert('Éxito', 'Entrenador agregado correctamente');
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
            {isEditing ? 'Editar Entrenador' : 'Agregar Nuevo Entrenador'}
          </Text>
          <View className="space-y-4 gap-4">
            <View>
              <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Nombre del Entrenador
              </Text>
              <TextInput
                className={`border p-4 rounded-xl ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ingrese el nombre del entrenador"
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
                Estrategia
              </Text>
              <TextInput
                className={`border p-4 rounded-xl ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                value={estrategia}
                onChangeText={setEstrategia}
                placeholder="Ingrese la estrategia"
                placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
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
              onPress={guardarEntrenador}
              texto={cargando 
                ? (isEditing ? 'Guardando...' : 'Agregando...') 
                : (isEditing ? 'Guardar Cambios' : 'Agregar Entrenador')
              }
              estilo={isEditing ? 'bg-yellow-600' : 'bg-purple-600'}
              deshabilitado={cargando}
            />
          </View>
        </View>
      </View>

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

export default FormularioEntrenador;
