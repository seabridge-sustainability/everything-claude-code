"""Offline snapshot and read-only query contracts; no database or provider access."""
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('smoke', Path(__file__).parents[1] / 'agentic-stack/falkordb_smoke.py')
smoke = importlib.util.module_from_spec(spec)
spec.loader.exec_module(smoke)


class SmokeContractTests(unittest.TestCase):
    def test_generation_names_are_recognized_but_arbitrary_graphs_are_not(self):
        self.assertTrue(smoke.known_graph('manageesg__review1'))
        self.assertTrue(smoke.known_graph('frontend'))
        self.assertFalse(smoke.known_graph('unrelated'))
        self.assertFalse(smoke.known_graph('manageesg__'))

    def test_commit_alone_does_not_prove_freshness(self):
        self.assertFalse(smoke.verify_snapshot([['a', '1', 'now']], {'source_commit':'a'}, 2, 1))

    def test_verified_snapshot_requires_digest_and_counts(self):
        row = ['a', '1', 'now', 'verified', 'hash', 2, 1]
        expected = {'source_commit':'a', 'graph_sha256':'hash'}
        self.assertTrue(smoke.verify_snapshot([row], expected, 2, 1))
        for index, value in [(0,'other'),(3,'loading'),(4,'bad'),(5,3),(6,0)]:
            changed = row.copy()
            changed[index] = value
            self.assertFalse(smoke.verify_snapshot([changed], expected, 2, 1))

    def test_every_read_has_explicit_timeout_and_read_only_path(self):
        class Graph:
            def ro_query(self, query, timeout):
                assert timeout == 60000
                return query
        self.assertEqual(smoke.read_query(Graph(), 'MATCH (n) RETURN count(n)'), 'MATCH (n) RETURN count(n)')


if __name__ == '__main__':
    unittest.main()
