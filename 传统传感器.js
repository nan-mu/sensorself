//csv文件路径
const csvPath = "/storage/emulated/0/Documents/data.csv";
//记录光线传感器的数据
var light = 0;
//记录加速度传感器的数据
var ax = 0;
var ay = 0;
var az = 0;
//监听光线传感器
sensors.register("light", sensors.delay.fastest)
    .on("change", l => {
        light = l;
    });
//监听加速度传感器
sensors.register("accelerometer", sensors.delay.fastest)
    .on("change", (ax0, ay0, az0) => {
        ax = ax0;
        ay = ay0;
        az = az0;
    });

var file = open(csvPath, "w");
//写csv表格头
file.writeline("light,ax,ay,az")
//每0.5秒获取一次数据并写入文件
var id = setInterval(() => {
    file.writeline(`${light},${ax},${ay + ""},${az + ""}`);
}, 1000);
//10秒后退出并打开文件
setTimeout(() => {
    clearInterval(id);
    file.close();
    sensors.unregisterAll();
}, 10 * 1000);
