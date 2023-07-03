import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('chunk')
  async getChunks(@Res() res: Response) {
    let counter = 0;

    // res.setHeader('Content-Type', 'text/plain');
    // res.setHeader('Transfer-Encoding', 'chunked');

    res.writeHead(200, {
      ...res.header,
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    });

    while (counter < 10) {
      res.write(`Message ${counter}`);

      counter++;

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    res.end();
  }

}
