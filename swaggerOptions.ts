import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Exchange Currency',
      version: '1.0.0',
      description: 'Documentation for Exchange Currency API',
    },
  },
  apis: ['./dist/src/routes/*.js', '../src/routes/*.ts'], 
};