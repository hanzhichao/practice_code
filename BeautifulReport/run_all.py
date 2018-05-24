import unittest
from BeautifulReport import BeautifulReport
import os
from tomorrow import threads


curpath = os.path.dirname(os.path.realpath(__file__))
casepath = os.path.join(curpath, 'case')
reportpath = os.path.join(curpath, "report")


def add_case(case_path=casepath, rule="test*.py"):
    discover = unittest.defaultTestLoader.discover(case_path, pattern=rule)
    return discover


@threads(2)
def run(test_suit):
    result = BeautifulReport(test_suit)
    result.report(filename="report.html", description='测试default报告', log_path='report')

if __name__ == '__main__':
    cases = add_case()
    for case in cases:
        run(case)
