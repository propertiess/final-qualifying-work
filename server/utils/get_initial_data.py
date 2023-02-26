import pandas as pd


def get_initial_data(file, isExcelFile):
    columns = ['profit', 'net_profit', 'net_loss']
    filename = file.filename.split('.')[0]

    if isExcelFile:
        xl = pd.ExcelFile(file)
        sheet_names = xl.sheet_names
        sheets = {}
        for i in range(0, len(sheet_names)):
            data = pd.read_excel(file, sheet_name=i)
            sheets[sheet_names[i]] = data

        years = []
        for i in range(0, len(sheets[sheet_names[0]]['profit'])):
            years.append(sheets[sheet_names[0]]['year'][0] + i)

        return sheets, sheet_names, years, columns
    else:
        sheets = {}
        sheet_names = []

        data = pd.read_csv(file)
        sheets[filename] = data

        years = []
        for i in range(0, len(sheets[filename]['profit'])):
            years.append(sheets[filename]['year'][0] + i)

        sheet_names.append(filename)

        return sheets, sheet_names, years, columns
