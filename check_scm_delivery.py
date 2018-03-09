# !/usr/bin/env python
# -*- coding=utf-8 -*-

import pymysql
import json



class DB(object):
    def __init__(self, *args, **kwargs):
        self.conn = pymysql.connect(host='192.168.100.198',
                                    port=3306,
                                    user='root',
                                    passwd='spice',
                                    db='spicespirit',
                                    charset='utf8')
        self.cursor = self.conn.cursor()
    
    def __del__(self):
        self.cursor.close()
        self.conn.close()
    

    def exec_sql(self, sql):
        print(sql)
        effect_row = self.cursor.execute(sql)
        return self.cursor.fetchall()


    def gets(self, key, table, where_condition):
        sql = "SELECT %s FROM %s WHERE %s" % (key, table, where_condition)
        effect_row = self.cursor.execute(sql)
        try:
            return self.cursor.fetchone()
        except TypeError:
            print('无记录')

    def get(self, key, table, where_condition):
        sql = "SELECT %s FROM %s WHERE %s" % (key, table, where_condition)
        effect_row = self.cursor.execute(sql)
        try:
            return self.cursor.fetchone()[0]
        except TypeError:
            print('无记录')

    def compare(id):
        result = db.gets('parent_id,deliver_number,actual_number', 'scm_delivery_detail', "id=%d" % id)
        deliver_number = float(result[1])
        actual_number = float(result[2])
        if deliver_number != actual_number:
            pass


if __name__ == '__main__':
    db = DB()
    result = db.gets('parent_id,deliver_number,actual_number', 'scm_delivery_detail', "id=1")
    parent_id = result[0]
    deliver_number = float(result[1])
    # print(deliver_number)
    # print(json.dumps(str(result), ensure_ascii=False))

    delivery_code = db.get('code', 'scm_delivery', "id=%s" % parent_id)
    # print(delivery_code)
    try:
        difference_id = db.get('id', 'l_difference', 'delivery_code="%s"' % delivery_code)

    try:
        now_difference_num = float(db.get('now_difference_num', 'l_difference_detail', 'difference_id=%s' % difference_id))
    print(now_difference_num)
