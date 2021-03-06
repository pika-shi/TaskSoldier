var TaskDB = function() {
	this.dbName = 'task';

	this.open = function() {
		this.db = Titanium.Database.open(this.dbName);
	};
	this.close = function() {
		this.db.close();
	};
	this.insertTask = function(record) {
		this.open();
		this.db.execute('INSERT INTO task (name, deadline, importance, memo) VALUES(?,?,?,?)', record.name, record.deadline, record.importance, record.memo);
		row = this.db.execute('SELECT MAX(id) FROM task');
		id = row.field(0);
		this.close();
		return id;
	};

	this.updateTask = function(id, record) {
		this.open();
		this.db.execute('UPDATE task SET name = ?, deadline = ?, importance = ?, memo = ? WHERE id = ?', record.name, record.deadline, record.importance, record.memo, id);
		this.close();
		return id;
	};
	this.deleteTask = function(id) {
		this.open();
		this.db.execute('DELETE FROM task WHERE id = ?', id);
		this.close();
	};

	this.fetchOne = function(id) {
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

	this.fetchPastOne = function(id) {
		this.open();
		row = this.db.execute('SELECT * FROM task WHERE id = ?', id);
		record = {};
		record.name = row.field(1);
		record.deadline = row.field(2);
		record.importance = row.field(3);
		record.memo = row.field(4);
		record.passedtime = row.field(5);
		record.endtime = row.field(6);
		this.close();
		return record;
	};

	this.fetchCell = function(id, attr) {
		this.open();
		cell = this.db.execute('SELECT ' + attr + ' FROM task WHERE id = ?', id).field(0);
		this.close();
		return cell;
	};

	this.updateCell = function(id, attr, val) {
		this.open();
		this.db.execute('UPDATE task SET ' + attr + ' = ? WHERE id = ?', val, id);
		this.close();
	};

	this.fetchToList = function(flag) {// flag = 0:incomplete tasks, 1:completed tasks
		this.open();
		rows = (flag == 0) ? this.db.execute('SELECT id, name, deadline, importance FROM task WHERE endtime IS NULL ORDER BY deadline ASC') : this.db.execute('SELECT id, name, deadline, importance FROM task WHERE endtime IS NOT NULL ORDER BY deadline ASC');
		var records = new Array(0);
		while (rows.isValidRow()) {
			var record = {};
			record.id = rows.field(0);
			record.name = rows.field(1);
			record.deadline = rows.field(2);
			record.importance = rows.field(3);
			records.push(record);
			rows.next();
		}
		this.close();
		return records;
	};

	// create table
	this.open();
	// time -> YYYY-MM-DD HH:MM:SS
	this.db.execute('CREATE TABLE IF NOT EXISTS task ( id INTEGER PRIMARY KEY AUTOINCREMENT,' + 'name TEXT, deadline TEXT, importance INTEGER, memo TEXT,' + 'passedtime INTEGER, endtime TEXT)');
	this.close();
};
