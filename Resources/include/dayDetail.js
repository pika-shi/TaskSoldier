var day_detail = function(monthNum, dayNum, tab) {
	var con = Ti.Database.open('task');
	// var con = Titanium.Database.open('task');
	// var date = new Date();
	// var year = date.getYear();
	// if (year < 2000) {
	// year += 1900;
	// }
	// var month = date.getMonth() + 1;
	// if (monthNum > month) {
	// year -= 1;
	// }
	// Ti.API.info('year:' + year + ', month:' + monthNum);
	// Ti.API.info(rows.field(0) + ', ' + rows.field(1));
	// while (rows.isValidRow()) {
	// Ti.API.info(rows.field(0) + ', ' + rows.field(1));
	// rows.next();
	// }
	var dayDetail = Ti.UI.createWindow({
		title : '詳細',
		backgroundColor : '#fff'
	});
	// Ti.API.info('hoge1');
	var tableView = Ti.UI.createTableView();
	// Ti.API.info('hoge2');
	var rows = con.execute('SELECT name, passedtime, id FROM task WHERE endtime LIKE \'%-' + monthNum + '-' + dayNum + '%\';');
	while (rows.isValidRow()) {
		var tableViewRow = Ti.UI.createTableViewRow({
			title : rows.field(0),
			height : 44,
			id : rows.field(2)
		});
		// tableViewRow.title = rows.field(0);
		var second = (rows.field(1)) % 60;
		var minute = ((rows.field(1) - second) % 3600) / 60;
		var hour = (rows.field(1) - (minute * 60) - second) / 3600;
		if (second < 10) {
			second = '0' + second;
		}
		if (minute < 10) {
			minute = '0' + minute;
		}
		if (hour < 10) {
			hour = '0' + hour;
		}
		var timeLabel = Ti.UI.createLabel({
			text : hour + ':' + minute + ':' + second,
			right : 10
		});
		tableViewRow.add(timeLabel);
		tableView.appendRow(tableViewRow);
		rows.next();
	}

	Ti.include('./include/pastTaskDetail.js');
	tableView.addEventListener('click', function(e) {
		tab.open(past_task_detail(e.row.id));
	});

	// Ti.include('./include/dayDetail.js');
	// tableView.addEventListener('click', function(e) {
	// tab.open(pika_shi(monthNum, e.row.dayNum));
	// });
	// Ti.API.info('hoge4');
	// var dLabel = Ti.UI.createLabel({
	// text : monthNum
	// });
	// monthDetail.add(dLabel);
	dayDetail.add(tableView);

	// Ti.API.info('hoge5');
	// tab.open(monthDetail);
	return dayDetail;
};
