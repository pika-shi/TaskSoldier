(function() {
	// name space for taskdetail
	app.taskdetail = {};
	// tab object
	app.taskdetail.createWindow = function(from, TaskId) {
		// get record from DB
		var db = new TaskDB();
		task = db.fetchOne(TaskId);
		// create win
		var win = Ti.UI.createWindow({
			title : 'タスクの詳細',
			backgroundColor : '#fff',
			barColor : '#B0C4DE'
		});

		// create view (global)
		TaskDetailView = Ti.UI.createImageView({
			image : './back.jpg',
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
			},
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

		// add button
		var EditButton = Ti.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.COMPOSE
		});

		var TimerButton = Ti.UI.createButton({
			title : '開始',
			top : '300dp',
			width : 100,
			height : 40
		});

		EditButton.addEventListener('click', function(e) {
			// add record into TaskDB
			var addTaskWin = app.addtask.createWindow(TaskId);
			addTaskWin.title = "タスクの編集";
			tab.open(addTaskWin);
		});

		TimerButton.addEventListener('click', function(e) {
			// add record into TaskDB
			var TimerWindow = app.timer.createWindow(TaskId, win);
			TimerWindow.open();
		});

		// set label ＆ form
		TaskDetailView.add(TaskView);
		TaskDetailView.add(TaskName);
		TaskDetailView.add(DeadLine);
		TaskDetailView.add(ImportanceView1);
		TaskDetailView.add(ImportanceView2);
		TaskDetailView.add(ImportanceView3);
		TaskDetailView.add(Memo);
		if (from == 'tasklist') {
			win.setRightNavButton(EditButton);
			TaskDetailView.add(TimerButton);
		}
		win.add(TaskDetailView);

		return win;
	};
})();
