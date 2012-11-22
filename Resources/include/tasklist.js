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
        
        // mock object of rows (for test run)
        function Rows(num) {
        	this.limit = num;
        	this.__index = 0;
        	this.name;
        	this.deadline;
        	this.importance;
        	this.memo;
        }
        Rows.prototype.__iterator__ = function() {
        	return this;
        }
        Rows.prototype.next = function() {
        	return this.__index++;
        }
        Rows.prototype.isValidRow = function() {
        	this.name = 'task' + this.__index;
        	this.deadline = Math.floor(Math.random() * 500);
        	this.importance = Math.floor(Math.random() * 3) + 1;
        	return (this.__index >= this.limit)? false : true;
        }
        Rows.prototype.close = function() {
        	
        }
        Rows.prototype.field = function(num) {
        	return this.__index;
        }
        
        // get tasks from DB
        // var con = Titanium.Database.open('task');
        // var rows = con.execute('SELECT * FROM task');
        var rows = new Rows(5);	// for test run
        
        // draw tasks
		while (rows.isValidRow()) {
		 	var imageView = Titanium.UI.createImageView({
		 		id: rows.field(0),
		 		name: rows.name,
				image: 'circle_blue.png',
				width: rows.importance * 50,	//TODO arrange tasks not to duplicate
				top: rows.deadline - 200,
				left: Math.floor(Math.random() * 200),
				opacity: 0.8
			});
			imageView.add(Titanium.UI.createLabel({
				text: imageView.name,
				size: imageView.size,
				font: {fontSize: 20, fontFamily: 'Helvetica Neue'},
				touchEnabled: false
			}));
			taskListWin.add(imageView);
			
			//TODO identification : click or long-press
       		// remove when long-pressed
       		imageView.addEventListener('longpress', function(e){
       			var img = e.source;
       			var confirmAlert = 
       				Titanium.UI.createAlertDialog({
       					title: 'Remove ' + img.name,
       					message: 'Sure?',
       					buttonNames: ['Yes', 'No'],
       					cancel: 1
       				});
       			confirmAlert.addEventListener('click', function(e) {
			   		switch (e.index) {
			   			case 0: taskListWin.remove(img); break;	//TODO add operation of removal from DB
			      		case 1: break;
			 		}
				});
            	confirmAlert.show();
       		});
       		
			// // create detail window
			imageView.addEventListener('click', function(e){
            	var taskDetailWindow = app.taskdetail.createWindow(e.source.id);
            	tab.open(taskDetailWindow);
       		});
       		
			rows.next();
		}
		rows.close();
        
        // set button
        taskListWin.setRightNavButton(button);
        return tab;
    };
})();