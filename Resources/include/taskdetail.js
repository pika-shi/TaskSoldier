(function(){
    // name space for taskdetail
    app.taskdetail = {};
    // tab object
    app.taskdetail.createWindow = function(from, TaskId){
        // get record from DB
        var db = new TaskDB();
        task = db.fetchOne(TaskId);
        // create win
        TaskDetailWin = Ti.UI.createWindow({
            title:'タスクの詳細',
            backgroundColor:'#fff'
        });

        // create view (global)
        TaskDetailView = Ti.UI.createView({
                backgroundColor:'#fff',
                width: '320dp',
                height: '400dp'
            });

        // Task Name
        var TaskNameLabel = Ti.UI.createLabel({
            color:'#999',
            text: 'タスク名',
            height: '30dp',
            top: '30dp',
            left: '20dp',
            width: '100dp',
        });

        var TaskName = Ti.UI.createLabel({
            color:'#000',
            text: task.name,
            height: '30dp',
            top: '80dp',
            textAlign:'center',
            width: '120dp',
        });

        // DeadLine
        var DeadLineLabel = Ti.UI.createLabel({
            color:'#999',
            text: '締切日時',
            height: '30dp',
            top: '70dp',
            left: '20dp',
            width: '70dp',
        });

        var DeadLine = Ti.UI.createLabel({
            color:'#000',
            text: task.deadline.split('-').join('/'),
            height: '30dp',
            top: '120dp',
            textAlign:'center',
            width: '200dp',
        });

        // Importance Level
        var ImportanceLabel = Ti.UI.createLabel({
            color:'#999',
            text: '重要度',
            height: '30dp',
            top: '110dp',
            left: '20dp',
            width: '70dp',
        });
        var ImportanceView1 = Ti.UI.createView({
            backgroundColor:'#000',
            height: '30dp',
            top: '160dp',
            left: '80dp',
            width: '30dp',
        });
        var ImportanceView2 = Ti.UI.createView({
            backgroundColor:'#999',
            height: '30dp',
            top: '160dp',
            left: '120dp',
            width: '30dp',
        });
        var ImportanceView3 = Ti.UI.createView({
            backgroundColor:'#999',
            height: '30dp',
            top: '160dp',
            left: '160dp',
            width: '30dp',
        });

        if (task.importance == 2) {
            ImportanceView2.backgroundColor = '#000';
        }
        if (task.importance == 3) {
            ImportanceView2.backgroundColor = '#000';
            ImportanceView3.backgroundColor = '#000';
        }

        // memo
        var MemoLabel = Ti.UI.createLabel({
            color:'#999',
            text: 'メモ',
            height: '30dp',
            top: '150dp',
            left: '20dp',
            width: '70dp',
        });
        var Memo = Ti.UI.createLabel({
            color:'#000',
            text: task.memo,
            height: '30dp',
            top: '200dp',
            textAlign:'center',
            width: '200dp',
        });

        // add button
        var EditButton = Ti.UI.createButton({
            title: 'edit',
        });

        var TimerButton = Ti.UI.createButton({
            title: 'タイマー',
            top: '250dp',
            left: '140dp',
            width: '70dp',
            height: '30dp'
        });

        EditButton.addEventListener('click', function(e){
            // add record into TaskDB
            var addTaskWin = app.addtask.createWindow(TaskId);
            addTaskWin.title = "タスクの編集";
            tab.open(addTaskWin);
        });

        TimerButton.addEventListener('click', function(e){
            // add record into TaskDB
            var TimerWindow = app.timer.createWindow (TaskId, TaskDetailWin);
            TimerWindow.open();
        });

        // set label ＆ form
        //TaskDetailView.add(TaskNameLabel);
        TaskDetailView.add(TaskName);
        //TaskDetailView.add(DeadLineLabel);
        TaskDetailView.add(DeadLine);
        //TaskDetailView.add(ImportanceLabel);
        TaskDetailView.add(ImportanceView1);
        TaskDetailView.add(ImportanceView2);
        TaskDetailView.add(ImportanceView3);
        //TaskDetailView.add(MemoLabel);
        TaskDetailView.add(Memo);
        if (from == 'tasklist') TaskDetailWin.setRightNavButton(EditButton);
        TaskDetailView.add(TimerButton);
        TaskDetailWin.add(TaskDetailView);

        return TaskDetailWin;
    };
})();