var past_task_detail = function(id) {
	var con = new TaskDB();

	var pastTaskDetail = Ti.UI.createWindow({
		title : 'タスク詳細',
		backgroundColor : 'transparent',
		backgroundImage : 'back.jpg',
		barColor : '#B0C4DE'
	});

	// fetchOneとほぼ同じメソッド
	var task = con.fetchPastOne(id);

	// create view (global)
	TaskDetailView = Ti.UI.createImageView({
		image : 'back.jpg'
	});

	var TaskView = Ti.UI.createImageView({
		image : 'config_ver2.png',
		top : '15dp',
		height : 280,
		width : 280
	});

	// Task Name
	var TaskName = Ti.UI.createLabel({
		color : '#000',
		text : task.name,
		height : '60dp',
		top : '28dp',
		textAlign : 'center',
		width : '180dp',
		font : {
			fontSize : 20
		}
	});

	// DeadLine
	var DeadLine = Ti.UI.createLabel({
		color : '#000',
		text : task.deadline.split('-').join('/').slice(0, 15) + ' まで',
		height : '30dp',
		top : '85dp',
		textAlign : 'center',
		width : '200dp',
	});

	// Importance Level
	var ImportanceView1 = Ti.UI.createImageView({
		image : './star_on.png',
		height : '30dp',
		top : '115dp',
		left : '105dp',
		width : '30dp',
	});
	var ImportanceView2 = Ti.UI.createImageView({
		image : './star_off.png',
		height : '30dp',
		top : '115dp',
		left : '145dp',
		width : '30dp',
	});
	var ImportanceView3 = Ti.UI.createImageView({
		image : './star_off.png',
		height : '30dp',
		top : '115dp',
		left : '185dp',
		width : '30dp',
	});

	if (task.importance == 2) {
		ImportanceView2.image = './star_on.png';
	}
	if (task.importance == 3) {
		ImportanceView2.image = './star_on.png';
		ImportanceView3.image = './star_on.png';
	}

	// memo
	var Memo = Ti.UI.createLabel({
		color : '#000',
		text : task.memo,
		height : '70dp',
		top : '150dp',
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

	var passedTime = Ti.UI.createLabel({
		color : '#000',
		text : hour + ':' + minute + ':' + second,
		height : '30dp',
		top : '220dp',
		textAlign : 'center',
		width : '200dp',
	});

	var endTime = Ti.UI.createLabel({
		color : '#000',
		text : task.endtime.split('-').join('/'),
		height : '30dp',
		top : '250dp',
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
