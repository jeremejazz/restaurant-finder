import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root() {
    return `
    <html>
        <head>
            <title>Resto Finder</title>
            <style>body{ font-family: sans-serif;}</style>
        </head>
        <body>
            <h1>Restaurant Finder</h1>
            <p>
            For more information, see <a href="/docs">API Docs</a>
            </p>
        </body>
    </html>
    `;
  }
}
