(function(){
    // name space for tasklist
    app.tasklist = {};
    // tab object
    app.tasklist.createTab = function(){
        // create win
        var taskListWin = Titanium.UI.createWindow({
            title:'タスク',
            backgroundColor:'#fff',
            layout: 'absolute'
        });

        // create tab
        var tab = Titanium.UI.createTab({
            icon:'KS_nav_ui.png',
            title:'タスク',
            window:taskListWin
        });

        // create button for add task
        var button = Titanium.UI.createButton({
            title: '+',
        });
        // click addtask button
        button.addEventListener('click', function()
        {
            var addTaskWindow = app.addtask.createWindow();
            tab.open(addTaskWindow);
        });

        // sample object of records (for test run)
        var deadline = new Array(10,30,50,100,200);
        var importance = new Array(3,1,2,2,3);
        function genRecords(num) {
        	var records = Array(0);
        	for (var i = 0; i < num; i++) {
        		var record = {};
        		record.id = i;
        		record.name = 'task' + i;
        		record.deadline = deadline[i];
        		record.importance = importance[i];
        		records.push(record);
        	}
        	return records;
        }

        // get tasks from DB
        var db = TaskDB();
        //var records = db.fetchToList(0);
        var records = new genRecords(5);	// for test run

        // draw tasks
        var views = {};
		for (var i = 0; i < records.length; i++) {
			// arranging image and label for each task
			var record = records[i];
		 	var imageView = Titanium.UI.createImageView({
		 		id: record.id,
		 		name: record.name,
				image: 'circle_blue.png',
				width: record.importance * 50 + 'dp',	//TODO arrange tasks not to duplicate
				top: record.deadline - Titanium.Platform.displayCaps.platformHeight / 2 + 'dp',
				left: Titanium.Platform.displayCaps.platformWidth * Math.random() * 0.8 + 'dp',
				opacity: 0.8
			});
			imageView.add(Titanium.UI.createLabel({
				text: imageView.name,
				width: imageView.width,
				textAlign: 'center',
				font: {fontSize: 20, fontFamily: 'Helvetica Neue'},
                                touchEnabled: false
			}));
			views[record.id] = imageView;
			taskListWin.add(imageView);

			// detection of long-press (to delete task)
       		var touched = false;
       		imageView.addEventListener('touchstart', function(e){
       			touched = true;
       			var img = e.source;
       			var confirmAlert =
       				Titanium.UI.createAlertDialog({
       					title: 'タスク"' + img.name + '"を削除します．',
       					message: 'よろしいですか?',
       					buttonNames: ['はい', 'いいえ'],
       					cancel: 1
       				});
       			confirmAlert.addEventListener('click', function(e) {
			   		switch (e.index) {
			   			case 0: removeTask(img.id); break;
			      		case 1: break;
			 		}
				});
				setTimeout(function() {
					if (touched) confirmAlert.show();
				}, 1000);	// interval to detect long-press is 1 sec
       		});

			// create detail window according to the touched task
			imageView.addEventListener('touchend', function(e) {
				touched = false;
            	var taskDetailWindow = app.taskdetail.createWindow(e.source.id);
            	tab.open(taskDetailWindow);
            	// var timerWindow = app.timer.createWindow(e.source.id);
            	// tab.open(timerWindow);
       		});

       		// cancel long-press when moved within detection interval
       		imageView.addEventListener('touchmove', function(e) { touched = false });
		}

		// remove a task given its imageView
		function removeTask(id) {	//TODO animation
			taskListWin.remove(views[id]);
			db.deleteTask(id);
		}

		// function to calculate difference between two arrays
		function exists(ele, index, array) {
			return (this.indexOf(ele) == -1);
		}
		// memory (ids of) existing tasks when the window unfocused
		var prevRecords = new Array(0);
		taskListWin.addEventListener('blur', function(e) {
			for (var i = 0; i < records.length; i++) {
				prevRecords.push(records[i].id);
			}
		});

		// detect a task finished when the window re-focused
		taskListWin.addEventListener('focus', function(e) {
			var tmpRecords = genRecords(5);
      		// var tmpRecords = db.execute('SELECT id FROM task WHERE endtime IS NOT NULL');
			var laterRecords = new Array(0);
			if (prevRecords.length != 0) {
				for (var i = 0; i < tmpRecords.length; i++) {
					laterRecords.push(tmpRecords[i].id);
				}
				var removed = prevRecords.filter(exists, laterRecords)[0];
				if (removed != null) {
					removeTask(removed);
					prevRecords = new Array(0);
				}
			}
		});

        // set button
        taskListWin.setRightNavButton(button);
        return tab;
    };
})();