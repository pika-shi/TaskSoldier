var pika_shi = function(monthNum, tab) {
	var con = Ti.Database.open('task');
	// var con = Titanium.Database.open('task');
	var date = new Date();
	var year = date.getYear();
	if (year < 2000) {
		year += 1900;
	}
	var month = date.getMonth() + 1;
	if (monthNum > month) {
		year -= 1;
	}
	// Ti.API.info('year:' + year + ', month:' + monthNum);
	// Ti.API.info(rows.field(0) + ', ' + rows.field(1));
	// while (rows.isValidRow()) {
	// Ti.API.info(rows.field(0) + ', ' + rows.field(1));
	// rows.next();
	// }
	var monthDetail = Ti.UI.createWindow({
		title : '詳細',
		backgroundColor : '#fff'
	});
	// Ti.API.info('hoge1');
	var tableView = Ti.UI.createTableView();
	// Ti.API.info('hoge2');

	for (var i = myzac(year, monthNum); i > 0; i--) {
		// Ti.API.info('hoge3');
		var date;
		if (i < 10) {
			date = '0' + i;
		} else {
			date = i;
		}
		var tableViewRow = Ti.UI.createTableViewRow({
			title : date + '日',
			height : 44,
			dayNum : date
		});
		var rows = con.execute('SELECT total(passedtime) FROM task WHERE endtime LIKE \'%-' + monthNum + '-' + date + '%\';');
		// while (rows.isValidRow()) {
		// Ti.API.info(rows.field(0));
		// rows.next();
		// }
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
		if (rows.field(0) > 18000) {
			length = 18000;
		} else {
			length = rows.field(0);
		}
		var graphView = Ti.UI.createView({
			height : 20,
			width : (length / 18000) * 150,
			left : 70,
			backgroundColor : '#228b22'
		});
		var timeLabel = Ti.UI.createLabel({
			text : hour + ':' + minute + ':' + second,
			right : 10
		});
		tableViewRow.add(graphView);
		tableViewRow.add(timeLabel);
		if (rows.field(0) != 0) {
			tableView.appendRow(tableViewRow);
		}
	}

	Ti.include('./include/dayDetail.js');
	tableView.addEventListener('click', function(e) {
		// Ti.API.info(e.row.monthNum);
		// pika_shi(e.row.monthNum, tab);
		tab.open(day_detail(monthNum, e.row.dayNum, tab));
	});
	// Ti.API.info('hoge4');
	// var dLabel = Ti.UI.createLabel({
	// text : monthNum
	// });
	// monthDetail.add(dLabel);
	monthDetail.add(tableView);

	// Ti.API.info('hoge5');
	// tab.open(monthDetail);
	return monthDetail;
};

/**
 * 年月を指定して月末日を求める関数
 * year 年
 * month 月
 */
var myzac = function(year, month) {
	//日付を0にすると前月の末日を指定したことになります
	//指定月の翌月の0日を取得して末日を求めます
	//そのため、ここでは month - 1 は行いません
	var dt = new Date(year, month, 0);
	return dt.getDate();
};
