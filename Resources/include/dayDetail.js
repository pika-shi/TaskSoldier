var day_detail = function(monthNum, dayNum, tab) {
	var con = Ti.Database.open('task');
	var dayDetail = Ti.UI.createWindow({
		title : dayNum + '日',
		backgroundColor : '#fff',
		barColor : '#B0C4DE'
	});
	var tableView = Ti.UI.createTableView({
		backgroundColor : 'transparent',
		backgroundImage : 'back.jpg',
		separatorColor : '#ccc'
	});

	// その日のタスクを取得
	var rows = con.execute('SELECT name, passedtime, id FROM task WHERE endtime LIKE \'%-' + monthNum + '-' + dayNum + '%\';');
	while (rows.isValidRow()) {
		var str = rows.field(0);
		var titleLabel = Ti.UI.createLabel({
			text : str,
			left : 10,
			width : 220,
			height : 40,
			font : {
				fontSize : 20,
				fontWeight : 'bold'
			}
		});

		var tableViewRow = Ti.UI.createTableViewRow({
			height : 44,
			id : rows.field(2)
		});
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
		tableViewRow.add(titleLabel);
		tableViewRow.add(timeLabel);
		tableView.appendRow(tableViewRow);
		rows.next();
	}

	Ti.include('./include/pastTaskDetail.js');
	tableView.addEventListener('click', function(e) {
		tab.open(past_task_detail(e.row.id));
	});

	dayDetail.add(tableView);

	return dayDetail;
}; 