# coding:utf-8
import xlrd
import json


def load(path):
    wb = xlrd.open_workbook(path)
    sh = wb.sheet_by_index(0)
    cols = sh.ncols
    rows = sh.nrows
    data_list = []

    for row in range(1, rows):
        data = {}
        for col in range(0, cols):
            data[sh.cell_value(0, col)] = sh.cell_value(row, col)
        data_list.append(data)
    # print data_list
    # print json.dumps(data_list,ensure_ascii=False,encoding="gb2312")

    return data_list

if __name__ == '__main__':
    a = load("new_quote.xls")
    # print type(a)
    # print len(a)
    # print a
    print a[0]
