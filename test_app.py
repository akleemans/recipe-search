# -*- coding: utf-8 -*-
import unittest

import app


class TestAppMethods(unittest.TestCase):

    def test_hello(self):
        self.assertEqual(app.hello(), ("Hello!", 200))


if __name__ == '__main__':
    unittest.main()
