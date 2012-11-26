var past_task_detail = function(id) {
	var con = new TaskDB();

	var pastTaskDetail = Ti.UI.createWindow({
		title : 'タスク詳細',
		backgroundColor : '#fff'
	});
	
	// fetchOneとほぼ同じメソッド
	var task = con.fetchPastOne(id);

	// create view (global)
	TaskDetailView = Ti.UI.createView({
		backgroundColor : '#fff',
		width : '320dp',
		height : '400dp'
	});

	// Task Name
	var TaskNameLabel = Ti.UI.createLabel({
		color : '#999',
		text : 'タスク名',
		height : '30dp',
		top : '30dp',
		left : '20dp',
		width : '100dp',
	});

	var TaskName = Ti.UI.createLabel({
		color : '#000',
		text : task.name,
		height : '30dp',
		top : '80dp',
		textAlign : 'center',
		width : '120dp',
	});

	// DeadLine
	var DeadLineLabel = Ti.UI.createLabel({
		color : '#999',
		text : '締切日時',
		height : '30dp',
		top : '70dp',
		left : '20dp',
		width : '70dp',
	});

	var DeadLine = Ti.UI.createLabel({
		color : '#000',
		text : task.deadline.split('-').join('/'),
		height : '30dp',
		top : '120dp',
		textAlign : 'center',
		width : '200dp',
	});

	// Importance Level
	var ImportanceLabel = Ti.UI.createLabel({
		color : '#999',
		text : '重要度',
		height : '30dp',
		top : '110dp',
		left : '20dp',
		width : '70dp',
	});
	var ImportanceView1 = Ti.UI.createView({
		backgroundColor : '#000',
		height : '30dp',
		top : '160dp',
		left : '80dp',
		width : '30dp',
	});
	var ImportanceView2 = Ti.UI.createView({
		backgroundColor : '#999',
		height : '30dp',
		top : '160dp',
		left : '120dp',
		width : '30dp',
	});
	var ImportanceView3 = Ti.UI.createView({
		backgroundColor : '#999',
		height : '30dp',
		top : '160dp',
		left : '160dp',
		width : '30dp',
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
		color : '#999',
		text : 'メモ',
		height : '30dp',
		top : '150dp',
		left : '20dp',
		width : '70dp',
	});
	var Memo = Ti.UI.createLabel({
		color : '#000',
		text : task.memo,
		height : '30dp',
		top : '200dp',
		textAlign : 'center',
		width : '200dp',
	});

	var second = (task.passedtime) % 60;
	var minute = ((task.passedtime - second) % 3600) / 60;
	var hour = (task.passedtime - (minute * 60) - second) / 3600;
	if (second < 10) {
		second = '0' + second;
	}
	if (minute < 10) {
		minute = '0' + minute;
	}
	if (hour < 10) {
		hour = '0' + hour;
	}

	var passedTimeLabel = Ti.UI.createLabel({
		color : '#999',
		text : 'かかった時間',
		height : '30dp',
		top : '70dp',
		left : '20dp',
		width : '70dp',
	});

	var passedTime = Ti.UI.createLabel({
		color : '#000',
		text : hour + ':' + minute + ':' + second,
		height : '30dp',
		top : '230dp',
		textAlign : 'center',
		width : '200dp',
	});

	var endTimeLabel = Ti.UI.createLabel({
		color : '#999',
		text : '終了日時',
		height : '30dp',
		top : '70dp',
		left : '20dp',
		width : '70dp',
	});

	var endTime = Ti.UI.createLabel({
		color : '#000',
		text : task.endtime.split('-').join('/'),
		height : '30dp',
		top : '260dp',
		textAlign : 'center',
		width : '200dp',
	});

	// set label ＆ form
	TaskDetailView.add(TaskName);
	TaskDetailView.add(DeadLine);
	TaskDetailView.add(ImportanceView1);
	TaskDetailView.add(ImportanceView2);
	TaskDetailView.add(ImportanceView3);
	TaskDetailView.add(Memo);
	TaskDetailView.add(passedTime);
	TaskDetailView.add(endTime);
	pastTaskDetail.add(TaskDetailView);
	return pastTaskDetail;
};
