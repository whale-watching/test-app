// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch';
// babel no reconoce este modulo algunas veces, luego de instalarlo configurarlo
import 'setimmediate';

// Configuration for environment variables node side
require('dotenv').config({
  path: '.env.test',
});

jest.mock('./src/helpers/getEnvironments', () => {
  return {
    getEnvironments: () => {
      return { ...process.env };
    },
  };
});
