params = {"partner_no":"test","tripartite_order":"ldkajdaodiowas","money":123,"goods":[{"good_name":"麻小","amount":1,"price":123},{"good_name":"麻小","amount":1,"price":123}],"address":"北京","lat":12.123,"lng":23.34534,"consignee_name":"颜回","consignee_phone":"13051813611","pay_type":1,"mark":"加急","start_time":123123131,"end_time":123123131,"send_time":123131313,"time":1524795948,"station_id":1}


def _sort(params):
    if isinstance(params, dict):
        params = [params]

    _str = ''
    for param in params:
        for k in sorted(param.keys()):
            v = param[k]
            if not isinstance(v, dict) and not isinstance(v, list):
                _str += str(v)
            else:
                _str += _sort(v)
    return _str


print(_sort(params))