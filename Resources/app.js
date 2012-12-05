// name space
var app = {};

// connect database
con = Titanium.Database.open('task');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

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
        barColor: '#87CEEB'
});
// create tab
var logTab2 = Titanium.UI.createTab({
	icon : 'log.png',
	title : 'ログ',
	window : logWin
});

var logView = {};
logView = app.log.createView(logTab2);
logWin.add(logView);

// add tabs
tabGroup.addTab(TaskListTab);
tabGroup.addTab(logTab2);
tabGroup.addTab(ConfigTab);
tabGroup.addEventListener('focus', function(e) {
	if (e.index == 1) {
		logWin.remove(logView);
		logView = app.log.createView(logTab2);
		logWin.add(logView);
	}
});

// open tab group
tabGroup.open();