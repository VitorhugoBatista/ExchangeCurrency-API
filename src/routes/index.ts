import express from 'express';
import root from './root';
import currencyExchange from './currencyExchange';

const app = express();

app.use('/v1/currencyexchange', currencyExchange);
app.use('/', root);

export default app;
