(function(){
    // name space for taskdetail
    app.taskdetail = {};
    // tab object
    app.taskdetail.createWindow = function(TaskId){
        // get record from DB
        var db = new TaskDB();
        task = db.fetchOne(1);

        Ti.API.info(task);
        // create win
        var win = Ti.UI.createWindow({
            title:'タスクの詳細',
            backgroundColor:'#fff'
        });
        // Task Name
        var TaskNameLabel = Ti.UI.createLabel({
            color:'#999',
            text: 'タスク名',
            height: '30dp',
            top: '30dp',
            left: '20dp',
            width: '70dp',
        });

        var TaskName = Ti.UI.createLabel({
            color:'#999',
            text: task.name,
            height: '30dp',
            top: '30dp',
            left: '100dp',
            width: '70dp',
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
            color:'#999',
            text: task.deadline,
            height: '30dp',
            top: '70dp',
            left: '100dp',
            width: '70dp',
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
            top: '110dp',
            left: '130dp',
            width: '30dp',
        });
        var ImportanceView2 = Ti.UI.createView({
            backgroundColor:'#999',
            height: '30dp',
            top: '110dp',
            left: '180dp',
            width: '30dp',
        });
        var ImportanceView3 = Ti.UI.createView({
            backgroundColor:'#999',
            height: '30dp',
            top: '110dp',
            left: '230dp',
            width: '30dp',
        });

        if (task.importance == 2) {
            ImportanceView2.backgroundColor = '#000';
        }
        if (task.importance == 3) {
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
            color:'#999',
            text: task.memo,
            height: '30dp',
            top: '150dp',
            left: '100dp',
            width: '70dp',
        });

        // set label ＆ form
        win.add(TaskNameLabel);
        win.add(TaskName);
        win.add(DeadLineLabel);
        win.add(DeadLine);
        win.add(ImportanceLabel);
        //win.add(Importance);
        win.add(ImportanceView1);
        win.add(ImportanceView2);
        win.add(ImportanceView3);
        win.add(MemoLabel);
        win.add(Memo);

        return win;
    };
})();