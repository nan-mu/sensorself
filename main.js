"ui";
ui.layout(
    <vertical w="*" h="*">
        <text textSize="40sp" textStyle="bold" textColor="#000000">Sensorself</text>
        <text textColor="#000000">你的下一款传感器又何必是传感器</text>
        <text></text>
        <linear id="container"></linear>
    </vertical >
);

const key = ["accelerometer", "orientation", "gyroscope", "magnetic_field", "gravity", "linear_acceleration", "ambient_temperature", "light", "pressure", "proximity", "relative_humidity"], sensor_des = ["加速度传感器", "方向传感器", "陀螺仪传感器", "磁场传感器", "重力传感器", "线性加速度传感器", "环境温度传感器", "光线传感器", "压力传感器", "距离传感器", "湿度传感器"], sensor_arg = ["x轴加速度,y轴加速度,z轴加速度", "方位角,绕x轴旋转的角度,绕y轴顺时针旋转的角度", "x轴角速度,y轴角速度,z轴角速度", "x轴磁场强度,y轴磁场强度,z轴磁场强度", "x轴重力加速度,y轴重力加速度,z轴重力加速度"];

const sensor_arr = [];
let mistake_sensor = [], mistake_msg = "", csv_heard;
key.forEach((element, index) => {
    sensor_arr.push(sensors.register(element, sensors.delay.game));
    if (!sensor_arr[index]) mistake_sensor.push(index);
});
toastLog(mistake_sensor);
mistake_sensor.forEach(element => {
    let textView = ui.inflate(
        <text textColor="#000000" textSize="10sp"></text>
        , ui.container);
    textView.setText(`${sensor_des[element]}不可用\n`);
    ui.container.addView(textView);
});

var file = open("/storage/emulated/0/Documents/data.csv", "w");
file.writeline("time,ax,ay,az");

toastLog(Date.now());
setTimeout(() => toastLog(Date.now()), 5000);