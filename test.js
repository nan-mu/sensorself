"ui";

ui.layout(
    <linear id="container">
    </linear>
);

// 动态创建3个文本控件，并加到container容器中
// 这里仅为实例，实际上并不推荐这种做法，如果要展示列表，
// 使用list组件；动态创建十几个、几十个View会让界面卡顿
for (let i = 0; i < 3; i++) {
    let textView = ui.inflate(
        <text textSize="10sp"></text>
        , ui.container);
    textView.setText("文本控件" + i);
    ui.container.addView(textView);
}