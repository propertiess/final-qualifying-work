from services.predict.get_by_moving_average import get_by_moving_average
from services.predict.get_by_linear_regression import get_by_linear_regression
from services.predict.get_by_ffnn import get_by_ffnn
from services.predict.get_by_rnn import get_by_rnn
from services.predict.get_by_gan import get_by_gan


class Predict:
    @staticmethod
    def by_moving_average(file):
        return get_by_moving_average(file)

    @staticmethod
    def by_linear_regression(file):
        return get_by_linear_regression(file)

    @staticmethod
    def by_ffnn(file):
        return get_by_ffnn(file)

    @staticmethod
    def by_rnn(file):
        return get_by_rnn(file)

    @staticmethod
    def by_gan(file):
        return get_by_gan(file)
