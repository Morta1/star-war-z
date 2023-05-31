# star-war-z

A simple app to query Starwars API (SWAPI)

The app consist of:

* Search field to query for films
* Results area which shows the characters from the queried film (in case of a multiple film results, a list of
  movies will be displayed instead)

## Getting Started

```shell
npm install

npm run dev
```

## API

Using `next.js` file based api under `/pages/api`

### Endpoints

`GET /api/films` - Returns a list of films, potentially filtered by title

| Parameter | Type     | Description                                          |
|:----------|:---------|:-----------------------------------------------------|
| `title`   | `string` | **Optional**. A partial/full title text to search by |

`POST /api/films/{id}` - Returns a single film, potentially with expanded sub resources

| Parameter | Type       | Description                                                                           |
|:----------|:-----------|:--------------------------------------------------------------------------------------|
| `expand`  | `string[]` | **Optional**. A comma seperated list of fields that should be expanded by the backend |

### Responses

#### Success response

```
{
  "data": array,
  "message": string // optional
}
```

#### Error response

```
{
  "message": string,
  "status": number
}
```

| Status Code | Description             |
|:------------|:------------------------|
| 200         | `OK`                    |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 405         | `Method Not Allowed`    |
| 500         | `INTERNAL SERVER ERROR` |

## Test

Using cypress to run E2E + integration + unit tests

```shell
npm run cypress
```

* Select E2E Testing
* Choose a browser
* Start E2E testing

## ETC

Libraries used:

* [Material UI](https://mui.com)
* [react-redux (@reduxjs/toolkit)](https://redux-toolkit.js.org)
* [Cypress](https://www.cypress.io)
