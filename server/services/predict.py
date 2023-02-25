import numpy as np
import pandas as pd
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

    for i in range(0,len(sheet_names)):
        frame = pd.DataFrame(sheets[sheet_names[i]])
        moving_average = frame[columns].rolling(window=n).mean()
        moving_average.drop(index=moving_average.index[0], 
          axis=0, 
          inplace=True)

        moving_average.loc[len(moving_average) + 1] = row
        moving_averages[sheet_names[i]] = moving_average.fillna(0).applymap(format_num)
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
                indicators[j][column] = int(np.float64(indicators[j][column]) if not np.isnan(indicators[j][column]) else -1)

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
