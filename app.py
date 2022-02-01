# -*- coding: utf-8 -*-
import json
from typing import Tuple, List

from flask import Flask, request, Response, send_from_directory
from flask_cors import CORS

from persistence import Persistence
from util import log

HTTP_OK = 200

app = Flask(__name__)
app.config.update(DEBUG=True)
cors = CORS(app)
db = Persistence('recipes.db')


##### FRONTEND #####

@app.route('/', methods=['GET'])
def index() -> Response:
    return app.send_static_file('index.html')


@app.route('/<path:path>', methods=['GET'])
def send_files(path) -> Response:
    if '.' in path:
        return send_from_directory('static', path)
    else:
        return app.send_static_file('index.html')


##### API #####

@app.route('/hello', methods=['GET'])
def hello() -> Tuple[str, int]:
    log('GET /hello')
    return "Hello!", HTTP_OK


@app.route('/api/recipes', methods=['POST'])
def search_recipes() -> Tuple[str, int]:
    log('GET /api/recipes with data:', request.data)
    data = json.loads(request.data)
    ingredients: List[str] = data['ingredients']
    search_mode: str = data['searchMode']
    return json.dumps(db.search_recipes(ingredients, search_mode)), HTTP_OK


if __name__ == '__main__':
    app.run()
