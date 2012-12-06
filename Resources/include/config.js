(function(){
    // name space for config
    app.config = {};
    // tab object
    app.config.createTab = function(){
        var TimeSet = 25;
        if (Ti.App.Properties.getString('timeset')) {
            TimeSet = Ti.App.Properties.getString('timeset');
        }
        // create win
        var win = Titanium.UI.createWindow({
            title:'設定',
            backgroundColor:'#fff',
            barColor: '#B0C4DE'
        });
        // create tab
        var tab = Titanium.UI.createTab({
            icon:'config.png',
            title:'設定',
            window:win
        });

        var BackGroundView = Ti.UI.createImageView({
                image: './back.jpg',
                width: '500dp',
            });
        // time set
        var TimeLabel25 = Titanium.UI.createLabel({
            text: '集中時間:25分 休憩:5分',
            height: '30dp',
            top: '100dp',
            left: '80dp',
            width: '200dp'
        });

        var TimeLabel50 = Titanium.UI.createLabel({
            text: '集中時間:50分 休憩:10分',
            height: '30dp',
            top: '140dp',
            left: '80dp',
            width: '200dp',
        });

        var TimeView25 = Titanium.UI.createImageView({
            image: 'checkbox_on.png',
            height: '30dp',
            top: '100dp',
            left: '40dp',
            width: '30dp'
        });

        var TimeView50 = Titanium.UI.createImageView({
            image: 'checkbox_off.png',
            text: '集中時間:50分 休憩:10分',
            height: '30dp',
            top: '140dp',
            left: '40dp',
            width: '30dp'
        });

        var SaveButton = Titanium.UI.createButton({
            backgroundImage:'save.png',
            height: '50dp',
            top: '190dp',
            left: '85dp',
            width: '150dp'
        });

        if (TimeSet == 50) {
            TimeView25.image = 'checkbox_off.png';
            TimeView50.image = 'checkbox_on.png';
        }

        TimeView25.addEventListener('click', function(e){
            TimeView25.image = 'checkbox_on.png';
            TimeView50.image = 'checkbox_off.png';
            TimeSet = 25;
        });

        TimeView50.addEventListener('click', function(e){
            TimeView25.image = 'checkbox_off.png';
            TimeView50.image = 'checkbox_on.png';
            TimeSet = 50;
        });

        SaveButton.addEventListener('click', function(e){
            Ti.App.Properties.setString('timeset', TimeSet);
            Titanium.UI.createAlertDialog({
                title:'設定を保存しました',
            }).show();
        });

        // set label
        win.add(BackGroundView);
        win.add(TimeLabel25);
        win.add(TimeLabel50);
        win.add(TimeView25);
        win.add(TimeView50);
        win.add(SaveButton);
        return tab;
    };
})();