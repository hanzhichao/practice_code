import pytest
# import conftest

def func(x):
    return x + 1


def test_func(level):
    if level == '1':
        assert 1
    else:
        assert 0



def test_add(level):
    assert 1==1


if __name__ == '__main__':
    # pytest.main(["-q", "test_pytest_opt.py", "--level=1", "-v"])
    pytest.main(["--durations=3"])