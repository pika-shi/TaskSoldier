(function() {
	// name space for log
	app.log = {};
	// tab object
	app.log.createTab = function() {
		TaskDB();
		// create win
		var win = Titanium.UI.createWindow({
			title : 'ログ',
			backgroundColor : '#fff'
		});
		// create tab
		var tab = Titanium.UI.createTab({
			icon : 'KS_nav_ui.png',
			title : 'ログ',
			window : win
		});
		var buttonView = Ti.UI.createView({
			top : 0,
			height : 46,
			backgroundColor : '#070'
		});
		var yearlyGraphView = Ti.UI.createView({
			top : 46,
			backgroundColor : '#009'
		});
		var monthlyGraphView = Ti.UI.createView({
			top : 46,
			backgroundColor : '#500'
		});
		var yearlyListView = Ti.UI.createView({
			top : 46,
			backgroundColor : '#099'
		});
		var monthlyListView = Ti.UI.createView({
			top : 46,
			backgroundColor : '#550'
		});
		var graphButton = Ti.UI.createButton({
			title : '集中時間',
			left : 10,
			height : 30
		});
		var listButton = Ti.UI.createButton({
			title : 'これまでのタスク',
			right : 10,
			height : 30
		});
		buttonView.add(graphButton);
		buttonView.add(listButton);
		win.add(buttonView);
		win.add(yearlyGraphView);
		graphButton.addEventListener('click', function(e) {
			win.remove(yearlyListView);
			win.add(yearlyGraphView);
		});
		listButton.addEventListener('click', function(e) {
			win.remove(yearlyGraphView);
			win.add(yearlyListView);
		});
		var webView = Ti.UI.createWebView({
			url : 'plot.html'
		});
		yearlyGraphView.add(webView);

		// var con = Titanium.Database.open('task');
		// con.execute('INSERT INTO task (name, deadline, priority, memo, passedtime, endtime, endflag)' +
		// 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク2', '2012-11-30 18:50:00', 3, 'サーバー修理', +
		// '00:50:30', '2012-11-20 23:59:59', 1);
		var rows = con.execute('SELECT * FROM task');
		while (rows.isValidRow()) {
			Ti.API.info('ID: ' + rows.field(0) + ', NAME: ' + rows.fieldByName('name'));
			rows.next();
		}
		rows.close();
		// con.close();
		return tab;
	};

})();
