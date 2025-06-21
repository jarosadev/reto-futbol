module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',        // Permite importar variables usando 'import { VARIABLE } from @env;'
        path: '.env',              // Ruta a tu archivo .env (por defecto es la raíz)
        blacklist: null,           
        whitelist: null,           
        safe: false,               
        allowUndefined: true,      
      },
    ],
  ],
};
