import React from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {Entrenador} from '../types';

interface TarjetaEntrenadorProps {
  entrenador: Entrenador;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TarjetaEntrenador: React.FC<TarjetaEntrenadorProps> = ({
  entrenador,
  onEdit,
  onDelete,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      className={`p-5 rounded-2xl shadow-lg mb-4 border ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-100'
      }`}>
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text
            className={`text-xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
            {entrenador.nombre}
          </Text>
          
          <View className="flex-row items-center mb-2">
            <Text className="text-xl mr-2">👨‍💼</Text>
            <Text
              className={`text-base font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {entrenador.edad} años
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text className="text-xl mr-2">📋</Text>
            <Text
              className={`text-base ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {entrenador.estrategia}
            </Text>
          </View>
        </View>

        <View className="flex-row space-x-2 gap-2">
          <TouchableOpacity
            onPress={() => onEdit(entrenador.id)}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
            <Text
              className={`text-sm font-medium ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}>
              ✏️ Editar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(entrenador.id)}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
            <Text
              className={`text-sm font-medium ${
                isDarkMode ? 'text-red-400' : 'text-red-600'
              }`}>
              🗑️ Eliminar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {entrenador.equipoId && (
        <View
          className={`mt-3 p-3 rounded-xl ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
          <Text
            className={`font-semibold ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
            🏆 Equipo: {entrenador.equipo?.nombre}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TarjetaEntrenador;
