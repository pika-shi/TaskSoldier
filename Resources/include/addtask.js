(function(){
    Titanium.include('optionPickerDialog.js');
    // name space for addtask
    app.addtask = {};
    // tab object
    app.addtask.createWindow = function(TaskId){
        var ImportanceLevel = 1;
        if (typeof(AddTaskWin) == "undefined"){
            // create win (global)
            AddTaskWin = Ti.UI.createWindow({
                title:'タスクの追加',
                backgroundColor:'#fff',
                barColor: '#87CEEB'
            });
        }

        var ScrollView = Titanium.UI.createScrollView({
                contentWidth:'320dp',
                contentHeight:'400dp',
                top:0,
                bottom: 0,
                showVerticalScrollIndicator:true,
        });

        var BackGroundView = Ti.UI.createImageView({
                image: './back.jpg',
        });

        // FORM (Task Name)
        var TaskNameForm = Ti.UI.createTextField({
            color: '#333333',
            height: '30dp',
            top: '45dp',
            left: '30dp',
            width: '260dp',
            borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        var TaskNameView = Ti.UI.createImageView({
            image: './text.png',
            height: '45dp',
            top: '40dp',
            left: '0dp',
            //width: '260dp',
            borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        var TaskNameLabel = Ti.UI.createLabel({
            color:'#666',
            text: 'タスク名',
            height: '30dp',
            top: '10dp',
            left: '20dp',
            width: '70dp',
        });
        // FORM (DeadLine)
        var DeadLineForm = Ti.UI.createTextField({
            color: '#333333',
            height: '30dp',
            top: '115dp',
            left: '30dp',
            width: '260dp',
            borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        });
        var DeadLineLabel = Ti.UI.createLabel({
            color:'#666',
            text: '締切日時',
            height: '30dp',
            top: '80dp',
            left: '20dp',
            width: '70dp',
        });
        var DeadLineView = Ti.UI.createView({
            bacegroundColor: '#fff',
            height: '30dp',
            top: '115dp',
            left: '30dp',
            width: '260dp',
        });

        // Importance Level
        var ImportanceLabel = Ti.UI.createLabel({
            color:'#666',
            text: '重要度',
            height: '30dp',
            top: '150dp',
            left: '20dp',
            width: '70dp',
        });
        var ImportanceView1 = Ti.UI.createImageView({
            image: 'star_on.png',
            height: '30dp',
            top: '180dp',
            left: '80dp',
            width: '30dp',
        });
        var ImportanceView2 = Ti.UI.createImageView({
            image: 'star_off.png',
            height: '30dp',
            top: '180dp',
            left: '140dp',
            width: '30dp',
        });
        var ImportanceView3 = Ti.UI.createImageView({
            image: 'star_off.png',
            height: '30dp',
            top: '180dp',
            left: '200dp',
            width: '30dp',
        });

        // click importance mark
        ImportanceView1.addEventListener('click', function(e){
            ImportanceView2.image = 'star_off.png';
            ImportanceView3.image = 'star_off.png';
            ImportanceLevel = 1;
        });
        ImportanceView2.addEventListener('click', function(e){
            ImportanceView2.image = 'star_on.png';
            ImportanceView3.image = 'star_off.png';
            ImportanceLevel = 2;
        });
        ImportanceView3.addEventListener('click', function(e){
            ImportanceView2.image = 'star_on.png';
            ImportanceView3.image = 'star_on.png';
            ImportanceLevel = 3;
        });

        // FORM(Memo)
        var MemoForm = Ti.UI.createTextArea({
            color: '#333333',
            height: '70dp',
            top: '245dp',
            left: '30dp',
            width: '260dp',
            borderWidth:2,
            borderColor:'#ccc',
            borderRadius:10
        });
        var MemoLabel = Ti.UI.createLabel({
            color:'#666',
            text: 'メモ',
            height: '30dp',
            top: '210dp',
            left: '20dp',
            width: '70dp',
        });

        // add button
        var SubmitButton = Ti.UI.createButton({
            backgroundImage:'add.png',
            top: '325dp',
            left: '85dp',
            width: '150dp',
            height: '50dp'
        });

        if (TaskId) {
            SubmitButton.backgroundImage = 'upload.png';
            var db = new TaskDB();
            task = db.fetchOne(TaskId);
            TaskNameForm.value = task.name;
            DeadLineForm.value = task.deadline.split('-').join('/').slice(0, 16);
            ImportanceLevel = task.importance;
            MemoForm.value = task.memo;

            if (ImportanceLevel >= 2) {
                ImportanceView2.image = 'star_on.png';
                ImportanceView2.width = '30dp';
                ImportanceView2.height = '30dp';
            }
            if (ImportanceLevel == 3) {
                ImportanceView3.image = 'star_on.png';
                ImportanceView3.width = '30dp';
                ImportanceView3.height = '30dp';
            }
        }

        SubmitButton.addEventListener('click', function(e){
            if (TaskNameForm.getValue() && DeadLineForm.getValue()) {
                // add record into TaskDB
                var record = {};
                record.name = TaskNameForm.getValue();
                record.deadline = DeadLineForm.getValue().split('/').join('-') + ':00';
                record.importance = ImportanceLevel;
                record.memo = MemoForm.getValue();
                // Get Current Time
                var now = new Date();
                var year = now.getYear();
                var month = now.getMonth() + 1;
                var day = now.getDate();
                var hour = now.getHours();
                var min = now.getMinutes();
                var sec = now.getSeconds();
                if(year < 2000) { year += 1900; }
                if(month < 10) { month = "0" + month; }
                if(day < 10) { day = "0" + day; }
                if(hour < 10) { hour = "0" + hour; }
                if(min < 10) { min = "0" + min; }
                if(sec < 10) { sec = "0" + sec; }
                var CurrentTime = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
                if (CurrentTime > record.deadline) {
                    Titanium.UI.createAlertDialog({
                    title:'Alert',
                    message:'締切日時がもう過ぎています'
                    }).show();
                    // break;
                }
                var AddTaskFlag = 0;
                var db = new TaskDB();
                if (TaskId) {
                    db.updateTask(TaskId, record);
                } else {
                    TaskId = db.insertTask(record);
                    AddTaskFlag = 1;
                }
                var TaskDetailWindow = app.taskdetail.createWindow('addtask', TaskId);
                AddTaskWin.title = "タスクの詳細";
                AddTaskWin.add(TaskDetailWindow);
                if (AddTaskFlag == 0) {
                    Titanium.UI.createAlertDialog({
                        title:'タスクを更新しました',
                    }).show();
                } else {
                    Titanium.UI.createAlertDialog({
                        title:'タスクを追加しました',
                    }).show();
                }
            } else if (!TaskNameForm.getValue()) {
                Titanium.UI.createAlertDialog({
                    title:'Alert',
                    message:'タスク名が未入力です'
                }).show();
            } else {
                Titanium.UI.createAlertDialog({
                    title:'Alert',
                    message:'締切日時が未入力です'
                }).show();
            }
        });

        // set label ＆ form
        AddTaskWin.add(BackGroundView);
        ScrollView.add(TaskNameForm);
        ScrollView.add(TaskNameLabel);
        //ScrollView.add(TaskNameView);
        ScrollView.add(DeadLineForm);
        ScrollView.add(DeadLineLabel);
        ScrollView.add(DeadLineView);
        ScrollView.add(SubmitButton);
        ScrollView.add(ImportanceLabel);
        ScrollView.add(ImportanceView1);
        ScrollView.add(ImportanceView2);
        ScrollView.add(ImportanceView3);
        ScrollView.add(MemoForm);
        ScrollView.add(MemoLabel);
        AddTaskWin.add(ScrollView);

        optionPickerDialog.addEventListener('close', function(e){
                if (e.done==true && e.value){
                    var time = e.value;
                    var year = time.slice(11,15);
                    var month = ChangeMonth(time.slice(4,7));
                    var day = time.slice(8,10);
                    var hour = time.slice(16,21);
                    DeadLineForm.value = year + '/' + month + '/' + day + ' ' + hour;
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