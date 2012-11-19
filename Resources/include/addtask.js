(function(){
    // name space for addtask
    app.addtask = {};
    // tab object
    app.addtask.createWindow = function(){
        var rootwin = Titanium.UI.createWindow();
        // create win
        var win = Titanium.UI.createWindow({
            title:'タスクの追加',
            backgroundColor:'#fff'
        });
        var nav = Titanium.UI.iPhone.createNavigationGroup({
            window: win
        });
        // create label
        var label = Titanium.UI.createLabel({
            color:'#999',
            text:'ぴかし担当',
            font:{fontSize:20,fontFamily:'Helvetica Neue'},
            textAlign:'center',
            width:'auto'
        });
        var nav = Titanium.UI.iPhone.createNavigationGroup({
            window: win
        });
        rootwin.add(nav);
        // set label
        //win.add(label);
        return rootwin;
    };
})();