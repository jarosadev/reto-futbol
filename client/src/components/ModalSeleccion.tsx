import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler,
  useColorScheme,
} from 'react-native';

interface ModalSeleccionProps {
  visible: boolean;
  titulo: string;
  datos: Array<{id?: number; nombre: string} | string>;
  onSelect: (item: any) => void;
  onClose: () => void;
  mensajeVacio?: string;
}

const ModalSeleccion: React.FC<ModalSeleccionProps> = ({
  visible,
  titulo,
  datos,
  onSelect,
  onClose,
  mensajeVacio = 'No hay datos disponibles',
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (visible) {
          onClose();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [visible, onClose]);

  const renderItem = ({item}: {item: any}) => {
    const texto = typeof item === 'string' ? item : item.nombre;
    
    return (
      <TouchableOpacity
        className={`p-4 border-b ${
          isDarkMode 
            ? 'border-gray-700 active:bg-gray-700' 
            : 'border-gray-200 active:bg-gray-100'
        }`}
        onPress={() => onSelect(item)}>
        <Text
          className={`text-base ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
          {texto}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View
          className={`w-11/12 max-h-[70%] rounded-2xl shadow-xl transition-colors ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
          >
          <View
            className={`p-4 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
            <Text
              className={`text-lg font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
              {titulo}
            </Text>
          </View>

          {datos.length > 0 ? (
            <FlatList
              data={datos}
              keyExtractor={(item, index) =>
                typeof item === 'string'
                  ? item
                  : item.id?.toString() || index.toString()
              }
              renderItem={renderItem}
              className="max-h-96"
            />
          ) : (
            <View className="p-4">
              <Text
                className={`text-base ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                {mensajeVacio}
              </Text>
            </View>
          )}

          <TouchableOpacity
            className={`p-4 border-t ${
              isDarkMode 
                ? 'border-gray-700 active:bg-gray-700' 
                : 'border-gray-200 active:bg-gray-100'
            }`}
            onPress={onClose}>
            <Text className="text-center font-semibold text-red-500">
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSeleccion;
