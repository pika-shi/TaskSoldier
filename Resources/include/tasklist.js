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
        // var records = db.fetchToList(0);
        var records = new genRecords(5);	// for test run

        // draw tasks
		for (var i = 0; i < records.length; i++) {
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
			taskListWin.add(imageView);

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
			   			case 0: taskListWin.remove(img); db.deleteTask(img.id); break;
			      		case 1: break;
			 		}
				});
				setTimeout(function() {
					if (touched) confirmAlert.show();
				}, 1000);
       		});

			// // create detail window
			imageView.addEventListener('touchend', function(e) {
				touched = false;
            	var taskDetailWindow = app.taskdetail.createWindow(e.source.id);
            	tab.open(taskDetailWindow);
       		});

       		imageView.addEventListener('touchmove', function(e) { touched = false });
		}

        // set button
        taskListWin.setRightNavButton(button);
        return tab;
    };
})();