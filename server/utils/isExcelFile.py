

def isExcelFile(filename):
    extension = filename.split('.')[1]

    if extension == 'xlsx' or extension == 'xls':
        isExcel = True
    elif extension == 'csv':
        isExcel = False

    return isExcel
