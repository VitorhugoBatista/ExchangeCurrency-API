import { Router, Response, Request } from "express";
import fs from "fs";
import path from "path";

const packageJsonPath = path.join(__dirname, "..", "..", "package.json");
const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
const packageJson = JSON.parse(packageJsonContent);
const version = packageJson.version;
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Ook! server on!",
    timestamp: Date.now(),
    version,
  });
});

export default router;
