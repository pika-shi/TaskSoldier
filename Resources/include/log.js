(function() {
	// name space for log
	app.log = {};
	// tab object
	app.log.createTab = function() {
		TaskDB();
		var con = Titanium.Database.open('task');

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
		// var buttonView = Ti.UI.createView({
		// top : 0,
		// height : 44,
		// backgroundColor : '#800'
		// });
		var yearlyGraphView = Ti.UI.createView({
			backgroundColor : '#009'
		});
		// var monthlyGraphView = Ti.UI.createView({
		// top : 44,
		// backgroundColor : '#500'
		// });
		// var yearlyListView = Ti.UI.createView({
		// top : 44,
		// backgroundColor : '#099'
		// });
		// var monthlyListView = Ti.UI.createView({
		// top : 44,
		// backgroundColor : '#550'
		// });
		// var graphButton = Ti.UI.createButton({
		// title : '集中時間',
		// left : 10,
		// height : 30
		// });
		// var listButton = Ti.UI.createButton({
		// title : 'これまでのタスク',
		// right : 10,
		// height : 30
		// });
		// buttonView.add(graphButton);
		// buttonView.add(listButton);
		// win.add(buttonView);
		win.add(yearlyGraphView);

		// graphButton.addEventListener('click', function(e) {
		// win.remove(yearlyListView);
		// win.add(yearlyGraphView);
		// });
		// listButton.addEventListener('click', function(e) {
		// win.remove(yearlyGraphView);
		// win.add(yearlyListView);
		// });

		var monthName = '';
		var date = new Date();
		var mon = date.getMonth() + 1;
		var tableView = Ti.UI.createTableView();
		yearlyGraphView.add(tableView);

		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク1', '2012-12-25 00:00:00', 3, 'メモ1', 3000, '2012-11-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク2', '2012-12-25 00:00:00', 2, 'メモ2', 2000, '2012-10-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク3', '2012-12-25 00:00:00', 1, 'メモ3', 1000, '2012-09-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク4', '2012-12-25 00:00:00', 3, 'メモ4', 9000, '2012-08-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク5', '2012-12-25 00:00:00', 2, 'メモ5', 1000, '2012-07-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク6', '2012-12-25 00:00:00', 1, 'メモ6', 4000, '2012-06-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク7', '2012-12-25 00:00:00', 3, 'メモ7', 5000, '2012-05-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク8', '2012-12-25 00:00:00', 2, 'メモ8', 6000, '2012-04-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク9', '2012-12-25 00:00:00', 1, 'メモ9', 3500, '2012-03-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク10', '2012-12-25 00:00:00', 3, 'メモ10', 3600, '2012-02-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク11', '2012-12-25 00:00:00', 2, 'メモ11', 3700, '2012-01-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク12', '2012-12-25 00:00:00', 1, 'メモ12', 1000, '2011-12-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク13', '2012-12-25 00:00:00', 3, 'メモ13', 12000, '2012-11-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク14', '2012-12-25 00:00:00', 2, 'メモ14', 3090, '2012-10-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク15', '2012-12-25 00:00:00', 1, 'メモ15', 3000, '2012-09-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク16', '2012-12-25 00:00:00', 3, 'メモ16', 3000, '2012-08-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク17', '2012-12-25 00:00:00', 2, 'メモ17', 3000, '2012-07-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク18', '2012-12-25 00:00:00', 1, 'メモ18', 3000, '2012-06-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク19', '2012-12-25 00:00:00', 3, 'メモ19', 3090, '2012-05-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク20', '2012-12-25 00:00:00', 2, 'メモ20', 3000, '2012-04-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク21', '2012-12-25 00:00:00', 1, 'メモ21', 3000, '2012-03-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク22', '2012-12-25 00:00:00', 3, 'メモ22', 3000, '2012-02-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク23', '2012-12-25 00:00:00', 2, 'メモ23', 3090, '2012-01-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク24', '2012-12-25 00:00:00', 1, 'メモ24', 3000, '2011-12-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク25', '2012-12-25 00:00:00', 3, 'メモ25', 3000, '2012-11-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク26', '2012-12-25 00:00:00', 2, 'メモ26', 800, '2012-10-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク27', '2012-12-25 00:00:00', 1, 'メモ27', 3000, '2012-09-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク28', '2012-12-25 00:00:00', 3, 'メモ28', 300, '2012-08-02 00:00:00', 1);
		// con.execute('INSERT INTO task (name, deadline, importance, memo, passedtime, endtime, endflag)' + 'VALUES(?, ?, ?, ?, ?, ?, ?)', 'タスク29', '2012-12-25 00:00:00', 2, 'メモ29', 3008, '2012-07-02 00:00:00', 1);

		// var rows = con.execute('SELECT total(passedtime) FROM task WHERE endtime LIKE \'%-' + mon + '-%\';');
		// while (rows.isValidRow()) {
		// Ti.API.info('TOTAL: ' + rows.field(0));
		// rows.next();
		// }

		for (var i = 0; i < 12; i++) {
			if (i == 0) {
				mon = date.getMonth() + 1;
			} else if (mon == 1) {
				mon = 12;
			} else {
				mon = mon - 1;
			}

			if (mon < 10) {
				mon = "0" + mon;
			}
			monthName = mon + '月';
			var tableViewRow = Ti.UI.createTableViewRow({
				title : monthName,
				height : 44,
				monthNum : mon
			});
			var rows = con.execute('SELECT total(passedtime) FROM task WHERE endtime LIKE \'%-' + mon + '-%\';');
			// Ti.API.info(monthName);
			var second = (rows.field(0)) % 60;
			var minute = ((rows.field(0) - second) % 3600) / 60;
			var hour = (rows.field(0) - (minute * 60) - second) / 3600;
			if (second < 10) {
				second = '0' + second;
			}
			if (minute < 10) {
				minute = '0' + minute;
			}
			if (hour < 10) {
				hour = '0' + hour;
			}
			// Ti.API.info(hour + ':' + minute + ':' + second);
			var length;
			if (rows.field(0) > 360000) {
				length = 360000;
			} else {
				length = rows.field(0);
			}
			var graphView = Ti.UI.createView({
				height : 20,
				width : (length / 360000) * 150,
				left : 70,
				backgroundColor : '#228b22'
			});
			var timeLabel = Ti.UI.createLabel({
				text : hour + ':' + minute + ':' + second,
				right : 10
			});
			tableViewRow.add(graphView);
			tableViewRow.add(timeLabel);
			tableView.appendRow(tableViewRow);
		}

		Ti.include('./include/monthDetail.js');
		tableView.addEventListener('click', function(e) {
			// Ti.API.info(e.row.monthNum);
			// pika_shi(e.row.monthNum, tab);
			tab.open(pika_shi(e.row.monthNum, tab));
		});
		// Ti.API.info(mon);
		// var webView = Ti.UI.createWebView({
		// url : 'plot.html'
		// });
		// yearlyGraphView.add(webView);

		rows.close();
		con.close();
		return tab;
	};

})();
