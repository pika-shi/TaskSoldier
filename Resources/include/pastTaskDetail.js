var past_task_detail = function(id) {
	var con = new TaskDB();

	var pastTaskDetail = Ti.UI.createWindow({
		title : 'タスク詳細',
		backgroundColor : 'transparent',
		backgroundImage : 'back.jpg'
	});

	// fetchOneとほぼ同じメソッド
	var task = con.fetchPastOne(id);

	// create view (global)
	TaskDetailView = Ti.UI.createImageView();

	var TaskView = Ti.UI.createImageView({
		image : './detail.png',
		top : '40dp',
		height : '250dp'
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
		height : '60dp',
		top : '90dp',
		textAlign : 'center',
		width : '180dp',
		font : {
			fontSize : 20
		}
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
		text : task.deadline.split('-').join('/').slice(0, 16) + ' まで',
		height : '35dp',
		top : '145dp',
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
	var ImportanceView1 = Ti.UI.createImageView({
		image : './star_on.png',
		height : '30dp',
		top : '180dp',
		left : '190dp',
		width : '30dp',
	});
	var ImportanceView2 = Ti.UI.createImageView({
		image : './star_off.png',
		height : '33dp',
		top : '180dp',
		left : '230dp',
		width : '33dp',
	});
	var ImportanceView3 = Ti.UI.createImageView({
		image : './star_off.png',
		height : '33dp',
		top : '180dp',
		left : '270dp',
		width : '33dp',
	});

	if (task.importance == 2) {
		ImportanceView2.image = './star_on.png';
		ImportanceView2.height = '33dp';
		ImportanceView2.width = '33dp';
	}
	if (task.importance == 3) {
		ImportanceView2.image = './star_on.png';
		ImportanceView2.height = '33dp';
		ImportanceView2.width = '33dp';
		ImportanceView3.image = './star_on.png';
		ImportanceView3.height = '33dp';
		ImportanceView3.width = '33dp';
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
		height : '90dp',
		top : '180dp',
		textAlign : 'center',
		width : '180dp',
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
	TaskDetailView.add(TaskView);
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