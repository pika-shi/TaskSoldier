(function(){
    // name space for taskdetail
    app.timer = {};
    // tab object
    app.timer.createWindow = function(taskID, caller){
        // create win
        var timerWin = Titanium.UI.createWindow({
            title: 'timer',
            // backgroundColor: '#f0ffff'
            backgroundImage: 'back.jpg'
        });
        
        // label to put section in
        var statusLabel = Titanium.UI.createLabel({
        	center: {x:Titanium.Platform.displayCaps.platformWidth / 2 + 'dp', y: 50 + 'dp'},
        	textAlign: 'center',
			font: {fontSize: 20, fontFamily: 'Helvetica Neue'},
			touchEnabled: false
        });
        
        // basement of timer label
        var whiteView = Titanium.UI.createView({
        	center: {x:Titanium.Platform.displayCaps.platformWidth / 2 + 'dp', y: 150 + 'dp'},
        	// backgroundColor: 'white',
        	backgroundColor: '#7fbfff',
        	opacity: 0.6,
        	width: 180 + 'dp',
        	height: 100 + 'dp'
        });
        
        // label to put time in
        var timerLabel = Titanium.UI.createLabel({
        	center: {x:Titanium.Platform.displayCaps.platformWidth / 2 + 'dp', y: 150 + 'dp'},
        	textAlign: 'center',
			font: {fontSize: 60, fontFamily: 'Helvetica Neue'},
			color: 'white',
			touchEnabled: false
        });
        
        // timer (countdown)
        var timeSet = (Ti.App.Properties.getString('timeset'))? Ti.App.Properties.getString('timeset') : 25;
        var chosenTime;
        if (timeSet == 25) {
        	chosenTime = new Array(25*60, 5*60);
        } else if (timeSet == 50) {
        	chosenTime = new Array(50*60, 10*60);
        }
        var section = 0;
        var count = chosenTime[section];
        var totalTime = 0;
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
	    	var min = Math.floor(second / 60);
	    	min = (min > 9)? min : '0' + min;
	    	var sec = second % 60;
	    	sec = (sec > 9)? sec : '0' + sec;
	    	timerLabel.text = min + ':' + sec;
	    	
	    	second--;
	    	if (second < 0) {
	    		section++;
	    		second = chosenTime[section % 2];
	    	} else {
	    		totalTime++;
	    	}
	    	return second;
        }
        
        // generate message for statusLabel according to current section (work or rest)
        function genMessage(section) {
        	var message = {0: 'まだ慌てるような時間じゃない', 1: '今を大切に!!', 2: '明日やろうは馬鹿野郎', 3: '無限の彼方へェェェェェ!!'}[Math.floor(Math.random() * 4)];
        	if (message == 'まだ慌てるような時間じゃない') timerWin.backgroundImage = 'sendou.jpg';	//FIXME
        	switch(section % 2) {
        		case 0: statusLabel.text = message; break;
        		case 1: statusLabel.text = '休憩!!'; break;
        		default: statusLabel.text = 'ERROR'; break;
        	}
        }
        
        // button to pause countdown
        var pauseFlag = 0;
        var pauseButton = Titanium.UI.createButton({
            backgroundImage: 'button_pause.png',
            center: {x:Titanium.Platform.displayCaps.platformWidth / 2 + 'dp', y: 280 + 'dp'},
            width: '150dp',
            height: '50dp'
        });
        pauseButton.addEventListener('click', function(e){
        	switch (pauseFlag) {
        		case 0:	pauseFlag = 1; stopTimer(1); this.backgroundImage = 'button_resume.png'; break;
        		case 1: pauseFlag = 0; setTimer(); this.backgroundImage = 'button_pause.png'; break;
        	}
        });
        
        // regard unfocusing timer window as pause operation
        timerWin.addEventListener('blur', function(e) {
        	if (pauseFlag == 0) {
	        	stopTimer(1);
	        	var db = new TaskDB();
				db.updateCell(taskID, 'passedtime', passedTime + totalTime);
				db.close();
        	}
		});
        
        // button to finish working on the task
        var finishButton = Titanium.UI.createButton({
            backgroundImage: 'button_exit.png',
            center: {x:Titanium.Platform.displayCaps.platformWidth / 2 + 'dp', y: 350 + 'dp'},
            width: '150dp',
            height: '50dp'
        });
        finishButton.addEventListener('click', function(e){
        	pauseFlag = 1;
        	pauseButton.backgroundImage = 'button_resume.png';
        	stopTimer(0);
        });
        
        // alert of finishing work
		var confirmAlert = Titanium.UI.createAlertDialog({
			title: '集中作業の終了',
			message: 'タスクは完了しましたか?',
			buttonNames: ['はい', 'いいえ', 'キャンセル'],
			cancel: 2
		});
		confirmAlert.addEventListener('click', function(e) {
			var db = new TaskDB();
			switch (e.index) {
				case 0:
					var date = getDate();
					db.updateCell(taskID, 'endtime', date);
				case 1:
					passedTime = db.fetchCell(taskID, 'passedtime');
					if (typeof passedTime != typeof 1) {
						db.updateCell(taskID, 'passedtime', totalTime);	
					} else {
						db.updateCell(taskID, 'passedtime', passedTime + totalTime);
					}
					db.close();
					caller.close();
					timerWin.close(); 
					break;
			}
		});
		
		// function to make 'passedtime'
		function getDate() {
			var date = new Date();
			var year = date.getYear();
			var mon = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var min = date.getMinutes();
			var sec = date.getSeconds();

			year = (year < 2000) ? year + 1900 : year;
			if (mon < 10) mon = "0" + mon;
			if (day < 10) day = "0" + day;
			if (hour < 10) hour = "0" + hour;
			if (min < 10) min = "0" + min;
			if (sec < 10) sec = "0" + sec;

			return year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec; 
		}
		
		// show fullscreen countdown
		function showCountDown() {
			var blackView = Titanium.UI.createView({
				width : Titanium.Platform.displayCaps.platformWidth,
				height : Titanium.Platform.displayCaps.platformHeight,
				backgroundColor : 'black'
			});
			var countLabel = Titanium.UI.createLabel({
				center : {
					x : Titanium.Platform.displayCaps.platformWidth / 2 + 'dp',
					y : Titanium.Platform.displayCaps.platformHeight / 2 + 'dp'
				},
				textAlign : 'center',
				font : {
					fontSize : 200,
					fontFamily : 'Helvetica Neue'
				},
				color :'white',
				touchEnabled : false
			});
			blackView.add(countLabel);
			timerWin.add(blackView);
			
			var count = 3;
			myCount = setInterval(function() {
        		if (count > 0) {
        			countLabel.text = count;
        			count--;
        		} else {
        			clearInterval(myCount);
        			timerWin.remove(blackView);
        			drawTimer();
        			setTimer();	// start timer
        		}
        	}, 800);
		}
		
		// arrange labels and buttons for timer
		function drawTimer() {
			timerWin.add(statusLabel);
			timerWin.add(whiteView);
			timerWin.add(timerLabel);
			timerWin.add(pauseButton);
        	timerWin.add(finishButton);
		}
		
		genMessage(section);
        
        // show countdown
        showCountDown();

        return timerWin;
    };
})();