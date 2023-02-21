import sys
import pandas as pd


def get_predict_by_moving_average(file):
  xl = pd.ExcelFile(file)

  sheet_names = xl.sheet_names

  sheets = {}

  for i in range(0,len(sheet_names)):
      data = pd.read_excel(file, sheet_name=i)
      sheets[sheet_names[i]] = data


  def format_num(x):
      return "{:.2f}".format(x)

  columns = ['profit', 'net_profit', 'net_loss']


  years = []

  for i in range(0, len(sheets[sheet_names[0]]['profit'])):
    years.append(2011 + i)

  n = 3


  output = {}

  for i in range(0,len(sheet_names)):
    frame = pd.DataFrame(sheets[sheet_names[i]])
    moving_average = frame[columns].rolling(window=n).mean()

    output[sheet_names[i]] = moving_average.fillna(0).applymap(format_num)
    output[sheet_names[i]]['year'] = years

  return output
  # print(output)
  # print(pd.DataFrame(output[sheet_names[2]]).to_csv('ai-teko.csv'))


sys.modules[__name__] = get_predict_by_moving_average