import subprocess

shell_cmd = 'echo 你好'
proc = subprocess.Popen(
                shell_cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                stdin=subprocess.PIPE,
                shell=True)
infos = proc.stdout.read().decode('gb2312')
print(infos)
# print(info.decode('GBK').encode('utf-8'))