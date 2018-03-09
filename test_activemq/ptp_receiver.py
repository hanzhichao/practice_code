import stomp
import time

class MyListener(object):
    def on_message(self, headers, message):
        print(message)

conn = stomp.Connection10([("localhost", 61613)])
conn.set_listener('MyListener', MyListener())
conn.start()

conn.connect()
conn.subscribe('queue2')
time.sleep(1)
conn.disconnect()