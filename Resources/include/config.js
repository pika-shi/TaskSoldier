(function(){
    // name space for config
    app.config = {};
    // tab object
    app.config.createTab = function(){
        // create win
        var win = Titanium.UI.createWindow({
            title:'設定',
            backgroundColor:'#fff'
        });
        // create tab
        var tab = Titanium.UI.createTab({
            icon:'KS_nav_ui.png',
            title:'設定',
            window:win
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
        return tab;
    };
})();