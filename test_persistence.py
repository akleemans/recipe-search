# -*- coding: utf-8 -*-
import unittest
from typing import List

import persistence


class TestAppMethods(unittest.TestCase):

    def setUp(self):
        self.db = persistence.Persistence('recipes.db')

    def test_rate_simple(self):
        recipe_ingredients: List[str] = ['Hefe', '5 Kürbiskerne']
        ingredients: List[str] = ['Kürbiskerne', 'Hefe']
        score = self.db.rate_use_most(recipe_ingredients, ingredients)
        self.assertAlmostEqual(score, 2, delta=0.1)

    def test_rate_with_ingredient_exceptions(self):
        recipe_ingredients: List[str] = ['3 DL Wasser', '100g Mehl', 'Hefe']
        ingredients: List[str] = ['Wasser', 'Mehl', 'Hefe']
        score = self.db.rate_use_most(recipe_ingredients, ingredients)
        self.assertAlmostEqual(score, 1, delta=0.1)

    def test_rate_randomness(self):
        recipe_ingredients: List[str] = ['Kürbis', 'Wasser', 'Salz', 'Ingwer']
        ingredients: List[str] = ['Kürbis', 'Ingwer']
        score = self.db.rate_use_most(recipe_ingredients, ingredients)
        self.assertNotEqual(score, 2.0)
        self.assertAlmostEqual(score, 2, delta=0.1)


if __name__ == '__main__':
    unittest.main()
