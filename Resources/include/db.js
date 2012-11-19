var TaskDB = function() {
    this.dbName = 'task';

    this.open = function () {
        this.db = Titanium.Database.open(this.dbName);
    };
    this.close = function () {
        this.db.close();
    };

    // create table
    this.open();
    // time -> YYYY-MM-DD HH:MM:SS
    this.db.execute('CREATE TABLE IF NOT EXISTS task ( id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                    'name TEXT, deadline TEXT, priority INTEGER, memo TEXT, passedtime TEXT,' +
                    'endtime TEXT, endflag INTEGER)');
    this.close();
};
