(function(){
    // name space for tasklist
    app.tasklist = {};
    // tab object
    app.tasklist.createTab = function(){
        // create win
        var taskListWin = Titanium.UI.createWindow({
            title:'タスク',
            backgroundColor:'#fff'
        });

        // scroll view
        var scrollView = Titanium.UI.createScrollView({
			contentWidth:'auto',
			contentHeight:'auto',
			top:0,
			bottom: 0
        });
        taskListWin.add(scrollView);

        // create tab
        tab = Titanium.UI.createTab({
            icon:'KS_nav_ui.png',
            title:'タスク',
            window:taskListWin
        });

        // create button for add task
        var button = Titanium.UI.createButton({
            title: '+',
            //backgroundImage: 'add.png',
        });
        // click addtask button
        button.addEventListener('click', function()
        {
            var addTaskWindow = app.addtask.createWindow();
            addTaskWindow.title = "タスクの追加";
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

		function nextPoint(point, prevRadius, nextRadius) {
			var x = point.x;
			var nextX = 0;
			if (x == 0) {
				while (nextX + nextRadius > Titanium.Platform.displayCaps.platformWidth
					|| nextX - nextRadius < 0) {
					nextX = Titanium.Platform.displayCaps.platformWidth * Math.random();
				}
			} else {
				while (Math.abs(nextX - x) < prevRadius + nextRadius / 2
					|| nextX + nextRadius > Titanium.Platform.displayCaps.platformWidth
					|| nextX - nextRadius < 0) {
					nextX = Titanium.Platform.displayCaps.platformWidth * Math.random();
				}
			}

			var y = point.y;
			var nextY = 0;
			if (y == 0) {
				nextY =  nextRadius;
			} else {
				nextY = y + prevRadius + nextRadius * (Math.random() / 2 + 0.5);
			}
			return {x: nextX, y: nextY};
		}

        // draw tasks
        var views = {};
        var prevPoint = {x: 0, y: 0};
        var prevRadius = 0;
		for (var i = 0; i < records.length; i++) {
			// arranging image and label for each task
			var record = records[i];
			var nextRadius = record.importance * 25;
			var next = nextPoint(prevPoint, prevRadius, nextRadius);
		 	var imageView = Titanium.UI.createImageView({
		 		id: record.id,
		 		name: record.name,
				image: 'circle_blue.png',
				width: nextRadius * 2 + 'dp',
				height: nextRadius * 2 + 'dp',
				center: {x: next.x +'dp', y: next.y + 'dp'},
				opacity: 0.8
			});
			prevPoint = next;
			prevRadius = nextRadius;

			imageView.add(Titanium.UI.createLabel({
				text: imageView.name,
				width: imageView.width,
				height: 20,
				textAlign: 'center',
				font: {fontSize: 20, fontFamily: 'Helvetica Neue'},
                touchEnabled: false
			}));
			scrollView.add(imageView);
			views[record.id] = imageView;

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
                                var taskDetailWindow = app.taskdetail.createWindow('tasklist', e.source.id);
            	tab.open(taskDetailWindow);
       		});

       		// cancel long-press when moved within detection interval
       		imageView.addEventListener('touchmove', function(e) { touched = false });
		}

		// remove a task given its imageView
		function removeTask(id) {
			scrollView.remove(views[id]);
			delete views[id];
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