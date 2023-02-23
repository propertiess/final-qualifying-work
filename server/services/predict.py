import pandas as pd

from utils.format_num import format_num


def get_predict_by_moving_average(file):
  xl = pd.ExcelFile(file)

  sheet_names = xl.sheet_names

  sheets = {}

  for i in range(0,len(sheet_names)):
      data = pd.read_excel(file, sheet_name=i)
      sheets[sheet_names[i]] = data

  columns = ['profit', 'net_profit', 'net_loss']


  years = []
  for i in range(0, len(sheets[sheet_names[0]]['profit'])):
    years.append(2011 + i)


  moving_averages = {}
  n = 3

  for i in range(0,len(sheet_names)):
    frame = pd.DataFrame(sheets[sheet_names[i]])
    moving_average = frame[columns].rolling(window=n).mean()

    moving_averages[sheet_names[i]] = moving_average.fillna(0).applymap(format_num)
    moving_averages[sheet_names[i]]['year'] = years


  result = {}
  result['year'] = sheets[sheet_names[0]]['year'][len(moving_averages[sheet_names[0]]) - 1] + 1

  for company in moving_averages:
    length = len(moving_averages[company])
    result[company] = {}

    for i in range(0, len(columns)):
      values = moving_averages[company][columns[i]]

      m = values[len(values) - 2]
      current_profit = sheets[company][columns[i]][length - 1]
      prev_profit = sheets[company][columns[i]][length - 2]

      result[company][columns[i]] = float(m) + ((float(current_profit) - float(prev_profit)) / 3)

  return result

  # print(moving_averages)
  # print(pd.DataFrame(moving_averages[sheet_names[2]]).to_csv('ai-teko.csv'))
