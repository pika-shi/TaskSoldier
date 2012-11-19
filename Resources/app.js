// name space
var app = {};

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// log
Titanium.include('./include/log.js');
// tasklist
Titanium.include('./include/tasklist.js');
// config
Titanium.include('./include/config.js');

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
