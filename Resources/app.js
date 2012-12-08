// name space
var app = {};

// connect database
con = Titanium.Database.open('task');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// background service for notification
var service = Titanium.App.iOS.registerBackgroundService({
	url : './include/notification.js'
});

// log
Titanium.include('./include/log.js');
// addtask
Titanium.include('./include/addtask.js');
// taskdetail
Titanium.include('./include/taskdetail.js');
// tasklist
Titanium.include('./include/tasklist.js');
// timer
Titanium.include('./include/timer.js');
// config
Titanium.include('./include/config.js');
// db
Titanium.include('./include/db.js');

// call objects
// var LogTab = app.log.createTab();
var TaskListTab = app.tasklist.createTab();
var ConfigTab = app.config.createTab();

// create win
var logWin = Titanium.UI.createWindow({
	title : 'ログ',
    barColor: '#B0C4DE',
    backgroundImage : 'back2.jpg'
});
// create tab
var logTab = Titanium.UI.createTab({
	icon : 'log.png',
	title : 'ログ',
	window : logWin
});

var logView = {};
logView = app.log.createView(logTab);
logWin.add(logView);

// add tabs
tabGroup.addTab(TaskListTab);
tabGroup.addTab(logTab);
tabGroup.addTab(ConfigTab);
tabGroup.addEventListener('focus', function(e) {
	if (e.index == 1) {
		logWin.remove(logView);
		logView = app.log.createView(logTab);
		logWin.add(logView);
	}
});

// open tab group
tabGroup.open();
