import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense
from scipy.stats import pearsonr
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split

from utils.format_num import format_num
from utils.get_initial_data import get_initial_data
from utils.isExcelFile import isExcelFile


def get_predict_by_moving_average(file):
    isExcel = isExcelFile(file.filename)
    sheets, sheet_names, years, columns = get_initial_data(file, isExcel)

    moving_averages = {}
    row = {
        'profit': 0,
        'net_profit': 0,
        'net_loss': 0
    }
    n = 3

    for i in range(0, len(sheet_names)):
        frame = pd.DataFrame(sheets[sheet_names[i]])
        moving_average = frame[columns].rolling(window=n).mean()
        moving_average.drop(index=moving_average.index[0],
                            axis=0,
                            inplace=True)

        moving_average.loc[len(moving_average) + 1] = row
        moving_averages[sheet_names[i]] = moving_average.fillna(
            0).applymap(format_num)
        moving_averages[sheet_names[i]]['year'] = years

    result = []

    for company in sheets:
        length = len(sheets[company]['year'])
        columns_with_year = ['year', 'profit', 'net_profit', 'net_loss']
        temp_arr = []
        for i in range(0, length):
            temp = {}
            for column in columns_with_year:
                temp[column] = sheets[company][column][i]

            temp_arr.append(temp)

        result.append([company, temp_arr])

    moving_averages_arr = []

    for ss in range(length):
        moving_averages_arr.append([])
        for ggs in range(length):
            moving_averages_arr[ss].append({})

    for i in range(0, len(result)):
        company = result[i][0]
        temp = {}
        indicators = result[i][1]

        for column in columns_with_year:
            gg_values = moving_averages[company][column]
            count = 0
            for value in gg_values:
                moving_averages_arr[i][count][column] = value
                count += 1

        for column in columns_with_year:
            for j in range(0, length):
                indicators[j][column] = int(np.float64(
                    indicators[j][column]) if not np.isnan(indicators[j][column]) else -1)

        for k in range(0, len(columns)):
            values = moving_averages[company][columns[k]]

            ma = float(values[len(values) - 1])
            current_profit = float(sheets[company][columns[k]][length - 1])
            prev_profit = float(sheets[company][columns[k]][length - 2])

            temp[columns[k]] = ma + ((current_profit - prev_profit) / 3)

        temp['year'] = int(result[i][1][length - 1]['year']) + 1
        result[i][1].append(temp)
        result[i].append(moving_averages_arr[i])

    return result


def get_predict_by_linear_regression(file):
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
    # print(sheets)
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

            # future_x = np.array([[years[len(years) - 1]]]).reshape(-1, 1)
            # future_x = np.array([[years[len(years) - 1]]])
            future_y = model.predict([[years[len(years) - 1]]])

            temp[column] = pd.DataFrame(future_y).applymap(format_num)[0][0]

            y_pred = model.predict(x)

            year = years[0]
            count2 = 0
            for o in y_pred:
                # print(o[0], 'o')
                predict_temp[count2][column] = format_num(o[0])
                count2 += 1
            # y_pred = model.predict(x_test)
            # print(f'y_pred ${column}', y_pred)

            # mse = mean_squared_error(y_test, y_pred)
            # print(format_num(mse), 'mse')
            # print('r2', model.score(x_test, y_test))

            temp[column] = pd.DataFrame(future_y).applymap(format_num)[0][0]

        response[count].append(sheet)
        temp['year'] = years[len(years) - 1] + 1
        response[count].append(companies[count][1])
        response[count][1].append(temp)
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

            #         # подготовка данных
            #         x = sheets[sheet][['year']].values
            #         y = sheets[sheet][[column]].values
            #         scaler = MinMaxScaler()
            #         x_scaled = scaler.fit_transform(x)
            #         y_scaled = scaler.fit_transform(y)

            #         # разделение данных на обучающую и тестовую выборки
            #         train_size = int(len(x) * 0.7)
            #         x_train, x_test = x_scaled[:train_size], x_scaled[train_size:]
            #         y_train, y_test = y_scaled[:train_size], y_scaled[train_size:]

            #         # создание модели линейной регрессии

            #         model = Sequential([
            #             Dense(64, activation='relu', input_dim=1),
            #             Dense(32, activation='relu'),
            #             Dense(1, activation='linear')
            #         ])

            #         # компиляция модели

            #         model.compile(optimizer='adam', loss='mean_squared_error', metrics=[
            #                       'mae', 'mse'])

            #         # обучение модели
            #         model.fit(x_train, y_train, epochs=100, batch_size=16, verbose=1)

            #         # оценка качества модели
            #         loss = model.evaluate(x_test, y_test, verbose=0)
            #         print('Test loss:', loss)
            #         loss, mae, mse = model.evaluate(x_test, y_test, verbose=0)
            #         print('Test MAE:', mae)
            #         print('Test MSE:', mse)

            #         # прогнозирование будущего значения
            #         future_x = np.array([[11]])
            #         future_x_scaled = scaler.transform(future_x)
            #         future_y_scaled = model.predict(future_x_scaled)
            #         future_y = scaler.inverse_transform(future_y_scaled)

            #         temp[column] = pd.DataFrame(future_y).applymap(format_num)[0][0]

            #         linear_layer = model.layers[2]
            #         weights, biases = linear_layer.get_weights()
            #         print("Коэффициенты наклона: ", weights)
            #         print('Коэффициент сдвига ', biases)

            #         y_pred = model.predict(x_test)
            #         y_pred_unscaled = scaler.inverse_transform(y_pred)
            #         y_test_unscaled = scaler.inverse_transform(y_test)
            #         corr, _ = pearsonr(y_pred_unscaled.ravel(),
            #                            y_test_unscaled.ravel())
            #         print('Pearson correlation coefficient:', corr)

            #     response[count].append(sheet)
            #     temp['year'] = years[len(years) - 1] + 1
            #     response[count].append(companies[count][1])
            #     response[count][1].append(temp)

            #     count += 1
            #     # print(result)

            # for i in range(0, len(response)):
            #     indicators = response[i][1]
            #     for column in columns_with_year:
            #         for j in range(0, len(response[i][1])):
            #             indicators[j][column] = int(np.float64(
            #
            #                 indicators[j][column]) if not pd.isna(indicators[j][column]) else -1)
    return response
