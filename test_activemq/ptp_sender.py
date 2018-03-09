import stomp

conn = stomp.Connection10([("localhost", 61613)])
conn.start()

conn.connect()
conn.send('queue2', 'From Python3')
conn.disconnect()