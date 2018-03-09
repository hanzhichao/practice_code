import sys

if len(sys.argv) <3:
    print("运行方法：python test_argv.py 被替换字符串 替换字符串")
else:
    with open("hello.txt","r+") as f:
        lines = f.readlines()
        content = ''  # 修改后内容
        for line in lines:
            line = line.replace(sys.argv[1],sys.argv[2])
            content = content + line  # 拼接line为修改后内容
        f.seek(0, 0)  # 重置文件指针到开头
        f.write(content)



# print(sys.argv[1])


