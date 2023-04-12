"ui";

ui.layout(
    <vertical>
        <text text="列表例子" />
        <list id="列表">
            <horizontal>
                <text id="名字" text="{{名字}}" textSize="15" w="150" />
                <text id="排名" text="{{排名}}" textSize="15" w="150" />
                <text id="删除" text="删除" />
            </horizontal>
        </list>
    </vertical>
);
//创建数组
var items = []
//添加对象到数组
for (var i = 0; i < 10; i++) {
    items.push({
        "名字": "名字" + i,
        "排名": "排名" + i
    })
}
//
ui.列表.setDataSource(items);