import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Alert, ScrollView, useColorScheme} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import BotonPersonalizado from '../../components/BotonPersonalizado';
import {RootStackParamList} from '../../types';
import {equiposService} from '../../services/api';

type FormularioEquipoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AgregarEquipo' | 'EditarEquipo'>;
  route: RouteProp<RootStackParamList, 'AgregarEquipo' | 'EditarEquipo'>;
};

const FormularioEquipo: React.FC<FormularioEquipoScreenProps> = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [nombre, setNombre] = useState('');
  const [cargando, setCargando] = useState(false);
  const isEditing = route.name === 'EditarEquipo';
  const equipoId = isEditing ? (route.params as {id: number}).id : undefined;

  useEffect(() => {
    const cargarEquipo = async () => {
      try {
        const equipo = await equiposService.getById(equipoId!);
        setNombre(equipo.nombre);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el equipo');
        navigation.goBack();
      }
    };

    if (isEditing && equipoId) {
      cargarEquipo();
    }
  }, [isEditing, equipoId, navigation]);

  const guardarEquipo = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'Por favor ingrese el nombre del equipo');
      return;
    }

    setCargando(true);
    try {
      if (isEditing && equipoId) {
        await equiposService.update(equipoId, {
          nombre,
        });
        Alert.alert('Éxito', 'Equipo actualizado correctamente');
      } else {
        await equiposService.create({
          nombre,
          partidos_ganados: 0
        });
        Alert.alert('Éxito', 'Equipo creado correctamente');
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
            {isEditing ? 'Editar Equipo' : 'Crear Nuevo Equipo'}
          </Text>
          
          <View className="space-y-4 gap-4">
            <View>
              <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Nombre del Equipo
              </Text>
              <TextInput
                className={`border p-4 rounded-xl ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ingrese el nombre del equipo"
                placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
              />
            </View>

            <BotonPersonalizado
              onPress={guardarEquipo}
              texto={cargando ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Crear Equipo'}
              estilo="bg-blue-500"
              deshabilitado={cargando}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FormularioEquipo;
