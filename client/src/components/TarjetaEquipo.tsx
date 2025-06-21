import React from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {Equipo} from '../types';

interface TarjetaEquipoProps {
  equipo: Equipo;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TarjetaEquipo: React.FC<TarjetaEquipoProps> = ({
  equipo,
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
            {equipo.nombre}
          </Text>
          
          <View className="flex-row items-center mb-3">
            <Text className="text-2xl mr-2">🏆</Text>
            <Text
              className={`text-base font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Partidos Ganados: {equipo.partidos_ganados}
            </Text>
          </View>
        </View>

        {(onEdit || onDelete) && (
          <View className="flex-row space-x-2 gap-2">
            {onEdit && (
              <TouchableOpacity
                onPress={() => onEdit(equipo.id)}
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
                onPress={() => onDelete(equipo.id)}
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

      {equipo.entrenador && (
        <View
          className={`mt-3 p-3 rounded-xl ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
          <Text
            className={`font-semibold mb-1 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
            👨‍💼 Entrenador:
          </Text>
          <Text
            className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            {equipo.entrenador.nombre}
          </Text>
          <Text
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Estrategia: {equipo.entrenador.estrategia}
          </Text>
        </View>
      )}

      {equipo.jugadores && equipo.jugadores.length > 0 && (
        <View
          className={`mt-3 p-3 rounded-xl ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
          <Text
            className={`font-semibold mb-2 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}>
            ⚽ Jugadores ({equipo.jugadores.length}):
          </Text>
          {equipo.jugadores.map(jugador => (
            <Text
              key={jugador.id}
              className={`text-sm mb-1 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
              • {jugador.nombre} - {jugador.posicion} (#{jugador.numero_camiseta})
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default TarjetaEquipo;
