import pandas as pd
import numpy as np

from utils.format_num import format_num
from utils.get_initial_data import get_initial_data
from utils.isExcelFile import isExcelFile


def get_by_gan(file):
    isExcel = isExcelFile(file.filename)
    sheets, sheet_names, years, columns = get_initial_data(file, isExcel)
