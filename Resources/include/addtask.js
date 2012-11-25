(function(){
    Titanium.include('optionPickerDialog.js');
    // name space for addtask
    app.addtask = {};
    // tab object
    app.addtask.createWindow = function(TaskId){
        var ImportanceLevel = 1;
        // create win (global)
        AddTaskWin = Ti.UI.createWindow({
            title:'タスクの追加',
            backgroundColor:'#fff'
        });
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

        // click importance mark
        ImportanceView1.addEventListener('click', function(e){
            ImportanceView1.backgroundColor = '#000';
            ImportanceView2.backgroundColor = '#999';
            ImportanceView3.backgroundColor = '#999';
            ImportanceLevel = 1;
        });
        ImportanceView2.addEventListener('click', function(e){
            ImportanceView1.backgroundColor = '#000';
            ImportanceView2.backgroundColor = '#000';
            ImportanceView3.backgroundColor = '#999';
            ImportanceLevel = 2;
        });
        ImportanceView3.addEventListener('click', function(e){
            ImportanceView1.backgroundColor = '#000';
            ImportanceView2.backgroundColor = '#000';
            ImportanceView3.backgroundColor = '#000';
            ImportanceLevel = 3;
        });

        // FORM(Memo)
        var MemoForm = Ti.UI.createTextArea({
            color: '#333333',
            height: '70dp',
            top: '150dp',
            left: '100dp',
            width: '200dp',
            borderWidth:2,
            borderColor:'#ccc',
            borderRadius:10
        });
        var MemoLabel = Ti.UI.createLabel({
            color:'#999',
            text: 'メモ',
            height: '30dp',
            top: '150dp',
            left: '20dp',
            width: '70dp',
        });

        // add button
        var SubmitButton = Ti.UI.createButton({
            title: '追加',
            top: '250dp',
            left: '120dp',
            width: '70dp',
            height: '30dp'
        });

        if (TaskId) {
            SubmitButton.title = '更新';
            var db = new TaskDB();
            task = db.fetchOne(TaskId);
            TaskNameForm.value = task.name;
            DeadLineForm.value = task.deadline;
            ImportanceLevel = task.importance;
            MemoForm.value = task.memo;

            if (ImportanceLevel >= 2) {
                ImportanceView2.backgroundColor = '#000';
            }
            if (ImportanceLevel == 3) {
                ImportanceView3.backgroundColor = '#000';
            }
        }

        SubmitButton.addEventListener('click', function(e){
            // add record into TaskDB
            var record = {};
            record.name = TaskNameForm.getValue();
            record.deadline = DeadLineForm.getValue().replace("/", "-") + ':00';
            record.importance = ImportanceLevel;
            record.memo = MemoForm.getValue();
            var db = new TaskDB();
            TaskId = db.insertTask(record);
            var TaskDetailWindow = app.taskdetail.createWindow('addtask', TaskId);
            AddTaskWin.title = "タスクの詳細";
            AddTaskWin.add(TaskDetailWindow);
        });

        // set label ＆ form
        AddTaskWin.add(TaskNameForm);
        AddTaskWin.add(TaskNameLabel);
        AddTaskWin.add(DeadLineForm);
        AddTaskWin.add(DeadLineLabel);
        AddTaskWin.add(DeadLineView);
        AddTaskWin.add(SubmitButton);
        AddTaskWin.add(ImportanceLabel);
        AddTaskWin.add(ImportanceView1);
        AddTaskWin.add(ImportanceView2);
        AddTaskWin.add(ImportanceView3);
        AddTaskWin.add(MemoForm);
        AddTaskWin.add(MemoLabel);

        optionPickerDialog.addEventListener('close', function(e){
                if (e.done==true && e.value){
                    var time = e.value;
                    Ti.API.info(typeof time);
                    var year = time.slice(11,15);
                    var month = ChangeMonth(time.slice(4,7));
                    var day = time.slice(8,10);
                    var hour = time.slice(16,21);
                    DeadLineForm.value = year + '/' + month + '/' + day + ' ' + hour;
                    Ti.API.info(DeadLineForm.value);
                }
            });
        DeadLineView.addEventListener('click', function()
        {
            optionPickerDialog.open();
        });

        return AddTaskWin;
    };
})();

function ChangeMonth (str) {
    if (str == 'Jan') return 1;
    if (str == 'Feb') return 2;
    if (str == 'Mar') return 3;
    if (str == 'Apr') return 4;
    if (str == 'May') return 5;
    if (str == 'Jun') return 6;
    if (str == 'Jul') return 7;
    if (str == 'Aug') return 8;
    if (str == 'Sep') return 9;
    if (str == 'Oct') return 10;
    if (str == 'Nov') return 11;
    if (str == 'Dec') return 12;
}