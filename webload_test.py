# coding:utf-8
import threading
import time
import httplib
import random
urls = ['/']

MAX_PAGE = 10000
SERVER_NAME = 'www.baidu.com'
TEST_COUNT = 10000

#创建一个 threading.Thread的派生类
class RequestThread(threading.Thread):
	def __init__(self, thread_name):
		threading.Thread.__init__(self)
		self.test_count = 0

	# 线程运行的入口函数
	def run(self):
		i = 0
		while i< TEST_COUNT:
			self.test_performance()
		i += 1
		#self.test_other_things()

	def test_performance(self):
		conn = httplib.HTTPConnection(SERVER_NAME)
		# 模拟 Keep-Alive 的访问，HTTP 1.1
		for i in range(0, random.randint(0,100)):
			# 构造一个 url, 提供随机参数的能力
			url = urls[random.randint(0, len(urls)-1)];
			url += str(random.randint(0, MAX_PAGE))
			#连接服务器
			try:
				conn.request("GET", url)
				rsps = conn.getresponse()
				if rsps.status == 200:
					data = rsps.read()
				self.test_count += 1
			except:
				continue

			conn.close()
