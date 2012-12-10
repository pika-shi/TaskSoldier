
Titanium.include('./db.js');
var db = new TaskDB();

function subDate(rec) {
	// record deadline
	var tmp = rec.deadline.split('-');
	var rYear = tmp[0];
	var rMonth = tmp[1];
	var rDay = tmp[2].split(' ')[0];
	var tmp2 = tmp[2].split(' ')[1].split(':');
	var rHour = tmp2[0];
	var rMin = tmp2[1];
	var rSec = tmp2[2];
	var rDate = new Date(rYear, rMonth - 1, rDay, rHour, rMin, rSec);

	// current date
	var date = new Date();

	// last sec
	return (rDate.getTime() - date.getTime()) / 1000;
}

setInterval( function() {
	Ti.App.iOS.cancelAllLocalNotifications();

	if (Titanium.App.Properties.getString('noticeset') == 1) {
		var message = '';
		records = db.fetchToList(0);
		for (var i = 0; i < records.length; i++) {
			if (0 < subDate(records[i]) && subDate(records[i]) < 60 * 60 * 6) {
				message = message + '"' + records[i].name + '" ';
			}
		}

		if (message.length > 0) {
			var notifications = [];
			notification_params = {
				alertBody : '締切が近付いています!! ' + message,
				alertAction : 'OK',
				date : new Date(new Date().getTime() + 100)
			};
			notifications.push(Ti.App.iOS.scheduleLocalNotification(notification_params));
		}
	}
}, 1000 * 7200);	//FIXME