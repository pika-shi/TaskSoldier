(function(){
    // name space for tasklist
    app.tasklist = {};
    // tab object
    app.tasklist.createTab = function(){
        // create win
        var win1 = Titanium.UI.createWindow({
            title:'タスク',
            backgroundColor:'#fff'
        });
        // create tab
        var tab = Titanium.UI.createTab({
            icon:'KS_nav_ui.png',
            title:'タスク',
            window:win1
        });
        // create button for add task
        var button = Titanium.UI.createButton({
            title: '+',
        });
        // create label
        var label = Titanium.UI.createLabel({
            color:'#999',
            text:'みやざきくん担当',
            font:{fontSize:20,fontFamily:'Helvetica Neue'},
            textAlign:'center',
            width:'auto'
        });
        // click addtask button
        button.addEventListener('click', function()
        {
            AddTaskWin = app.addtask.createWindow();
            tab.open(AddTaskWin)
        });
        // set label
        win1.add(label);
        // set button
        win1.setRightNavButton(button);
        return tab;
    };
})();