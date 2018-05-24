import pytest


def func(x):
    return x + 1


@pytest.mark.level1
def test_func():
    assert func(3) == 4


def test_add():
    assert 1==1


if __name__ == '__main__':
    pytest.main("-v -m level1")