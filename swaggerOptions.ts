import { Options } from 'swagger-jsdoc';
import path from 'path';
import fs from 'fs';

const swaggerDocumentPath = path.join(__dirname, 'src/docs/swaggerDocs.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerDocumentPath, 'utf-8'));

export const swaggerOptions: Options = {
  definition: swaggerDocument,
  apis: ['./dist/src/routes/*.js', '../src/routes/*.ts'], 
};