var day_detail = function(monthNum, dayNum, tab) {
	var con = Ti.Database.open('task');
	var dayDetail = Ti.UI.createWindow({
		title : dayNum + '日',
		backgroundColor : '#fff'
	});
	var tableView = Ti.UI.createTableView({
		backgroundColor : 'transparent',
		backgroundImage : 'back.jpg',
		separatorColor : '#000'
	});

	// その日のタスクを取得
	var rows = con.execute('SELECT name, passedtime, id FROM task WHERE endtime LIKE \'%-' + monthNum + '-' + dayNum + '%\';');
	while (rows.isValidRow()) {
		// Ti.API.info(jstrlen(rows.field(0)));
		var str = rows.field(0);
		if (jstrlen(rows.field(0)) > 60) {
			str = unescape(escape(rows.field(0)).slice(0, 60));
			str = str.concat('...');
		}
		var tableViewRow = Ti.UI.createTableViewRow({
			title : str,
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

function jstrlen(str) {
	len = 0;
	str = escape(str);
	for (i = 0; i < str.length; i++, len++) {
		if (str.charAt(i) == "%") {
			if (str.charAt(++i) == "u") {
				i += 3;
				len++;
			}
			i++;
		}
	}
	return len;
}