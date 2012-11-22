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
Titanium.include('./include/taskdatail.js');
// tasklist
Titanium.include('./include/tasklist.js');
// config
Titanium.include('./include/config.js');
// db
Titanium.include('./include/db.js');

// call objects
var LogTab = app.log.createTab();
var TaskListTab = app.tasklist.createTab();
var ConfigTab = app.config.createTab();

// add tabs
tabGroup.addTab(LogTab);
tabGroup.addTab(TaskListTab);
tabGroup.addTab(ConfigTab);

// open tab group
tabGroup.open();