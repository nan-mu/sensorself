"ui";
ui.layout(
    <vertical w="*" h="*">
        <text textSize="40sp" textStyle="bold" textColor="#000000">Sensorself</text>
        <text textColor="#000000">你的下一款传感器又何必是传感器</text>
        <text> </text>
        <text margin="10 0">注意！距离传感器只有两个值：0/5，0表示前置摄像头附近有物体，5表示反之情况</text>
        <text margin="10 0">大部分设备没有环境温度和环境湿度传感器</text>
        <text> </text>
        <list id="mistake_sensor_list_display">
            <horizontal>
                <text h="20sp" textColor="#000000" id="context" text="{{context}}"></text>
            </horizontal>
        </list>
        <horizontal>
            <button w="auto" id="no_shutdown" style="Widget.AppCompat.Button.Colored" text="开始" />
            <button w="auto" id="shutdown" style="Widget.AppCompat.Button.Colored" text="结束" />
        </horizontal>
        <text>数据文件存放路径</text>
        <input inputType="textLongMessage" w="*" id="path" text="/storage/emulated/0/Documents/data.csv" />
        <button w="*" id="path_change" text="确定" />

    </vertical >
);

const key = ["accelerometer", "orientation", "gyroscope", "magnetic_field", "gravity", "linear_acceleration", "ambient_temperature", "light", "pressure", "proximity", "relative_humidity"], sensor_des = ["加速度传感器", "方向传感器", "陀螺仪传感器", "磁场传感器", "重力传感器", "线性加速度传感器", "环境温度传感器", "光线传感器", "压力传感器", "距离传感器", "湿度传感器"], sensor_arg = ["x轴加速度m/s^2,y轴加速度m/s^2,z轴加速度m/s^2,", "方位角/度,绕x轴旋转的角度/度,绕y轴顺时针旋转的角度/度,", "x轴角速度P/rad/s,y轴角速度/rad/s,z轴角速度/rad/s,", "x轴磁场强度/uT,y轴磁场强度/uT,z轴磁场强度/uT,", "x轴重力加速度m/s^2,y轴重力加速度m/s^2,z轴重力加速度m/s^2,", "x轴线性加速度m/s^2,y轴线性加速度m/s^2,z轴线性加速度m/s^2,", "环境温度/摄氏度,", "环境光强度/lux,", "大气压/hPa,", "0/5,", "相对湿度/%,"];

var sensor_arr = [];
let mistake_sensor = new Set(), mistake_msg = "", csv_path = "/storage/emulated/0/Documents/data.csv";
var csv_temp_msg = [""];
key.forEach((element, index) => {
    sensor_arr.push(sensors.register(element, sensors.delay.game));
    if (!sensor_arr[index]) mistake_sensor.add(index);
});

toastLog(mistake_sensor);

// mistake_sensor.forEach(element => {
//     let textView = ui.inflate(
//         <text textColor="#000000" textSize="10sp"></text>
//         , ui.container);
//     textView.setText(`${sensor_des[element]}不可用\n`);
//     ui.container.addView(textView);
// });

var mistake_sensor_list = [];
mistake_sensor.forEach(element => {
    mistake_sensor_list.push({
        "context": `${sensor_des[element]}不可用\n`
    });
});

ui.mistake_sensor_list_display.setDataSource(mistake_sensor_list);

// const begin_scanf = function () {
sensor_arr.forEach((element, index) => {
    element ? element.on("change", (event, a, b, c) => {
        // if (a) csv_temp_msg[Date.now()][index][0] = a;
        // if (b) csv_temp_msg[Date.now()][index][1] = b;
        // if (c) csv_temp_msg[Date.now()][index][2] = c;
        csv_temp_msg[index] = "";
        if (!(a === NaN)) csv_temp_msg[index] += util.format("%d,", a) || util.format("0,");
        if (b) csv_temp_msg[index] += util.format("%d,", b);
        if (c) csv_temp_msg[index] += util.format("%d,", c);
    }) : "";
});
// }

var file = open(csv_path, "w");

const begin_write_data = function (interval_time) {
    let csv_heard = "时间,";
    toastLog("开始记录数据 " + new Date());
    var now = Date.now();
    sensor_arg.forEach((element, index) => {
        if (!mistake_sensor.has(index)) csv_heard += element;
    });
    file.writeline(csv_heard);
    return setInterval(() => {
        let msg = (Date.now() - now) + ",";
        for (let index in csv_temp_msg)
            if (!mistake_sensor.has(index))
                msg += csv_temp_msg[index];
        file.writeline(msg);
        console.log("写入数据\n" + csv_temp_msg);
    }, interval_time);
}

var writer;

ui.no_shutdown.click(() => writer = begin_write_data(500));
ui.shutdown.click(() => {
    clearInterval(writer);
    file.close();
    sensors.unregisterAll();
});
ui.path_change.click(() => {
    csv_path = ui.path.getText();
    console.log(csv_path);
});