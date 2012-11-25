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
            backgroundColor:'#fff'
        });
        // create tab
        var tab = Titanium.UI.createTab({
            icon:'KS_nav_ui.png',
            title:'設定',
            window:win
        });
        // time set
        var TimeLabel25 = Titanium.UI.createLabel({
            text: '集中時間:25分 休憩:5分',
            height: '30dp',
            top: '30dp',
            left: '80dp',
            width: '200dp'
        });

        var TimeLabel50 = Titanium.UI.createLabel({
            text: '集中時間:50分 休憩:10分',
            height: '30dp',
            top: '70dp',
            left: '80dp',
            width: '200dp',
        });

        var TimeView25 = Titanium.UI.createView({
            backgroundColor:'#000',
            borderColor:'#000',
            height: '30dp',
            top: '30dp',
            left: '30dp',
            width: '30dp'
        });

        var TimeView50 = Titanium.UI.createView({
            backgroundColor:'#fff',
            borderColor:'#000',
            text: '集中時間:50分 休憩:10分',
            height: '30dp',
            top: '70dp',
            left: '30dp',
            width: '30dp'
        });

        var SaveButton = Titanium.UI.createButton({
            title: '保存',
            height: '40dp',
            top: '120dp',
            left: '80dp',
            width: '160dp'
        });

        if (TimeSet == 50) {
            TimeView25.backgroundColor = '#fff';
            TimeView50.backgroundColor = '#000';
        }

        TimeView25.addEventListener('click', function(e){
            TimeView25.backgroundColor =  '#000';
            TimeView50.backgroundColor = '#fff';
            TimeSet = 25;
        });

        TimeView50.addEventListener('click', function(e){
            TimeView25.backgroundColor = '#fff';
            TimeView50.backgroundColor = '#000';
            TimeSet = 50;
        });

        SaveButton.addEventListener('click', function(e){
            Ti.App.Properties.setString('timeset', TimeSet);
            Titanium.UI.createAlertDialog({
                title:'設定を保存しました',
            }).show();
        });

        // set label
        win.add(TimeLabel25);
        win.add(TimeLabel50);
        win.add(TimeView25);
        win.add(TimeView50);
        win.add(SaveButton);
        return tab;
    };
})();