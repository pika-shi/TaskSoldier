var TaskDB = function() {
    this.dbName = 'task';

    this.open = function () {
        this.db = Titanium.Database.open(this.dbName);
    };
    this.close = function () {
        this.db.close();
    };
    this.insertTask = function (record) {
        this.open();
        this.db.execute('INSERT INTO task (name, deadline, importance, memo) VALUES(?,?,?,?)',
                        record.name, record.deadline, record.importance, record.memo);
        row = this.db.execute('SELECT MAX(id) FROM task');
        id = row.field(0);
        this.close();
        return id;
    };
    this.deleteTask = function (id) {
    	this.open();
    	this.db.execute('DELETE FROM task WHERE id = ?', id);
    	this.close();
    };

    this.fetchOne = function (id) {
        this.open();
        row = this.db.execute('SELECT * FROM task WHERE id = ?', id);
        record = {};
        record.name = row.field(1);
        record.deadline = row.field(2);
        record.importance = row.field(3);
        record.memo = row.field(4);
        this.close();
        return record;
    };
    
    this.fetchOne = function(id, attr) {
    	this.open();
    	var cell = this.db.execute('SELECT ? FROM task WHERE id = ?', attr, id);
    	this.close();
    	return cell;
    };
    
    this.updateOne = function(id, attr, val) {
    	this.open();
    	this.db.execute('UPDATE task SET ? = ? WHERE id = ?', attr, val, id);
    	this.close();
    };

    this.fetchToList = function (flag) { // flag = 0:incomplete tasks, 1:completed tasks
    	this.open();
    	var rows = (flag == 0)?
    		this.db.execute('SELECT id, name, deadline, importance FROM task WHERE endtime IS NULL ORDER BY deadline ASC')
    		: this.db.execute('SELECT id, name, deadline, importance FROM task WHERE endtime IS NOT NULL ORDER BY deadline ASC');
    	var records = new Array(0);
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			var record = {};
			record.id = row.field(0);
			record.name = row.field(1);
        	record.deadline = row.field(2);
        	record.importance = row.field(3);
        	records.push(rec);
		};
    	this.close();
    	return records;
    };

    // create table
    this.open();
    // time -> YYYY-MM-DD HH:MM:SS
    //this.db.execute('DROP TABLE task');
    this.db.execute('CREATE TABLE IF NOT EXISTS task ( id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                    'name TEXT, deadline TEXT, importance INTEGER, memo TEXT,' +
                    'passedtime INTEGER, endtime TEXT)');
    this.close();
};
