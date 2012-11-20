(function(){
    // name space for tasklist
    app.tasklist = {};
    // tab object
    app.tasklist.createTab = function(){
        // create win
        var win = Titanium.UI.createWindow({
            title:'タスク',
            backgroundColor:'#fff'
        });
        // create tab
        var tab = Titanium.UI.createTab({
            icon:'KS_nav_ui.png',
            title:'タスク',
            window:win
        });
        var add_button = Titanium.UI.iOS.createTabbedBar({
            labels:['+'],
            backgroundColor:'#336699'
        });
        // create label
        var label = Titanium.UI.createLabel({
            color:'#999',
            text:'みやざきくん担当',
            font:{fontSize:20,fontFamily:'Helvetica Neue'},
            textAlign:'center',
            width:'auto'
        });
        // set addtask button
        win.setRightNavButton(add_button);
        add_button.addEventListener('click', function()
        {
            //var AddTaskWin = app.addtask.createWindow;
            AddTaskWin.open();
        });
        // set label
        win.add(label);
        return tab;
    };
})();