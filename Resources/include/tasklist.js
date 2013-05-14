(function() {
	// name space for tasklist
	app.tasklist = {};
	// tab object
	app.tasklist.createTab = function() {
		// create win
		var taskListWin = Titanium.UI.createWindow({
			title : 'タスク',
			backgroundImage : 'back.jpg',
			barColor : '#B0C4DE'
		});

		// scroll view
		var scrollView;

		// create tab
		tab = Titanium.UI.createTab({
			icon : 'task.png',
			title : 'タスク',
			window : taskListWin
		});

		// create button for add task
		var button = Titanium.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.ADD
		});
		// click addtask button
		button.addEventListener('click', function() {
			var addTaskWindow = app.addtask.createWindow();
			addTaskWindow.title = "タスクの追加";
			tab.open(addTaskWindow);
		});

		// get tasks from DB
		var db = new TaskDB();
		records = db.fetchToList(0);

		// parameters to determine the position of tasks(images)
		var views;
		var prevPoint;
		var prevRadius;
		var initialY = 30;

		// initialize parameters
		function initialize() {
			views = {};
			prevPoint = {
				x : 0,
				y : initialY
			};
			prevRadius = 0;
			if (taskListWin.getChildren().length > 0) {
				taskListWin.remove(taskListWin.getChildren()[0]);
			}
			scrollView = Titanium.UI.createScrollView({
				contentWidth : 'auto',
				contentHeight : 'auto',
				top : 0
			});
			taskListWin.add(scrollView);
		}

		// make a date match format
		function getDate() {
			var date = new Date();
			var year = date.getYear();
			var mon = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var min = date.getMinutes();
			var sec = date.getSeconds();

			year = (year < 2000) ? year + 1900 : year;
			if (mon < 10)
				mon = "0" + mon;
			if (day < 10)
				day = "0" + day;
			if (hour < 10)
				hour = "0" + hour;
			if (min < 10)
				min = "0" + min;
			if (sec < 10)
				sec = "0" + sec;

			return year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
		}

		// subtract date (returns in sec)
		function subDate(rec) {
			// record deadline
			var tmp = rec.deadline.split('-');
			var rYear = tmp[0];
			var rMonth = tmp[1];
			var rDay = tmp[2].split(' ')[0];
			var tmp2 = tmp[2].split(' ')[1].split(':');
			var rHour = tmp2[0];
			var rMin = tmp2[1];
			var rSec = tmp2[2];
			var rDate = new Date(rYear, rMonth - 1, rDay, rHour, rMin, rSec);

			// current date
			var date = new Date();

			// last sec
			return (rDate.getTime() - date.getTime()) / 1000;
		}

		function nextPnt(prevPnt, prevRad, nextRad) {
			var x = prevPnt.x;
			var nextX = 0;
			var y = prevPnt.y;
			var nextY = 0;

			if (x == 0) {
				while (nextX + nextRad > Titanium.Platform.displayCaps.platformWidth || nextX - nextRad < 0) {
					nextX = Titanium.Platform.displayCaps.platformWidth * Math.random();
				}
			} else {
				var count = 0;
				while (Math.abs(nextX - x) < prevRad + nextRad || nextX + nextRad > Titanium.Platform.displayCaps.platformWidth || nextX - nextRad < 0) {
					count++;
					if (count > 1000) {
						while (nextX + nextRad > Titanium.Platform.displayCaps.platformWidth || nextX - nextRad < 0) {
							nextX = Titanium.Platform.displayCaps.platformWidth * Math.random();
						}
						nextY = y + prevRad + nextRad;
						return {
							x : nextX,
							y : nextY
						};
					} else {
						nextX = Titanium.Platform.displayCaps.platformWidth * Math.random();
					}
				}
			}

			if (y == initialY) {
				nextY = y + nextRad;
			} else {
				nextY = y + nextRad + prevRad * (Math.random() / 2 + 0.5);
			}
			return {
				x : nextX,
				y : nextY
			};
		}

		function nextRad(rec) {
			//last day
			var last = subDate(rec) / (60 * 60 * 24);

			if (0 < last && last < 1)
				return rec.importance * (15 + 5 * (1 - last)) + 25;
			// myzac's secret formula!!
			else if (last < 3)
				return rec.importance * (14 + 0.5 * (3 - last)) + 20;
			else if (last < 7)
				return rec.importance * (10 + 0.5 * (7 - last)) + 20;
			else
				return rec.importance * 8 + 20;
		}

		// putting images for each task
		function drawTasks(recs, showDialog) {
			initialize();
			var excessRecords = new Array(0);
			var message = '';
			for (var i = 0; i < recs.length; i++) {
				// arranging image and label for each task
				var rec = recs[i];
				var last = subDate(rec);
				if (last < -60 * 60 * 24 * 7) {
					db.deleteTask(rec.id);
				} else if (last < 0) {
					excessRecords.push(rec);
				} else {
					if (showDialog == true && last < 60 * 60 * 6) {
						message = message + rec.name + '\n';
					}
					var next = addTask(rec, last, prevPoint, prevRadius);
					prevPoint = next.point;
					prevRadius = next.radius;
				}
			}
			for (var i = excessRecords.length - 1; i >= 0; i--) {
				var rec = excessRecords[i];
				var last = subDate(rec);
				var next = addTask(rec, last, prevPoint, prevRadius);
				prevPoint = next.point;
				prevRadius = next.radius;
			}

			if (showDialog == true && message.length > 0) {
				setTimeout(function() {
					Titanium.Media.vibrate();
					Titanium.UI.createAlertDialog({
						title : '締切が近付いています!!',
						message : message
					}).show();
				}, 100);
			}
		}

		drawTasks(records, true);

		//add a task with imageView
		function addTask(rec, last, prevPnt, prevRad) {
			var nextRadius = nextRad(rec);
			var nextPoint = nextPnt(prevPnt, prevRad, nextRadius);
			var path = Titanium.Filesystem.resourcesDirectory + 'circleImg/';
			var img;
			if (last < 0) {
				img = path + 'g1.png';
			} else {
				img = {1: path + 'b1.png', 2: path + '/y1.png', 3: path + '/r1.png'}[rec.importance]
			}
			var imageView = Titanium.UI.createImageView({
				id : rec.id,
				name : rec.name,
				image : img,
				width : nextRadius * 2 + 'dp',
				height : nextRadius * 2 + 'dp',
				center : {
					x : nextPoint.x + 'dp',
					y : nextPoint.y + 'dp'
				},
				opacity : 0.8
			});

			imageView.add(Titanium.UI.createLabel({
				text : imageView.name,
				width : imageView.width,
				height : 20,
				textAlign : 'center',
				font : {
					fontSize : 14,
					fontFamily : 'Helvetica Neue'
				},
				color : '#333',
				touchEnabled : false
			}));
			scrollView.contentHeight = nextPoint.y + nextRadius;
			scrollView.add(imageView);
			views[rec.id] = imageView;

			// detection of long-press (to delete task)
			var touched = false;
			imageView.addEventListener('touchstart', function(e) {
				touched = true;
				var img = e.source;
				if (img.image.indexOf('1.png') != -1) {
					img.image = img.image.replace('1.png', 'c.png');
				}
				var confirmAlert = Titanium.UI.createAlertDialog({
					title : 'タスク"' + img.name + '"を削除します。',
					message : 'よろしいですか?',
					buttonNames : ['はい', 'いいえ'],
					cancel : 1
				});
				confirmAlert.addEventListener('click', function(e) {
					switch (e.index) {
						case 0:
							removeTaskImage(img.id);
							removeTask(img.id);
							break;
						case 1:
							break;
					}
				});
				setTimeout(function() {
					if (touched) {
						if (img.image.indexOf('c.png') != -1) {
							img.image = img.image.replace('c.png', '1.png');
						}
						confirmAlert.show();
					}
				}, 1000);
				// interval to detect long-press is 1 sec
			});

			// create detail window according to the touched task
			imageView.addEventListener('touchend', function(e) {
				var img = e.source;
				if (img.image.indexOf('c.png') != -1) {
					img.image = img.image.replace('c.png', '1.png');
				}
				if (touched) {
					var taskDetailWindow = app.taskdetail.createWindow('tasklist', img.id);
					tab.open(taskDetailWindow);
				}
				touched = false;
			});

			// cancel long-press when moved within detection interval
			imageView.addEventListener('touchmove', function(e) {
				touched = false
			});

			return {
				point : nextPoint,
				radius : nextRadius
			};
		}

		// remove an imageView of given task (with explosion!!)
		function removeTaskImage(id) {
			var imgView = views[id];
			var imageIndex = 1;
			var animationLength = 16;
			var animate = setInterval(function() {
				imageIndex++;
				if (imageIndex > animationLength) {
					clearInterval(animate);
					scrollView.remove(imgView);
					delete views[imgView.id];
				}
				imgView.image = imgView.image.replace(imageIndex - 1 + '.png', imageIndex + '.png');
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
			var tmp;
			if (blurFlag == 1) {
				for (var i = 0; i < records.length; i++) {
					laterRecords.push(records[i].id);
				}
				var added = laterRecords.filter(exists, prevRecords)[0];
				var removed = prevRecords.filter(exists, laterRecords)[0];
				if (added != null) {
					drawTasks(records, false);
				} else if (removed != null && views[removed] != null) {
					removeTaskImage(removed);
				}
				prevRecords = new Array(0);
				blurflag = 0;
			}
		});

		Ti.App.addEventListener('resume', function(e) {
			setTimeout(function() {
				drawTasks(db.fetchToList(0), true);
			}, 10);
		});

		// set button
		taskListWin.setRightNavButton(button);
		return tab;
	};
})();
