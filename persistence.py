# -*- coding: utf-8 -*-
import json
import random
import sqlite3
from typing import List

from flask import g


class Persistence:
    def __init__(self, db_name: str):
        self.DB_NAME = db_name
        self.ignore_list = ['zucker', 'mehl', 'salz', 'pfeffer', 'wasser',
                            'olivenöl', 'sonnenblumenöl', 'honig', 'bouillon',
                            'knoblauch', 'muskat']

    def dict_factory(self, cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d

    def get_db(self):
        db = getattr(g, '_database', None)
        if db is None:
            db = g._database = sqlite3.connect(self.DB_NAME)
        db.row_factory = self.dict_factory
        return db

    def query_db(self, query: str, args=(), one=False):
        """Query the DB - from http://flask.pocoo.org/docs/0.10/patterns/sqlite3/"""
        cursor = self.get_db().execute(query, args)
        rv = cursor.fetchall()
        cursor.close()
        self.get_db().commit()
        return (rv[0] if rv else None) if one else rv

    def search_recipes(self, ingredients: List[str], search_mode: str) -> List[
        List[str]]:
        base_query = 'SELECT * FROM recipe WHERE '
        for i in range(len(ingredients)):
            if i != 0: base_query += 'OR '
            base_query += "LOWER(ingredients) LIKE ? "
        db_results = self.query_db(base_query, list(
            map(lambda i: '%' + i.lower() + '%', ingredients)))
        print('Found', len(db_results), 'first results')

        # Rate recipes
        results = []
        for recipe in db_results:
            recipe['ingredients'] = json.loads(recipe['ingredients'])
            recipe['instructions'] = json.loads(recipe['instructions'])
            score = self.rate_use_most(recipe['ingredients'], ingredients)
            #            if search_mode == 'have_most':
            #                score = self.rate_have_most(recipe['ingredients'], ingredients)
            #            elif search_mode == 'use_most':
            #                score = self.rate_use_most(recipe['ingredients'], ingredients)
            #            else:
            #                score = self.rate_standard(recipe['ingredients'], ingredients)

            recipe['score'] = score
            results.append(recipe)

        results = sorted(results, key=lambda r: r['score'], reverse=True)

        # limit to 50 results
        return results[:50]

    #
    # def rate_standard(self, recipe_ingredients: List[str],
    #     ingredients: List[str]) -> float:
    #     """Rate recipe by how many ingredients are in there"""
    #     filtered_ingredients = []
    #     for i in recipe_ingredients:
    #         if not any([ignored in i.lower() for ignored in self.ignore_list]):
    #             filtered_ingredients.append(i)
    #     #        filtered_ingredients = list(
    #     #            filter(lambda i: not self.contains(i, ignore_list),
    #     #                   recipe_ingredients))
    #     available = list(
    #         filter(lambda i: self.contains(i, filtered_ingredients),
    #                ingredients))
    #     not_available = list(set(filtered_ingredients) - set(available))
    #
    #     # Score standard: How many ingredients can be used from search + how much of recipe is available
    #     score = len(available) + 1 / (len(not_available) + 0.5)
    #     return score

    def contains(self, element: str, l: List[str]) -> bool:
        """Check if element is in list"""
        return any([element.lower() in el.lower() for el in l])

    def rate_use_most(self, recipe_ingredients: List[str],
        ingredients: List[str]) -> float:
        filtered_ingredients = []
        for i in recipe_ingredients:
            if not any([ignored in i.lower() for ignored in self.ignore_list]):
                filtered_ingredients.append(i)
        available = list(
            filter(lambda i: self.contains(i, filtered_ingredients),
                   ingredients))
        not_available = list(set(filtered_ingredients) - set(available))

        # Score have_most: available over total ingredients
        # currently not in score: len(not_available) / 20
        score = len(available) + random.random() / 100
        return score

    # def rate_have_most(self, recipe_ingredients: List[str],
    #     ingredients: List[str]) -> float:
    #     filtered_ingredients = []
    #     for i in recipe_ingredients:
    #         if not any([ignored in i.lower() for ignored in self.ignore_list]):
    #             filtered_ingredients.append(i)
    #     available = list(
    #         filter(lambda i: self.contains(i, filtered_ingredients),
    #                ingredients))
    #     not_available = list(set(filtered_ingredients) - set(available))
    #
    #     # Score have_most: available over total ingredients
    #     # score = len(available) / (len(available) + len(not_available))
    #     score = -len(not_available) + len(available) / 20
    #     return score
