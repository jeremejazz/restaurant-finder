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
        <div style="text-align:center;">

            <h1>Restaurant Finder</h1>
            <p>
              <img src="https://res.cloudinary.com/jereme/image/upload/v1753929555/projects/resto-finder/coffee-and-toast.jpg" alt="Coffee and Toast" height="300" />
            </p>            
            <p>
            For more information, please see <a href="/docs">API Docs</a>.
            </p>

          </div>
        </body>
    </html>
    `;
  }
}
