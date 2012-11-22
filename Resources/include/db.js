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
    // create table
    this.open();
    // time -> YYYY-MM-DD HH:MM:SS
    this.db.execute('CREATE TABLE IF NOT EXISTS task ( id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                    'name TEXT, deadline TEXT, importance INTEGER, memo TEXT,' +
                    'passedtime TEXT, endtime TEXT, endflag INTEGER)');
    this.close();
};
