import sqlite3
from decouple import config

MYSQL_DB = config('MYSQL_DB')
conn = sqlite3.connect(MYSQL_DB, check_same_thread=False)
cursor = conn.cursor()

