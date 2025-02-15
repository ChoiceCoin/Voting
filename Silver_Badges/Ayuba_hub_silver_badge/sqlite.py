import sqlite3 as sl

con = sl.connect('voters.db')

with con:
    con.execute("""CREATE TABLE USER (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            DL VARCHAR(300),
            SS VARCHAR(300)
        );""")
    con.commit()