def  check_ipv4(str):
    ip = str.strip().split(".")
    if len(ip) != 4 or False in map(lambda x:True if x.isdigit() and 0<= int(x) <= 255 else False, ip):
        return False
    else:
        return True

print(check_ipv4("192.168.1.200"))