import express from 'express';
import root from './root';
import currencyExchange from './currencyExchange';

const app = express();

app.use('/', root);
app.use('/v1/', currencyExchange);


export default app;
