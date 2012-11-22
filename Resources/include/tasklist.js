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

        // link to task
        var TaskLabel = Titanium.UI.createLabel({
            color:'#999',
            text:'あるタスク',
            font:{fontSize:20,fontFamily:'Helvetica Neue'},
            textAlign:'center',
            width:'auto',
            top: '30dp',
        });
        // click addtask button
        button.addEventListener('click', function()
        {
            var AddTaskWindow = app.addtask.createWindow();
            tab.open(AddTaskWindow);
        });

        // click task label
        TaskLabel.addEventListener('click', function()
        {
            var TaskDetailWindow = app.taskdetail.createWindow();
            tab.open(TaskDetailWindow);
        });
        // set label
        win.add(label);
        win.add(TaskLabel);
        // set button
        win.setRightNavButton(button);
        return tab;
    };
})();