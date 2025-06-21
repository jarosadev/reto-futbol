import React from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {Jugador} from '../types';

interface TarjetaJugadorProps {
  jugador: Jugador;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TarjetaJugador: React.FC<TarjetaJugadorProps> = ({
  jugador,
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
      <View className="flex-row justify-between items-start ">
        <View className="flex-1">
          <Text
            className={`text-xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
            {jugador.nombre}
          </Text>
          
          <View className="flex-row items-center mb-2">
            <Text className="text-xl mr-2">⚽</Text>
            <Text
              className={`text-base font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              #{jugador.numero_camiseta} • {jugador.posicion}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text className="text-xl mr-2">👤</Text>
            <Text
              className={`text-base ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {jugador.edad} años
            </Text>
          </View>
        </View>

        {(onEdit || onDelete) && (
          <View className="flex-row space-x-2 gap-2">
            {onEdit && (
              <TouchableOpacity
                onPress={() => onEdit(jugador.id)}
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
            )}
            {onDelete && (
              <TouchableOpacity
                onPress={() => onDelete(jugador.id)}
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
            )}
          </View>
        )}
      </View>

      {jugador.equipo && (
        <View
          className={`mt-3 p-3 rounded-xl ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
          <Text
            className={`font-semibold ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
            🏆 Equipo: {jugador.equipo.nombre}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TarjetaJugador;
