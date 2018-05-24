# coding:utf-8

from Tkinter import *

# resolve UnicodeEncodeError
import sys
reload(sys)
sys.setdefaultencoding('utf-8')


# ui
root = Tk()
root.title('简单请求发送器')
root.geometry('600x600+300+300')
root.resizable(False, False)

# uri
uri_frame = Frame(root, padx=10, pady=5)
uri_lbl = Label(uri_frame, text='Uri:')
uri_entry = Entry(uri_frame)
uri_lbl.pack(side=LEFT)
uri_entry.pack(fill=X)
uri_frame.pack(side=TOP, fill=X)


# header
header_frame1 = Frame(root, padx=10, pady=5)
header_frame1.pack(side=TOP, fill=X)

header_lbl = Label(header_frame1, text='Header:')
header_lbl.pack(side=LEFT, fill=X)

header_frame2 = Frame(root, padx=10)
header_frame2.pack(side=TOP, fill=X)

header_txt = Text(header_frame2, height=5)
header_txt.pack(fill=X)

# cookie
cookie_frame1 = Frame(root, padx=10, pady=5)
cookie_frame1.pack(side=TOP, fill=X)

cookie_lbl = Label(cookie_frame1, text='Cookie:')
cookie_lbl.pack(side=LEFT, fill=X)

cookie_frame2 = Frame(root, padx=10)
cookie_frame2.pack(side=TOP, fill=X)

cookie_txt = Text(cookie_frame2, height=2)
cookie_txt.pack(fill=X)

# data
data_frame1 = Frame(root, padx=10, pady=5)
data_frame1.pack(side=TOP, fill=X)

data_lbl = Label(data_frame1, text='Data:')
data_lbl.pack(side=LEFT, fill=X)

data_frame2 = Frame(root, padx=10)
data_frame2.pack(side=TOP, fill=X)

data_txt = Text(data_frame2, height=15)
data_txt.pack(fill=X)

# send
send_frame = Frame(root, padx=10, pady=5)
send_frame.pack(side=TOP, fill=X)

send_btn = Button(send_frame, text='发送', padx=5)
send_btn.pack(side=RIGHT)


root.mainloop()

