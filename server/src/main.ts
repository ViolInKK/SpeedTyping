import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

async function start() {

  // var cors = require('cors')
  
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule,
    {
      cors: true
    });
  app.use(cookieParser());
  // app.use(cors())
  app.setGlobalPrefix('/api')
  await app.listen(PORT, () => {console.log(`server started on port = ${PORT}`)});
}
start();