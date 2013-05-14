(function() {
	// name space for config
	app.config = {};
	// tab object
	app.config.createTab = function() {
		var TimeSet = 25;
		var NoticeSet = 1;
		if (Ti.App.Properties.getString('timeset')) {
			TimeSet = Ti.App.Properties.getString('timeset');
		}

		if (Ti.App.Properties.getString('noticeset')) {
			NoticeSet = Ti.App.Properties.getString('noticeset');
		}

		// create win
		var win = Titanium.UI.createWindow({
			title : '設定',
			backgroundColor : '#fff',
			barColor : '#B0C4DE'
		});
		// create tab
		var tab = Titanium.UI.createTab({
			icon : 'config.png',
			title : '設定',
			window : win
		});

		var BackGroundView = Ti.UI.createImageView({
			image : './back.jpg',
			width : '500dp',
		});

		var ConfigView = Ti.UI.createImageView({
			image : 'config_ver2.png',
			top : '15dp',
			height : 280,
			width : 280
		});

		var TimeLabel = Titanium.UI.createLabel({
			font : {
				fontSize : 20
			},
			color : '#333',
			text : 'タイマー',
			height : '30dp',
			top : '35dp',
			left : '40dp',
			width : '200dp'
		});

		// time set
		var TimeLabel25 = Titanium.UI.createLabel({
			color : '#333',
			text : '集中時間：25分 休憩：5分',
			font : {
				fintSize : 14
			},
			height : '30dp',
			top : '70dp',
			left : '80dp',
			width : '200dp'
		});

		var TimeLabel50 = Titanium.UI.createLabel({
			color : '#333',
			text : '集中時間：50分 休憩：10分',
			font : {
				fintSize : 14
			},
			height : '30dp',
			top : '110dp',
			left : '80dp',
			width : '200dp',
		});

		var TimeView25 = Titanium.UI.createImageView({
			image : 'checkbox_on.png',
			height : '30dp',
			top : '70dp',
			left : '40dp',
			width : '30dp'
		});

		var TimeView50 = Titanium.UI.createImageView({
			image : 'checkbox_off.png',
			height : '30dp',
			top : '110dp',
			left : '40dp',
			width : '30dp'
		});

		var NoticeLabel = Titanium.UI.createLabel({
			font : {
				fontSize : 20
			},
			color : '#333',
			text : '通知',
			height : '30dp',
			top : '155dp',
			left : '40dp',
			width : '200dp'
		});

		// notice set
		var NoticeLabelOn = Titanium.UI.createLabel({
			color : '#333',
			text : 'ON',
			font : {
				fontSize : 14
			},
			height : '30dp',
			top : '190dp',
			left : '80dp',
			width : '200dp'
		});

		var NoticeLabelOff = Titanium.UI.createLabel({
			color : '#333',
			text : 'OFF',
			font : {
				fontSize : 14
			},
			height : '30dp',
			top : '230dp',
			left : '80dp',
			width : '200dp',
		});

		var NoticeViewOn = Titanium.UI.createImageView({
			image : 'checkbox_on.png',
			height : '30dp',
			top : '190dp',
			left : '40dp',
			width : '30dp'
		});

		var NoticeViewOff = Titanium.UI.createImageView({
			image : 'checkbox_off.png',
			height : '30dp',
			top : '230dp',
			left : '40dp',
			width : '30dp'
		});

		var SaveButton = Titanium.UI.createButton({
			title : '保存',
			top : '300dp',
			height : 40,
			width : 100
		});

		if (TimeSet == 50) {
			TimeView25.image = 'checkbox_off.png';
			TimeView50.image = 'checkbox_on.png';
		}

		TimeView25.addEventListener('click', function(e) {
			TimeView25.image = 'checkbox_on.png';
			TimeView50.image = 'checkbox_off.png';
			TimeSet = 25;
		});

		TimeView50.addEventListener('click', function(e) {
			TimeView25.image = 'checkbox_off.png';
			TimeView50.image = 'checkbox_on.png';
			TimeSet = 50;
		});

		if (NoticeSet == 0) {
			NoticeViewOn.image = 'checkbox_off.png';
			NoticeViewOff.image = 'checkbox_on.png';
		}

		NoticeViewOn.addEventListener('click', function(e) {
			NoticeViewOn.image = 'checkbox_on.png';
			NoticeViewOff.image = 'checkbox_off.png';
			NoticeSet = 1;
		});

		NoticeViewOff.addEventListener('click', function(e) {
			NoticeViewOn.image = 'checkbox_off.png';
			NoticeViewOff.image = 'checkbox_on.png';
			NoticeSet = 0;
		});

		SaveButton.addEventListener('click', function(e) {
			Ti.App.Properties.setString('timeset', TimeSet);
			Ti.App.Properties.setString('noticeset', NoticeSet);
			Titanium.UI.createAlertDialog({
				title : '設定を保存しました',
			}).show();
		});

		// set label
		win.add(BackGroundView);
		win.add(ConfigView);
		win.add(TimeLabel);
		win.add(TimeLabel25);
		win.add(TimeLabel50);
		win.add(TimeView25);
		win.add(TimeView50);
		win.add(NoticeLabel);
		win.add(NoticeLabelOn);
		win.add(NoticeLabelOff);
		win.add(NoticeViewOn);
		win.add(NoticeViewOff);
		win.add(SaveButton);
		return tab;
	};
})();
