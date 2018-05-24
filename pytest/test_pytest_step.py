import pytest
# import conftest

def func(x):
    return x + 1

@pytest.mark.incremental
class TestDemo:
    def test_a(self):
        assert 0

    def test_func(self):

            assert 1


    def test_func2(self):
        assert 1==1

def test_zzz():
    pass

if __name__ == '__main__':
    pytest.main(["-rx", "test_pytest_step.py"])
    # pytest.main(["--durations=3"])