(function(){
    // name space for log
    app.log = {};
    // tab object
    app.log.createTab = function(){
        // create win
        var win = Titanium.UI.createWindow({
            title:'ログ',
            backgroundColor:'#fff'
        });
        // create tab
        var tab = Titanium.UI.createTab({
            icon:'KS_nav_ui.png',
            title:'ログ',
            window:win
        });
        // create label
        var label = Titanium.UI.createLabel({
            color:'#999',
            text:'さいとう担当',
            font:{fontSize:20,fontFamily:'Helvetica Neue'},
            textAlign:'center',
            width:'auto'
        });
        // set label
        win.add(label);
        return tab;
    };
})();