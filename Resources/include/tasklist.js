(function(){
    // name space for tasklist
    app.tasklist = {};
    // tab object
    app.tasklist.createTab = function(){
        // create win
        var taskListWin = Titanium.UI.createWindow({
            title:'タスク',
            backgroundColor:'#fff',
            backgroundImage: 'back.jpg'
        });

        // scroll view
        var scrollView;

        // create tab
        tab = Titanium.UI.createTab({
            icon:'KS_nav_ui.png',
            title:'タスク',
            window:taskListWin
        });

        // create button for add task
        var button = Titanium.UI.createButton({
            systemButton: Titanium.UI.iPhone.SystemButton.ADD
        });
        // click addtask button
        button.addEventListener('click', function()
        {
            var addTaskWindow = app.addtask.createWindow();
            addTaskWindow.title = "タスクの追加";
            tab.open(addTaskWindow);
        });

        // get tasks from DB
        var db = new TaskDB();
        records = db.fetchToList(0);

		function nextPnt(point, prevRad, nextRad) {
			var x = point.x;
			var nextX = 0;
			if (x == 0) {
				while (nextX + nextRad > Titanium.Platform.displayCaps.platformWidth
					|| nextX - nextRad < 0) {
					nextX = Titanium.Platform.displayCaps.platformWidth * Math.random();
				}
			} else {
				while (Math.abs(nextX - x) < prevRad + nextRad / 2
					|| nextX + nextRad > Titanium.Platform.displayCaps.platformWidth
					|| nextX - nextRad < 0) {
					nextX = Titanium.Platform.displayCaps.platformWidth * Math.random();
				}
			}

			var y = point.y;
			var nextY = 0;
			if (y == 0) {
				nextY =  nextRad;
			} else {
				nextY = y + prevRad + nextRad * (Math.random() / 2 + 0.5);
			}
			return {x: nextX, y: nextY};
		}

		function nextRad(rec) {
			// record deadline
			var tmp = rec.deadline.split('-');
			var rYear = tmp[0];
			var rMonth = tmp[1];
			var rDay = tmp[2].split(' ')[0];
			var rDate = new Date(rYear, rMonth - 1, rDay);

			// current date
			var date = new Date();

			// last day
			var last = (rDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

			if (last < 0) return 15;
			else if (last < 1) return rec.importance * (25 + 5 * (1 - last));	// myzac's secret formula!!
			else if (last < 3) return rec.importance * (18 + 0.5 * (3 - last));
			else if (last < 7) return rec.importance * (15 + 0.5 * (7 - last));
			else return rec.importance * 15;
		}

        // parameters to determine the position of tasks(images)
        var views;
        var prevPoint;
        var prevRadius;

        // initialize parameters
        function initialize() {
        	views = {};
        	prevPoint = {x: 0, y: 0};
        	prevRadius = 0;
			scrollView = Titanium.UI.createScrollView({
				contentWidth : 'auto',
				contentHeight : 'auto',
				top : 0
			});
			taskListWin.add(scrollView);
        }

        // putting images for each task
        function drawTasks(recs) {
        	initialize();
			for (var i = 0; i < recs.length; i++) {
				// arranging image and label for each task
				var rec = recs[i];
				var next = addTask(rec, prevPoint, prevRadius);
				prevPoint = next.point;
				prevRadius = next.radius;
			}
			scrollView.contentHeight = prevPoint.y + prevRadius;
        }
        drawTasks(records);

		//add a task with imageView
		function addTask(rec, prevPnt, prevRad) {
			var nextRadius = nextRad(rec);
			var nextPoint = nextPnt(prevPnt, prevRad, nextRadius);
		 	var imageView = Titanium.UI.createImageView({
		 		id: rec.id,
		 		name: rec.name,
				image: {1: './circleImg/b1.png', 2: './circleImg/y1.png', 3: './circleImg/r1.png'}[rec.importance],
				width: nextRadius * 2 + 'dp',
				height: nextRadius * 2 + 'dp',
				center: {x: nextPoint.x +'dp', y: nextPoint.y + 'dp'},
				opacity: 0.8
			});

			imageView.add(Titanium.UI.createLabel({
				text: imageView.name,
				width: imageView.width,
				height: 20,
				textAlign: 'center',
				font: {fontSize: 20, fontFamily: 'Helvetica Neue'},
                touchEnabled: false
			}));
			scrollView.add(imageView);
			views[rec.id] = imageView;

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
			   			case 0: removeTaskImage(img.id); removeTask(img.id); break;
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

       		return {point: nextPoint, radius: nextRadius};
		}

		// remove an imageView of given task (with explosion!!)
		function removeTaskImage(id) {
			var imgView = views[id];
			var imageIndex = 1;
			var animationLength = 16;
			var color = imgView.image.split('1')[0];
			var suffix = imgView.image.split('1')[1];
			var animate = setInterval(function() {
				imgView.image = color + imageIndex + suffix;
				imageIndex++;
				if (imageIndex > animationLength) {
					clearInterval(animate);
					scrollView.remove(imgView);
					delete views[imgView.id];
				}
			}, 100);
		}

		// remove a task given its imageView
		function removeTask(id) {
			db.deleteTask(id);
		}

		// function to calculate difference between two arrays
		function exists(ele, index, array) {
			return (this.indexOf(ele) == -1);
		}
		// memory (ids of) existing tasks when the window unfocused
		var blurFlag = 0;
		var prevRecords = new Array(0);
		taskListWin.addEventListener('blur', function(e) {
			blurFlag = 1;
			for (var i = 0; i < records.length; i++) {
				prevRecords.push(records[i].id);
			}
		});

		// detect a task finished when the window re-focused
		taskListWin.addEventListener('focus', function(e) {
      		records = db.fetchToList(0);
			var laterRecords = new Array(0);
			if (blurFlag == 1) {
				for (var i = 0; i < records.length; i++) {
					laterRecords.push(records[i].id);
				}
				var added = laterRecords.filter(exists, prevRecords)[0];
				var removed = prevRecords.filter(exists, laterRecords)[0];
				if (added != null) {
					taskListWin.remove(scrollView);
					drawTasks(records);
				} else if (removed != null && views[removed] != null) {
					removeTaskImage(removed);
				}
				prevRecords = new Array(0);
			}
		});

        // set button
        taskListWin.setRightNavButton(button);
        return tab;
    };
})();