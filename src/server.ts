import express, { Express , Request, Response, NextFunction} from 'express';
import routes from './routes';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../swaggerOptions';
import swaggerJsdoc from 'swagger-jsdoc';

class Server {
  private app: Express;
  private port: string | number;
  private swaggerSpec: any;
  constructor(port: string | number) {
    this.app = express();
    this.port = port;
    this.swaggerSpec = swaggerJsdoc(swaggerOptions);

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json()); 
    this.app.use(express.urlencoded({ extended: true }));
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, 
      max: 100, 
      standardHeaders: true, 
      legacyHeaders: false, 
    });
    this.app.use(limiter);
  }

  private routes() {
  this.app.use('/',routes)
  this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
  this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({
        message: 'page not found',
      });
  }
  )}

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Running on http://localhost:${this.port}`);
    });
  }
}

export default Server;