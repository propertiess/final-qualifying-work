import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split

from utils.format_num import format_num
from utils.get_initial_data import get_initial_data
from utils.isExcelFile import isExcelFile
from utils.normalize_response import normalize_response


def get_by_ffnn(file):
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
        response.append([])
        temp = {}
        predict_temp = []

        for year in years:
            predict_temp.append({'year': year})

        for column in columns:
            X = sheets[sheet][['year']].values
            y = sheets[sheet][[column]].values

            model = tf.keras.models.Sequential([
                tf.keras.layers.Dense(
                    128, activation='relu', input_shape=(X.shape[1],)),
                tf.keras.layers.Dense(64, activation='relu'),
                tf.keras.layers.Dense(1, activation='linear')
            ])

            # Компиляция модели
            model.compile(optimizer='adam', loss='mean_squared_error')

            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2)

            model.fit(X_train, y_train, epochs=100,
                      batch_size=32, validation_data=(X_test, y_test))

            future_y = model.predict([[years[len(years) - 1] + 1]])

            temp[column] = pd.DataFrame(future_y).applymap(format_num)[0][0]

            y_pred = model.predict(X)

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

    return normalize_response(response)
