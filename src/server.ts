import express, { Express, Request, Response, NextFunction } from "express";
import routes from "./routes";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swaggerOptions";
import swaggerJsdoc from "swagger-jsdoc";
import morgan from "morgan";

class Server {
  public app: Express;
  private port: string | number;
  private swaggerSpec: any;
  constructor(port?: string | number) {
    this.app = express();
    this.port = port || process.env.PORT || 3000;
    this.swaggerSpec = swaggerJsdoc(swaggerOptions);
    this.app.use(morgan("combined"));
    this.middlewares();
    this.routes();
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on PORT: ${this.port}`);
    });
  }

  private middlewares() {
    this.app.set("trust proxy", 1); // trust first proxy (Heroku)
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
    this.app.use(routes);
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerSpec),
    );
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({
        message: "resource not found",
      });
    });
  }
}

export default Server;
