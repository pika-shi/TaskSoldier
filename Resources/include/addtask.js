(function(){
    // create win (global)
    AddTaskWin = Ti.UI.createWindow({
        title:'タスクの追加',
        backgroundColor:'#fff'
    });
    Titanium.include('optionPickerDialog.js');
    // name space for addtask
    app.addtask = {};
    // tab object
    app.addtask.createWindow = function(){
        // FORM (Task Name)
        var TaskNameForm = Ti.UI.createTextField({
            color: '#333333',
            height: '30dp',
            top: '30dp',
            left: '100dp',
            width: '200dp',
            borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        var TaskNameLabel = Ti.UI.createLabel({
            color:'#999',
            text: 'タスク名',
            height: '30dp',
            top: '30dp',
            left: '20dp',
            width: '70dp',
        });

        // FORM (DeadLine)
        var DeadLineForm = Ti.UI.createTextField({
            color: '#333333',
            height: '30dp',
            top: '70dp',
            left: '100dp',
            width: '200dp',
            borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        var DeadLineLabel = Ti.UI.createLabel({
            color:'#999',
            text: '締切日時',
            height: '30dp',
            top: '70dp',
            left: '20dp',
            width: '70dp',
        });
        var DeadLineView = Ti.UI.createView({
            color:'transparent',
            height: '30dp',
            top: '70dp',
            left: '100dp',
            width: '200dp',
        });

        // add button
        var SubmitButton = Ti.UI.createButton({
            title: '追加',
            top: '140dp',
            left: '120dp',
            width: '70dp',
            height: '30dp'
        });

        SubmitButton.addEventListener('click', function(e){
            Ti.API.info(TaskNameForm.getValue());
        });

        // set label ＆ form
        AddTaskWin.add(TaskNameForm);
        AddTaskWin.add(TaskNameLabel);
        AddTaskWin.add(DeadLineForm);
        AddTaskWin.add(DeadLineLabel);
        AddTaskWin.add(DeadLineView);
        AddTaskWin.add(SubmitButton);

        optionPickerDialog.addEventListener('close', function(e){
                if (e.done==true && e.value){
                    alert(e.value);
                    DeadLineForm.value = e.value;
                }
            });
        DeadLineView.addEventListener('click', function()
        {
            optionPickerDialog.open();
        });


        return AddTaskWin;
    };
})();