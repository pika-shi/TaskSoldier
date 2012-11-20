(function(){
    // name space for addtask
    app.addtask = {};
    // tab object
    app.addtask.createWindow = function(){
        // create win
        var win = Titanium.UI.createWindow({
            title:'タスクの追加',
            backgroundColor:'#fff'
        });
        // create label
        var label = Titanium.UI.createLabel({
            color:'#999',
            text:'ぴかし担当',
            font:{fontSize:20,fontFamily:'Helvetica Neue'},
            textAlign:'center',
            width:'auto'
        });
        // set label
        win.add(label);
        return win;
    };
})();