import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
import tensorflow as tf
from utils.normalize_response import normalize_response
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.models import Sequential
from sklearn.preprocessing import MinMaxScaler

from utils.format_num import format_num
from utils.get_initial_data import get_initial_data
from utils.isExcelFile import isExcelFile


def get_by_rnn(file):
    isExcel = isExcelFile(file.filename)
    sheets, sheet_names, years, columns = get_initial_data(file, isExcel)
    for sheet in sheets:
        sheets[sheet] = pd.DataFrame(sheets[sheet]).fillna(0)

    companies = []

    scaler = MinMaxScaler()

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
        response.append([])
        temp = {}
        predict_temp = []

        for year in years:
            predict_temp.append({'year': year})

        for column in columns:
            X = sheets[sheet][['year']].values
            y = sheets[sheet][[column]].values

            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2)

            X_train_scaled = scaler.fit_transform(X_train)
            y_train_scaled = scaler.fit_transform(y_train)

            X_test_scaled = scaler.transform(X_test)
            y_test_scaled = scaler.transform(y_test)

            model = Sequential()
            model.add(LSTM(64, input_shape=(len(years), 1)))
            model.add(Dense(1, activation='linear'))
            model.compile(loss='mean_squared_error', optimizer='adam')

            model.fit(X_train_scaled, y_train_scaled, epochs=50, batch_size=64,
                      validation_data=(X_test_scaled, y_test_scaled))

            z = np.array([[years[len(years) - 1] + 1]])
            future_y = model.predict(z)

            temp[column] = pd.DataFrame(scaler.inverse_transform(
                future_y)).applymap(format_num)[0][0]

            y_pred = model.predict(X)

            y_pred_unscaled = scaler.inverse_transform(y_pred)
            # add predict array
            year = years[0]
            count2 = 0
            for o in y_pred_unscaled:
                predict_temp[count2][column] = format_num(o[0])
                count2 += 1

        response[count].append(sheet)
        temp['year'] = years[len(years) - 1] + 1
        response[count].append(companies[count][1])
        response[count][1].append(temp)
        predict_temp.append(temp)
        response[count].append(predict_temp)
        count += 1

    return normalize_response(response)
