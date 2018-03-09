import paramiko  # 需要pycrypto（3.0以上自动安装有问题）
import json
cmd='''
python <<EOF
import json
import psutil as pu
memInfo = {}
mem = pu.virtual_memory()
memInfo["total"] = mem.total
memInfo["available"] = mem.available
memInfo["percent"] = mem.percent
memInfo["used"] = mem.used
memInfo["free"] = mem.free
data = json.dumps(memInfo)
print(data)
EOF
'''


ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

ssh.connect("192.168.100.238", 22, "root", "q1w2e3r4")
# ssh.connect("192.168.100.241", 22, 'root', "1234567")
stdin, stdout, stderr = ssh.exec_command(cmd)
print(stdout.read().decode())
ssh.close()