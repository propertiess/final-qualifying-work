import pandas as pd
import numpy as np

columns_with_year = ['year', 'profit', 'net_profit', 'net_loss']


def normalize_response(response):
    for i in range(0, len(response)):
        indicators = response[i][1]
        for column in columns_with_year:
            for j in range(0, len(response[i][1])):
                indicators[j][column] = int(np.float64(
                    indicators[j][column]) if not pd.isna(indicators[j][column]) else -1)
    for i in range(0, len(response)):
        indicators = response[i][2]
        for column in columns_with_year:
            for j in range(0, len(response[i][2])):
                indicators[j][column] = int(np.float64(
                    indicators[j][column]) if not pd.isna(indicators[j][column]) else -1)

    return response
