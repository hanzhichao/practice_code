# coding=utf-8
from email.mime.text import MIMEText
from email.header import Header
import smtplib
# import psutil

def send_mail(subject,content):
    
    mail_body=content
    msg = MIMEText(mail_body, 'html', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] = 'test_results@sina.com'
    msg['To'] = 'superhin@126.com'
    smtp = smtplib.SMTP()
    smtp.connect("smtp.sina.com")
    smtp.login("test_results@sina.com", "hanzhichao123")
    smtp.sendmail("test_results@sina.com", "superhin@126.com", msg.as_string())
    smtp.quit()
    print('email has send out!')


def check_cpu():
    if psutil.cpu_percent > 70:
        send_mail("Servr CPU>70%", "<h1>Top CPU Process</h1>")

def check_mem():
    if psutil.mem_percent >70:
        send_mail("Sever Mem>70%", "<h1>Top Mem Process")



def get_top_process(option='mem',n=10,added=True):
    process_list = []
    for proc in psutil.process_iter():
        process_list.append((proc.name(), proc.memory_percent(), proc.cpu_percent()))

    sort_index = 1 if option.lower() == 'mem' else 2  # 排序列，option=mem，按prcess_list第2列（index=1)排序

    process_list.sort(key=lambda process_list:process_list[sort_index], reverse=True)  # 将process_list按相应列从大到小排序,无累加模式


send_mail("test", "test content")