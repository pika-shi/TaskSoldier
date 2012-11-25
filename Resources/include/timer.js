(function(){
    // name space for taskdetail
    app.timer = {};
    // tab object
    app.timer.createWindow = function(){
        // create win
        var timerWin = Titanium.UI.createWindow({
            title:'timer',
            backgroundColor:'#fff'
        });
        
        var statusLabel = Titanium.UI.createLabel({
        	top: '20dp',
        	textAlign: 'center',
			font: {fontSize: 24, fontFamily: 'Helvetica Neue'},
			touchEnabled: false
        });
        timerWin.add(statusLabel);
        
        // label to put time in
        var timerLabel = Titanium.UI.createLabel({
        	top: '80dp',
        	textAlign: 'center',
			font: {fontSize: 60, fontFamily: 'Helvetica Neue'},
			touchEnabled: false
        });
        timerWin.add(timerLabel);
        
        // timer (countdown)
        var chosenTime = new Array(3, 3);	// work: 1500sec = 25min	//TODO	apply chosen interval
        var section = 0;
        var count = chosenTime[section];
        var myTimer;
        count = calcTime(count);
        function setTimer() {
        	myTimer = setInterval(function() {
        		count = calcTime(count);
        	}, 1000);
        }
        
        // stop timer (0: finished, 1: pause)
        function stopTimer(option) {
        	clearInterval(myTimer);
        	switch(option) {
        		case 0:	confirmAlert.show(); break;	// task complete
        		case 1:	break;	// pause
        		default: break;
        	}
        }
        
        // generate time for timerLabel
        function calcTime(second) {
        	genMessage(section);
        	
	    	var min = Math.floor(second / 60);
	    	min = (min > 9)? min : '0' + min;
	    	var sec = second % 60;
	    	sec = (sec > 9)? sec : '0' + sec;
	    	timerLabel.text = min + ':' + sec;
	    	
	    	second--;
	    	if (second < 0) {
	    		section++;
	    		second = chosenTime[section % 2];
	    	}
	    	return second;
        }
        
        // generate message for statusLabel according to current section (work or rest)
        function genMessage(section) {
        	switch(section % 2) {
        		case 0: statusLabel.text = 'ファイト百発!!'; break;	//TODO looking for a better message ;(
        		case 1: statusLabel.text = '休憩!!'; break;
        		default: statusLabel.text = 'ERROR'; break;
        	}
        }
        
        var pauseFlag = 0;
        var pauseButton = Titanium.UI.createButton({
            title: '一時停止',
            top: '200dp',
            left: '100dp',
            width: '120dp',
            height: '30dp'
        });
        pauseButton.addEventListener('click', function(e){
        	switch (pauseFlag) {
        		case 0:	pauseFlag = 1; stopTimer(1); this.title = '再開'; break;
        		case 1: pauseFlag = 0; setTimer(); this.title = '一時停止'; break;
        	}
        });
        timerWin.add(pauseButton);
        
        var finishButton = Titanium.UI.createButton({
            title: 'タスク完了!!',
            top: '280dp',
            left: '100dp',
            width: '120dp',
            height: '30dp'
        });
        finishButton.addEventListener('click', function(e){
        	pauseFlag = 1;
        	pauseButton.title = '再開';
        	stopTimer(0);
        });
        timerWin.add(finishButton);
        
		var confirmAlert = Titanium.UI.createAlertDialog({
			title: '集中作業の終了',
			message: 'タスクが完了しましたか?',
			buttonNames: ['はい', 'いいえ', 'キャンセル'],
			cancel: 2
		});
		confirmAlert.addEventListener('click', function(e) {
			switch (e.index) {
				case 0: 	//TODO remove task
					timerWin.close();
					break;
				case 1: 
					timerWin.close(); 
					break;
			}
		});
        
        setTimer();

        return timerWin;
    };
})();