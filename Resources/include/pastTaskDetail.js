var past_task_detail = function(id) {
	var con = Ti.Database.open('task');
	
	var pastTaskDetail = Ti.UI.createWindow({
		title : '詳細',
		backgroundColor : '#fff'
	});
	Ti.API.info(id);
	return pastTaskDetail;
};
