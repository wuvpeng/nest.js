import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import { Logger } from '@nestjs/common';


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
const port = process.env.PORT || 3000;
const outputFolder = process.env.OUTPUT_FOLDER;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    `/${outputFolder}`,
    serveStatic(path.join(__dirname, '../', outputFolder), {
      maxAge: '1d',
      extensions: ['xlsx'],
    }),
  );
  await app.listen(port);
  Logger.log(`http服务启动成功: http://127.0.0.1:${port}`);
}
bootstrap();
