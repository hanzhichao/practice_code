from highcharts import Highchart

# chart = Highchart()

# data = [1,2,3,4,5,6,7,8,9,10]
# chart.add_data_set(data, series_type='line', name='Test')
# chart.save_file()

chart = Highchart()

chart.set_options('chart', {'inverted': True})

options = {
    'title': {
        'text': 'LoadBoy 接口负载图'
    },
    'subtitle': {
        'text': '响应时间/吞吐量/线程数'
    },
    'xAxis': {
        'reversed': False,
        'title': {
            'enabled': True,
            'text': '响应时间'
        },
        'labels': {
            'formatter': 'function () {\
                return this.value + " t/s";\
            }'
        },
        'maxPadding': 0.05,
        'showLastLabel': True
    },
    'yAxis': {
        'title': {
            'text': '线程数'
        },
        'labels': {
            'formatter': "function () {\
                return this.value + '';\
            }"
        },
        'lineWidth': 2
    },
    'legend': {
        'enabled': False
    },
    'tooltip': {
        'headerFormat': '<b>{series.name}</b><br/>',
        'pointFormat': '{point.x} km: {point.y}°C'
    }
}
rt = [0.24, 0.24, 0.25, 0.25, 0.25]
tps = [24.85, 45.43, 58.11, 77.45, 93.47]
num = [6, 11, 15, 20, 24]
chart.set_dict_options(options)
# data =  [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1], 
# [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
tps_data = list(zip(tps, num))
chart.add_data_set(tps_data, 'spline', 'tps', marker={'enabled': False}) 

rt_data = list(zip(rt, num))
chart.add_data_set(rt_data, 'line', 'rt', marker={'enabled': False}) 

chart.save_file()