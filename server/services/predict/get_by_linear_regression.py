import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split

from utils.format_num import format_num
from utils.get_initial_data import get_initial_data
from utils.isExcelFile import isExcelFile


def get_by_linear_regression(file):
    isExcel = isExcelFile(file.filename)
    sheets, sheet_names, years, columns = get_initial_data(file, isExcel)

    for sheet in sheets:
        sheets[sheet] = pd.DataFrame(sheets[sheet]).fillna(0)

    companies = []
    for company in sheets:
        length = len(sheets[company]['year'])
        columns_with_year = ['year', 'profit', 'net_profit', 'net_loss']
        temp_arr = []
        for i in range(0, length):
            temp = {}
            for column in columns_with_year:
                temp[column] = sheets[company][column][i]

            temp_arr.append(temp)

        companies.append([company, temp_arr])

    response = []
    count = 0

    for sheet in sheets:
        print(sheet)
        response.append([])
        temp = {}
        predict_temp = []
        for year in years:
            predict_temp.append({'year': year})

        for column in columns:
            x = sheets[sheet][['year']].values
            y = sheets[sheet][[column]].values

            x_train, x_test, y_train, y_test = train_test_split(
                x, y, test_size=0.3)

            model = LinearRegression()
            model.fit(x_train, y_train)

            future_y = model.predict([[years[len(years) - 1] + 1]])

            temp[column] = pd.DataFrame(future_y).applymap(format_num)[0][0]

            y_pred = model.predict(x)

            # add predict array
            year = years[0]
            count2 = 0
            for o in y_pred:
                predict_temp[count2][column] = format_num(o[0])
                count2 += 1

            temp[column] = pd.DataFrame(future_y).applymap(format_num)[0][0]

        response[count].append(sheet)
        temp['year'] = years[len(years) - 1] + 1
        response[count].append(companies[count][1])
        response[count][1].append(temp)
        predict_temp.append(temp)
        response[count].append(predict_temp)
        count += 1

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
