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
                majorName TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # 1. DB Updates Log Table (New)
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS db_updates_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                message TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Migration: Add updated_at to Major if missing
        try:
             self.cursor.execute("ALTER TABLE major ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP")
        except: pass

        # Unit Table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS unit (
                idUnit TEXT PRIMARY KEY,
                idMajor TEXT,
                unitName TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (idMajor) REFERENCES major (idMajor)
            )
        """)
        # Migration: Add updated_at to Unit if missing
        try:
             self.cursor.execute("ALTER TABLE unit ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP")
        except: pass

        # Task Table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS task (
                idTask TEXT PRIMARY KEY,
                idUnit TEXT,
                taskName TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (idUnit) REFERENCES unit (idUnit)
            )
        """)
        # Migration: Add updated_at to Task if missing
        try:
             self.cursor.execute("ALTER TABLE task ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP")
        except: pass

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

        # Comments Table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS comments (
                id TEXT PRIMARY KEY,
                parent_id TEXT,
                content TEXT,
                author_name TEXT,
                author_avatar TEXT,
                author_ip TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                reactions TEXT DEFAULT '{}'
            )
        """)
        
        # Check if author_ip exists in comments (migration for existing db)
        try:
            self.cursor.execute("ALTER TABLE comments ADD COLUMN author_ip TEXT")
        except:
            pass

        # Check if image_path exists in comments (migration for image uploads)
        try:
            self.cursor.execute("ALTER TABLE comments ADD COLUMN image_path TEXT")
        except:
            pass

        # Anonymous Users Table (IP -> Identity)
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS anonymous_users (
                ip_address TEXT PRIMARY KEY,
                name TEXT,
                avatar TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Notifications Table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS notifications (
                id TEXT PRIMARY KEY,
                user_ip TEXT,
                message TEXT,
                ctx_link TEXT,
                is_read INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Comment Reactions Table (New)
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS comment_reactions (
                id TEXT PRIMARY KEY,
                comment_id TEXT,
                user_ip TEXT,
                reaction_type TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (comment_id) REFERENCES comments (id),
                UNIQUE(comment_id, user_ip, reaction_type)
            )
        """)

        # ---------------------------------------------------------
        # MIGRATION: 
        # Add author_ip to comments if not exists (already done above)
        # We don't need to migrate old JSON reactions necessarily as user expects "one user one vote"
        # ---------------------------------------------------------
        
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
