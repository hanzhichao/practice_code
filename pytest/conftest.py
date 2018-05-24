# import pytest

# def pytest_addoption(parser):
#     parser.addoption("--level", action="store", default="1", help="test level: 1-5")


# @pytest.fixture
# def level(request):
#     return request.config.getoption("--level")


import pytest

def pytest_runtest_makereport(item, call):
    if "incremental" in item.keywords:
        if call.excinfo is not None:
            parent = item.parent
            parent._previousfailed = item

def pytest_runtest_setup(item):
    if "incremental" in item.keywords:
        previousfailed = getattr(item.parent, "_previousfailed", None)
        if previousfailed is not None:
            pytest.xfail("previous test failed (%s)" %previousfailed.name)