# recipe-search

Ingredient-based recipe search based on Angular, Python/Flask and SQLite.

See it live here: [www.rezept-ideen.ch](https://www.rezept-ideen.ch/)

![](https://github.com/akleemans/recipe-search/blob/main/recipe-search.png)

## Run

Install dependencies:

* Frontend: `npm install` (in `frontend` directory)
* Backend: `pip3 install -r requirements.txt`

For both Frontend and Backend, see the IntelliJ run configurations.

## Release

To create a Frontend release (which will then be served by Flask), run `npm run release:local`

## Tests

* Angular Unit tests: `npm run test:ci`
* Python tests: `.run-unittests.sh`
* E2E tests: `npm run cypress:ci`

All of the tests will be run on the pipeline (Github Actions).
