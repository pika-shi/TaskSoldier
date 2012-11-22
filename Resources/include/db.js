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
    // create table
    this.open();
    // time -> YYYY-MM-DD HH:MM:SS
    //this.db.execute('DROP TABLE task');
    this.db.execute('CREATE TABLE IF NOT EXISTS task ( id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                    'name TEXT, deadline TEXT, importance INTEGER, memo TEXT,' +
                    'passedtime TEXT, endtime TEXT, endflag INTEGER)');
    this.close();
};
