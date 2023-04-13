% 整理时间间隔矩阵
deT = ([data.time; 0] - [0; data.time])./1000.^2;
time = data.time./1000;
deT(end,:) = [];

% 设备坐标系位移
total_x = sum(abs(data.xms2).*deT);
x = cumsum(data.xms2.*deT);

% 角度修正坐标系位移
x_fix = x.*(cos((data.xAng./180).*pi));

plot(time, x, time, x_fix, time, -cumsum(data.xms3.*deT));
d=legend("原始位移","根据角度修正的位移");