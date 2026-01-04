import sqlite3
import os

# major -> unit -> task | userID
"""
major :
    idMajor
    majorName

unit:
    idUnit
    idMajor
    unitName

task:
    idTask
    idUnit
    taskName
    answer

user:
    userID,
    Permission (normal | premium)

user_expiry:
    userID
    expiryDate
    startDate
"""

DB_NAME = "database.db"

class InitDB:
    def __init__(self, db_name=DB_NAME):
        self.db_path = os.path.join(os.path.dirname(__file__), db_name)
        self.conn = None
        self.cursor = None

    def connect(self):
        self.conn = sqlite3.connect(self.db_path)
        self.cursor = self.conn.cursor()

    def create_tables(self):
        # Major Table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS major (
                idMajor TEXT PRIMARY KEY,
                majorName TEXT
            )
        """)

        # Unit Table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS unit (
                idUnit TEXT PRIMARY KEY,
                idMajor TEXT,
                unitName TEXT,
                FOREIGN KEY (idMajor) REFERENCES major (idMajor)
            )
        """)

        # Task Table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS task (
                idTask TEXT PRIMARY KEY,
                idUnit TEXT,
                taskName TEXT,
                FOREIGN KEY (idUnit) REFERENCES unit (idUnit)
            )
        """)

        #answer table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS answer (
                idAnswer TEXT PRIMARY KEY,
                idTask TEXT,
                answer TEXT,
                question TEXT,
                questionNumber TEXT,
                option TEXT,
                FOREIGN KEY (idTask) REFERENCES task (idTask)
            )
        """)

        # User Table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS user (
                userID TEXT PRIMARY KEY,
                permission TEXT DEFAULT "normal"
            )
        """)

        # User Expiry Table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_expiry (
                userID TEXT PRIMARY KEY,
                expiryDate TEXT,
                startDate TEXT,
                FOREIGN KEY (userID) REFERENCES user (userID)
            )
        """)
        
        self.conn.commit()
        print("Database structure created successfully.")

    def close(self):
        if self.conn:
            self.conn.close()

    def run(self):
        # Ensure directory exists
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        self.connect()
        self.create_tables()
        self.close()

if __name__ == "__main__":
    db = InitDB()
    db.run()
