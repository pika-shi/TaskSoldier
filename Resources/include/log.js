(function() {
	// name space for log
	app.log = {};

	app.log.createView = function(tab) {
		var con = Titanium.Database.open('task');

		// create view
		var yearlyGraphView = Ti.UI.createView();

		// 月
		var monthName = '';
		var date = new Date();
		var year = date.getYear() + 1900;
		var previousYear = year - 1;
		var mon = date.getMonth() + 1;
		var tableView = Ti.UI.createTableView({
			backgroundColor : 'transparent',
			backgroundImage : 'back.jpg',
			separatorColor : '#000'
		});
		yearlyGraphView.add(tableView);
		con.execute('DELETE FROM task WHERE endtime LIKE ' + '\'' + previousYear + '-' + mon + '-%\' AND EXISTS(SELECT * FROM task WHERE endtime LIKE ' + '\'' + previousYear + '-' + mon + '-%\');');

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

			// 月の合計集中時間を取得
			var rows = con.execute('SELECT total(passedtime) FROM task WHERE endtime LIKE \'%-' + mon + '-%\';');

			// 秒表示を整形
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
			var length;
			if (rows.field(0) > 180000) {
				length = 180000;
			} else {
				length = rows.field(0);
			}

			// 最長のグラフに白いグラフを重ねて集中時間を表現
			var graphView = Ti.UI.createView({
				height : 20,
				width : (length / 180000) * 150,
				left : 70,
				backgroundColor : '#228b22'
			});
			var timeLabel = Ti.UI.createLabel({
				text : hour + ':' + minute + ':' + second,
				right : '10dp'
			});
			tableViewRow.add(graphView);
			tableViewRow.add(timeLabel);
			tableView.appendRow(tableViewRow);
		}

		Ti.include('./include/monthDetail.js');
		tableView.addEventListener('click', function(e) {
			tab.open(pika_shi(e.row.monthNum, tab));
		});

		rows.close();
		con.close();
		return yearlyGraphView;
	};
})(); 