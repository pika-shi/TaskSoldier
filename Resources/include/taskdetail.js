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
			backgroundColor : '#fff'
		});

		// create view (global)
		TaskDetailView = Ti.UI.createImageView({
			image : './back.jpg',
			width : '500dp',
		});

		var TaskView = Ti.UI.createImageView({
			image : './detail.png',
			top : '40dp',
			left : '-20dp',
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
			},
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
			top : '200dp',
			textAlign : 'center',
			width : '180dp',
		});

		// add button
		var EditButton = Ti.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.COMPOSE
		});

		var TimerButton = Ti.UI.createButton({
			title : 'タイマー',
			top : '320dp',
			left : '200dp',
			width : '70dp',
			height : '30dp'
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
		//TaskDetailView.add(TaskNameLabel);
		TaskDetailView.add(TaskView);
		TaskDetailView.add(TaskName);
		//TaskDetailView.add(DeadLineLabel);
		TaskDetailView.add(DeadLine);
		//TaskDetailView.add(ImportanceLabel);
		TaskDetailView.add(ImportanceView1);
		TaskDetailView.add(ImportanceView2);
		TaskDetailView.add(ImportanceView3);
		//TaskDetailView.add(MemoLabel);
		TaskDetailView.add(Memo);
		if (from == 'tasklist')
			win.setRightNavButton(EditButton);
		TaskDetailView.add(TimerButton);
		win.add(TaskDetailView);

		return win;
	};
})(); 