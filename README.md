# Restaurant Finder

[![NestJS Auth CI](https://github.com/jeremejazz/restaurant-finder/actions/workflows/node.js.yml/badge.svg)](https://github.com/jeremejazz/restaurant-finder/actions/workflows/node.js.yml)

<p align="center">
<img src="chef-logo.svg" alt="Chef Hat" height="300px" />
</p>

## Project setup

In the root directory, create a copy of `.env.example` to `.env`

```sh
cp .env.example .env
```

Configure `.env` file the environment variables. Be sure to provide the `GEMINI_API_KEY`, `FOURSQUARE_API_KEY`, and `CODE`.

Install dependencies

```bash
$ npm ci
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

```

## API

To open the Swgger docs, add `/docs` in the browser after the base URL. (ex: https://localhost:3000/docs)

`GET` /api/execute

- Parameters
  - `code`
  - `message`

### Response

Returns a JSON with list of restaurants containing the following:

- **Name**
- **Address**
- **Cuisine**
- **Rating**
- **Price Level**
- **Operating Hours**

## Live Demo

A live demo of this project is available [here](https://restaurant-finder-rem.vercel.app)

### Limitations

Since this is not using the Premium subscription of foursquare, some of the fields may not be available in response. For more information about response fields, please check the [documentation](https://docs.foursquare.com/fsq-developers-places/reference/response-fields).
