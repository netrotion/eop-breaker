import sqlite3
import os
import uuid
import json
import random
import re
from flask import Flask, request, jsonify, render_template, send_file, send_from_directory, g
from werkzeug.utils import secure_filename

# Configuration
DOWNLOAD_PASSWORD = "admin"  # Password for downloading the database
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'jfif'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

class DatabaseInternal:
    def __init__(self, cursor):
        self.cursor = cursor

    def get_or_create_major(self, major_name):
        self.cursor.execute("SELECT idMajor FROM major WHERE majorName = ?", (major_name,))
        res = self.cursor.fetchone()
        if res:
            return res[0]
        new_id = str(uuid.uuid4())
        self.cursor.execute("INSERT INTO major (idMajor, majorName) VALUES (?, ?)", (new_id, major_name))
        return new_id

    def get_or_create_unit(self, major_id, unit_name):
        self.cursor.execute("SELECT idUnit FROM unit WHERE idMajor = ? AND unitName = ?", (major_id, unit_name))
        res = self.cursor.fetchone()
        if res:
            return res[0]
        new_id = str(uuid.uuid4())
        self.cursor.execute("INSERT INTO unit (idUnit, idMajor, unitName) VALUES (?, ?, ?)", (new_id, major_id, unit_name))
        return new_id

    def get_or_create_task(self, unit_id, task_name):
        self.cursor.execute("SELECT idTask FROM task WHERE idUnit = ? AND taskName = ?", (unit_id, task_name))
        res = self.cursor.fetchone()
        if res:
            return res[0]
        new_id = str(uuid.uuid4())
        self.cursor.execute("INSERT INTO task (idTask, idUnit, taskName) VALUES (?, ?, ?)", (new_id, unit_id, task_name))
        return new_id

    def upsert_answer(self, task_id, answer_text, question, question_number, option):
        # Check if exists (using question and questionNumber as unique identifier within a task)
        self.cursor.execute("SELECT idAnswer FROM answer WHERE idTask = ? AND questionNumber = ? AND question = ?", (task_id, question_number, question))
        res = self.cursor.fetchone()
        if res:
            # Update
            self.cursor.execute("UPDATE answer SET answer = ?, option = ? WHERE idAnswer = ?", (answer_text, option, res[0]))
        else:
            # Insert
            new_id = str(uuid.uuid4())
            self.cursor.execute("INSERT INTO answer (idAnswer, idTask, answer, question, questionNumber, option) VALUES (?, ?, ?, ?, ?, ?)", (new_id, task_id, answer_text, question, question_number, option))

    def log_db_update(self, message):
        try:
            self.cursor.execute("INSERT INTO db_updates_log (message) VALUES (?)", (message,))
        except Exception: 
            pass # Non-critical

    def upsert_unit(self, unit_id, unit_name):
        self.cursor.execute("SELECT idUnit FROM unit WHERE idUnit = ?", (unit_id,))
        res = self.cursor.fetchone()
        if res:
            self.cursor.execute("UPDATE unit SET unitName = ?, updated_at = CURRENT_TIMESTAMP WHERE idUnit = ?", (unit_name, unit_id))
            self.log_db_update(f"Updated Unit: {unit_name}")
        else:
            self.cursor.execute("INSERT INTO unit (idUnit, unitName) VALUES (?, ?)", (unit_id, unit_name))
            self.log_db_update(f"Created Unit: {unit_name}")

    def upsert_task(self, task_id, task_name):
        self.cursor.execute("SELECT idTask FROM task WHERE idTask = ?", (task_id,))
        res = self.cursor.fetchone()
        if res:
            self.cursor.execute("UPDATE task SET taskName = ?, updated_at = CURRENT_TIMESTAMP WHERE idTask = ?", (task_name, task_id))
            self.log_db_update(f"Updated Task: {task_name}")
        else:
            self.cursor.execute("INSERT INTO task (idTask, taskName) VALUES (?, ?)", (task_id, task_name))
            self.log_db_update(f"Created Task: {task_name}")

    def upsert_major(self, major_id, major_name):
        self.cursor.execute("SELECT idMajor FROM major WHERE idMajor = ?", (major_id,))
        res = self.cursor.fetchone()
        if res:
            self.cursor.execute("UPDATE major SET majorName = ?, updated_at = CURRENT_TIMESTAMP WHERE idMajor = ?", (major_name, major_id))
            self.log_db_update(f"Updated Major: {major_name}")
        else:
            self.cursor.execute("INSERT INTO major (idMajor, majorName) VALUES (?, ?)", (major_id, major_name))
            self.log_db_update(f"Created Major: {major_name}")

    def get_stats(self):
        try:
            self.cursor.execute("SELECT COUNT(*) FROM major")
            majors_count = self.cursor.fetchone()[0]
            self.cursor.execute("SELECT COUNT(*) FROM unit")
            units_count = self.cursor.fetchone()[0]
            self.cursor.execute("SELECT COUNT(*) FROM task")
            tasks_count = self.cursor.fetchone()[0]
            self.cursor.execute("SELECT COUNT(*) FROM answer")
            answers_count = self.cursor.fetchone()[0]
            return {
                "majors": majors_count,
                "units": units_count,
                "tasks": tasks_count,
                "answers": answers_count
            }
        except:
            return {"majors": 0, "units": 0, "tasks": 0, "answers": 0}

    def get_majors(self):
        self.cursor.execute("SELECT idMajor, majorName, updated_at FROM major")
        majors = [{"id": row[0], "name": row[1], "updated_at": row[2]} for row in self.cursor.fetchall()]
        
        for m in majors:
            # Direct children (Units)
            self.cursor.execute("SELECT COUNT(*) FROM unit WHERE idMajor = ?", (m['id'],))
            m['unit_count'] = self.cursor.fetchone()[0]
            
            # Total descendants (Units + Tasks)
            # tasks count
            self.cursor.execute("SELECT COUNT(*) FROM task t JOIN unit u ON t.idUnit = u.idUnit WHERE u.idMajor = ?", (m['id'],))
            task_count = self.cursor.fetchone()[0]
            
            m['task_count'] = task_count
            m['total_folders'] = m['unit_count'] + task_count
            
        return majors

    def get_units(self, major_id):
        self.cursor.execute("SELECT idUnit, unitName, updated_at FROM unit WHERE idMajor = ?", (major_id,))
        units = [{"id": row[0], "name": row[1], "updated_at": row[2]} for row in self.cursor.fetchall()]
        
        for u in units:
            # Direct children (Tasks)
            self.cursor.execute("SELECT COUNT(*) FROM task WHERE idUnit = ?", (u['id'],))
            u['task_count'] = self.cursor.fetchone()[0]
            u['total_folders'] = u['task_count'] # Tasks are the last level of "folders"
            
        return units

    def get_tasks(self, unit_id):
        self.cursor.execute("SELECT idTask, taskName, updated_at FROM task WHERE idUnit = ?", (unit_id,))
        return [{"id": row[0], "name": row[1], "updated_at": row[2]} for row in self.cursor.fetchall()]

    def get_db_logs(self, page=1, limit=50):
        offset = (page - 1) * limit
        self.cursor.execute("SELECT message, created_at FROM db_updates_log ORDER BY created_at DESC LIMIT ? OFFSET ?", (limit, offset))
        return [{"message": row[0], "created_at": row[1]} for row in self.cursor.fetchall()]

    def get_answers(self, task_id):
        self.cursor.execute("SELECT answer, question, questionNumber, option FROM answer WHERE idTask = ?", (task_id,))
        rows = self.cursor.fetchall()
        # Sort by questionNumber if possible
        try:
            rows.sort(key=lambda x: int(x[2]) if x[2].isdigit() else float('inf'))
        except:
            pass
        return [{"answer": r[0], "question": r[1], "questionNumber": r[2], "option": r[3]} for r in rows]

    def get_identity(self, ip_address):
        self.cursor.execute("SELECT name, avatar FROM anonymous_users WHERE ip_address = ?", (ip_address,))
        row = self.cursor.fetchone()
        
        if row:
            return {"name": row[0], "avatar": row[1]}
        
        # Create new identity
        adjectives = ["Happy", "Lucky", "Sunny", "Clever", "Brave", "Calm", "Eager", "Fierce", "Gentle", "Jolly", "Kind", "Lively", "Proud", "Silly", "Witty", "Mysterious", "Silent", "Rapid", "Grand", "Magic"]
        animals = ["Panda", "Tiger", "Eagle", "Dolphin", "Fox", "Bear", "Wolf", "Owl", "Cat", "Dog", "Lion", "Koala", "Rabbit", "Hawk", "Deer", "Dragon", "Phoenix", "Shark", "Whale", "Lynx"]
        
        name = f"{random.choice(adjectives)} {random.choice(animals)}"
        avatar_seed = name.replace(" ", "") + str(random.randint(0, 1000))
        avatar = f"https://api.dicebear.com/7.x/pixel-art/svg?seed={avatar_seed}"
        
        try:
            self.cursor.execute("INSERT INTO anonymous_users (ip_address, name, avatar) VALUES (?, ?, ?)", (ip_address, name, avatar))
        except:
            # Fallback if race condition or collision (simple ignore)
            pass
            
        return {"name": name, "avatar": avatar}

    def add_comment(self, content, author_ip, parent_id=None, is_admin_post=False, image_path=None):
        if is_admin_post:
            name = "Admin"
            avatar = "https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff&size=128"
        else:
            identity = self.get_identity(author_ip)
            name = identity["name"]
            avatar = identity["avatar"]
        
        new_id = str(uuid.uuid4())
        self.cursor.execute("INSERT INTO comments (id, parent_id, content, author_name, author_avatar, author_ip, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                           (new_id, parent_id, content, name, avatar, author_ip, image_path))
        
        # Notifications Logic
        try:
            # 1. Notify parent author if reply
            if parent_id:
                self.cursor.execute("SELECT author_ip, author_name FROM comments WHERE id = ?", (parent_id,))
                parent = self.cursor.fetchone()
                
                if parent:
                    target_ip, target_name = parent
                    # Notify if different IP OR different Name (allows local testing)
                    if target_ip != author_ip or target_name != name:
                        self.add_notification(target_ip, "replied to your comment", new_id)

            # 2. Notify mentioned users (@Name)
            mentions = re.findall(r'@([A-Za-z]+ [A-Za-z]+)', content)
            for mentioned_name in mentions:
                self.cursor.execute("SELECT ip_address FROM anonymous_users WHERE name = ?", (mentioned_name,))
                target = self.cursor.fetchone()
                if target:
                     # Check if target is not self (IP check usually suffices for anonymous)
                     if target[0] != author_ip:
                        self.add_notification(target[0], "mentioned you in a comment", new_id)

        except Exception as e:
            print(f"Notification error: {e}")

        # Parse image_path for response
        images = []
        if image_path:
            try:
                if image_path.startswith('['):
                    images = json.loads(image_path)
                else:
                    images = [image_path]
            except:
                images = [image_path]

        return {
            "id": new_id,
            "parent_id": parent_id,
            "content": content,
            "author_name": name,
            "author_avatar": avatar,
            "image_path": image_path, 
            "images": images, # Parsed list for frontend
            "created_at": "Just now",
            "reactions": {}
        }

    def add_notification(self, target_ip, message, ctx_link):
        nid = str(uuid.uuid4())
        self.cursor.execute("INSERT INTO notifications (id, user_ip, message, ctx_link) VALUES (?, ?, ?, ?)",
                            (nid, target_ip, message, ctx_link))

    def get_notifications(self, user_ip):
        # Join with comments to get the replier's details (Avatar, Name)
        # ctx_link for REPLY/MENTION is the comment ID.
        self.cursor.execute("""
            SELECT n.id, n.message, n.ctx_link, n.is_read, n.created_at, 
                   c.author_name, c.author_avatar, c.parent_id
            FROM notifications n
            LEFT JOIN comments c ON n.ctx_link = c.id
            WHERE n.user_ip = ?
            ORDER BY n.created_at DESC LIMIT 20
        """, (user_ip,))
        
        rows = self.cursor.fetchall()
        results = []
        for r in rows:
            results.append({
                "id": r[0],
                "action": r[1], # "replied to..."
                "ctx_link": r[2],
                "is_read": r[3],
                "created_at": r[4],
                "sender_name": r[5],
                "sender_avatar": r[6],
                "parent_id": r[7]
            })
        return results

    def mark_notifications_read(self, user_ip):
        self.cursor.execute("UPDATE notifications SET is_read = 1 WHERE user_ip = ?", (user_ip,))

    def delete_comment(self, comment_id):
        # Recursive delete
        self.cursor.execute("SELECT id FROM comments WHERE parent_id = ?", (comment_id,))
        replies = self.cursor.fetchall()
        for r in replies:
            self.delete_comment(r[0])
            
        self.cursor.execute("DELETE FROM comments WHERE id = ?", (comment_id,))
        self.cursor.execute("DELETE FROM comment_reactions WHERE comment_id = ?", (comment_id,))
        self.cursor.execute("DELETE FROM notifications WHERE ctx_link = ?", (comment_id,))

    def add_reaction(self, comment_id, reaction_type, user_ip):
        # 1. Check if reaction exists
        self.cursor.execute("SELECT id FROM comment_reactions WHERE comment_id=? AND user_ip=? AND reaction_type=?", 
                           (comment_id, user_ip, reaction_type))
        existing = self.cursor.fetchone()
        
        action = None
        if existing:
            # Remove (Toggle OFF)
            self.cursor.execute("DELETE FROM comment_reactions WHERE id=?", (existing[0],))
            action = "removed"
        else:
            # Add (Toggle ON)
            new_id = str(uuid.uuid4())
            self.cursor.execute("INSERT INTO comment_reactions (id, comment_id, user_ip, reaction_type) VALUES (?, ?, ?, ?)",
                               (new_id, comment_id, user_ip, reaction_type))
            action = "added"
            
        
        # 2. Get updated count for this specific reaction type
        self.cursor.execute("SELECT COUNT(*) FROM comment_reactions WHERE comment_id=? AND reaction_type=?", (comment_id, reaction_type))
        count = self.cursor.fetchone()[0]
        
        return {reaction_type: count, "action": action, "user_reacted": action == "added"} # New response format

    def get_user_reactions(self, comment_id, user_ip):
        # Helper to get list of reactions this user has explicitly toggled ON
        self.cursor.execute("SELECT reaction_type FROM comment_reactions WHERE comment_id=? AND user_ip=?", (comment_id, user_ip))
        return [row[0] for row in self.cursor.fetchall()]

    def get_comments(self, user_ip=None, page=1, limit=10, sort_by="newest"):
        offset = (page - 1) * limit
        
        # 1. Get Total Roots Count
        self.cursor.execute("SELECT COUNT(*) FROM comments WHERE parent_id IS NULL")
        total_roots = self.cursor.fetchone()[0]
        
        # 2. Get Paginated Roots
        # Note: image_path is at index 7 now
        query = "SELECT c.id, c.parent_id, c.content, c.author_name, c.author_avatar, c.author_ip, c.created_at, c.image_path FROM comments c"
        
        # Joins
        if sort_by == "popular":
             query += """
                LEFT JOIN (SELECT comment_id, COUNT(*) as count FROM comment_reactions GROUP BY comment_id) r 
                ON c.id = r.comment_id
            """

        # Where
        query += " WHERE c.parent_id IS NULL"

        # Order By
        if sort_by == "popular":
             query += " ORDER BY r.count DESC, c.created_at DESC"
        elif sort_by == "oldest":
            query += " ORDER BY c.created_at ASC"
        else: # newest
            query += " ORDER BY c.created_at DESC"
            
        # Limit
        query += f" LIMIT {limit} OFFSET {offset}"
        
        self.cursor.execute(query)
        root_rows = self.cursor.fetchall()
        
        # Helper to format comment dict
        def format_comment(row, children=[]):
            comment_id = row[0]
            # Fetch counts
            self.cursor.execute("SELECT reaction_type, COUNT(*) FROM comment_reactions WHERE comment_id=? GROUP BY reaction_type", (comment_id,))
            counts = dict(self.cursor.fetchall())
            
            user_reactions = []
            if user_ip:
                user_reactions = self.get_user_reactions(comment_id, user_ip)
            
            # Smart Image Parsing
            raw_images = row[7] if len(row) > 7 else None
            images = []
            if raw_images:
                try:
                    if raw_images.startswith('['): # JSON List
                         images = json.loads(raw_images)
                    else: # Legacy single path
                         images = [raw_images]
                except:
                     images = [raw_images]

            return {
                "id": comment_id,
                "parent_id": row[1],
                "content": row[2],
                "author_name": row[3],
                "author_avatar": row[4],
                "author_ip": row[5], 
                "created_at": row[6],
                "images": images, 
                "reactions": counts,
                "user_reactions": user_reactions,
                "children": children
            }

        comments_tree = []
        
        if root_rows:
            # 3. Get Reply Counts for these roots (instead of full objects)
            root_ids = [r[0] for r in root_rows]
            placeholders = ','.join(['?'] * len(root_ids))
            
            self.cursor.execute(f"SELECT parent_id, COUNT(*) FROM comments WHERE parent_id IN ({placeholders}) GROUP BY parent_id", root_ids)
            counts_map = dict(self.cursor.fetchall())
            
            # 4. Get Avatars for preview (limit 3 per parent) 
            # This is complex in one query, so simple approach: separate query or simple loop?
            # Optimal: SELECT parent_id, author_avatar FROM comments WHERE parent_id IN (...)
            # But let's just use a separate endpoint for details if needed, 
            # OR just return count for now and let frontend fetch details on expand?
            # The UI asks for "mini avatars". If I don't pre-load them, I can't show them.
            # Let's keep it simple: Return count only. If user wants avatars, they load replies.
            # OR fetch 3 avatars per parent.
            
            # Let's try to get avatars efficiently? 
            # SELECT parent_id, author_avatar FROM comments WHERE parent_id IN (...)
            self.cursor.execute(f"SELECT parent_id, author_name, author_avatar FROM comments WHERE parent_id IN ({placeholders}) ORDER BY created_at ASC", root_ids)
            all_replies_meta = self.cursor.fetchall()
            
            replies_meta_map = {} # parent_id -> [{avatar, name}]
            for r in all_replies_meta:
                 pid = r[0]
                 if pid not in replies_meta_map: replies_meta_map[pid] = []
                 if len(replies_meta_map[pid]) < 3: # Limit 3
                     replies_meta_map[pid].append({"author_name": r[1], "author_avatar": r[2]})

            # Build final tree
            for row in root_rows:
                root_id = row[0]
                reply_count = counts_map.get(root_id, 0)
                preview_replies = replies_meta_map.get(root_id, [])
                
                # Format comment but inject reply info
                comment_dict = format_comment(row, [])
                comment_dict['reply_count'] = reply_count
                comment_dict['preview_replies'] = preview_replies # List of {name, avatar}
                comments_tree.append(comment_dict)

        has_more = (offset + limit) < total_roots
            
        return {"comments": comments_tree, "has_more": has_more, "total": total_roots}

    def get_replies(self, parent_id, user_ip=None):
        # Fetch all replies for a specific parent
        self.cursor.execute("SELECT c.id, c.parent_id, c.content, c.author_name, c.author_avatar, c.author_ip, c.created_at, c.image_path FROM comments c WHERE c.parent_id = ? ORDER BY c.created_at ASC", (parent_id,))
        rows = self.cursor.fetchall()
        
        results = []
        for row in rows:
            comment_id = row[0]
            self.cursor.execute("SELECT reaction_type, COUNT(*) FROM comment_reactions WHERE comment_id=? GROUP BY reaction_type", (comment_id,))
            counts = dict(self.cursor.fetchall())
            
            user_reactions = []
            if user_ip:
                 user_reactions = self.get_user_reactions(comment_id, user_ip)

            # Simple parsing
            raw_images = row[7] if len(row) > 7 else None
            images = []
            if raw_images:
                try:
                    if raw_images.startswith('['): images = json.loads(raw_images)
                    else: images = [raw_images]
                except: images = [raw_images]
                
            results.append({
                "id": comment_id,
                "parent_id": row[1],
                "content": row[2],
                "author_name": row[3],
                "author_avatar": row[4],
                "author_ip": row[5], 
                "created_at": row[6],
                "images": images, 
                "reactions": counts,
                "user_reactions": user_reactions,
                "children": [] 
            })
            
        return results

    def get_comment(self, comment_id, user_ip=None):
        query = "SELECT c.id, c.parent_id, c.content, c.author_name, c.author_avatar, c.author_ip, c.created_at, c.image_path FROM comments c WHERE c.id = ?"
        self.cursor.execute(query, (comment_id,))
        row = self.cursor.fetchone()
        if not row: return None
        
        # Helper reuse or duplicate logic? Duplicate for safety/speed
        self.cursor.execute("SELECT reaction_type, COUNT(*) FROM comment_reactions WHERE comment_id=? GROUP BY reaction_type", (comment_id,))
        counts = dict(self.cursor.fetchall())
        
        user_reactions = []
        if user_ip:
             user_reactions = self.get_user_reactions(comment_id, user_ip)
             
        raw_images = row[7] if len(row) > 7 else None
        images = []
        if raw_images:
            try:
                if raw_images.startswith('['): images = json.loads(raw_images)
                else: images = [raw_images]
            except: images = [raw_images]
            
        # Get reply count context if it is a root
        reply_count = 0
        if not row[1]: # Is root
             self.cursor.execute("SELECT COUNT(*) FROM comments WHERE parent_id = ?", (comment_id,))
             reply_count = self.cursor.fetchone()[0]

        return {
            "id": row[0],
            "parent_id": row[1],
            "content": row[2],
            "author_name": row[3],
            "author_avatar": row[4],
            "author_ip": row[5], 
            "created_at": row[6],
            "images": images, 
            "reactions": counts,
            "user_reactions": user_reactions,
            "children": [],
            "reply_count": reply_count
        }

    def get_thread_path(self, comment_id):
        # Returns list of comments from Root to Target [Root, Child, Target]
        path = []
        curr = comment_id
        while curr:
            self.cursor.execute("SELECT id, parent_id FROM comments WHERE id = ?", (curr,))
            row = self.cursor.fetchone()
            if not row: break
            path.insert(0, row[0]) # Prepend
            curr = row[1] # Move to parent
        return path

    def add_reaction(self, comment_id, reaction_type, user_ip):
        # 1. Check if reaction exists
        self.cursor.execute("SELECT id FROM comment_reactions WHERE comment_id=? AND user_ip=? AND reaction_type=?", 
                           (comment_id, user_ip, reaction_type))
        existing = self.cursor.fetchone()
        
        action = None
        if existing:
            # Remove (Toggle OFF)
            self.cursor.execute("DELETE FROM comment_reactions WHERE id=?", (existing[0],))
            action = "removed"
        else:
            # Add (Toggle ON)
            new_id = str(uuid.uuid4())
            self.cursor.execute("INSERT INTO comment_reactions (id, comment_id, user_ip, reaction_type) VALUES (?, ?, ?, ?)",
                               (new_id, comment_id, user_ip, reaction_type))
            action = "added"
            
        
        # 2. Get updated count for this specific reaction type
        self.cursor.execute("SELECT COUNT(*) FROM comment_reactions WHERE comment_id=? AND reaction_type=?", (comment_id, reaction_type))
        count = self.cursor.fetchone()[0]
        
        return {reaction_type: count, "action": action, "user_reacted": action == "added"}

app = Flask(__name__)

DB_PATH = os.path.join(os.path.dirname(__file__), "database.db")

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB_PATH, check_same_thread=False)
        db.execute("PRAGMA journal_mode=WAL")
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

class database:
    def __getattr__(self, name):
        def wrapper(*args):
            db_conn = get_db()
            cursor = db_conn.cursor()
            db_internal = DatabaseInternal(cursor)
            func = getattr(db_internal, name)
            result = func(*args)
            db_conn.commit()
            return result
        return wrapper

@app.route("/")
def dashboard():
    return render_template("index.html")

@app.route("/mobile")
def mobile_dashboard():
    return render_template("mobile.html")

@app.route("/api/stats")
def api_stats():
    db = database()
    return jsonify(db.get_stats())

@app.route("/api/majors")
def api_majors():
    db = database()
    return jsonify(db.get_majors())

@app.route("/api/units/<major_id>")
def api_units(major_id):
    db = database()
    return jsonify(db.get_units(major_id))

@app.route("/api/tasks/<unit_id>")
def api_tasks(unit_id):
    db = database()
    return jsonify(db.get_tasks(unit_id))

@app.route("/api/answers/<task_id>")
def api_answers(task_id):
    db = database()
    return jsonify(db.get_answers(task_id))

@app.route("/api/logs/db_updates")
def api_db_updates():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 20, type=int)
    db = database()
    return jsonify(db.get_db_logs(page, limit))

import jwt
import datetime

SECRET_KEY = "your-secret-key-change-it-in-prod" # In a real app, use env var

def verify_jwt(token_header):
    if not token_header:
        return None
    try:
        if token_header.startswith("Bearer "):
            token = token_header.split(" ")[1]
        else:
            token = token_header
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None



@app.route("/api/comments/<comment_id>", methods=["DELETE"])
def api_delete_comment(comment_id):
    db = database()
    token = request.headers.get("Authorization")
    
    # Old simple check fallback or purely JWT? Let's use JWT.
    payload = verify_jwt(token)
    if not payload or payload.get("sub") != "admin":
         return jsonify({"error": "Unauthorized"}), 401
    
    db.delete_comment(comment_id)
    return jsonify({"status": "deleted"})

@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.json
    password = data.get("password")
    if password == DOWNLOAD_PASSWORD:
        token = jwt.encode({
            "sub": "admin",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm="HS256")
        return jsonify({"token": token, "status": "success"})
    return jsonify({"error": "Invalid password"}), 401

@app.route("/api/comments/<comment_id>/react", methods=["POST"])
def api_react(comment_id):
    db = database()
    data = request.json
    reaction_type = data.get("type")
    if not reaction_type:
        return jsonify({"error": "Type required"}), 400
    
    # Get IP for reaction owner
    if request.headers.getlist("X-Forwarded-For"):
       ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
       ip = request.remote_addr

    try:
        updated_state = db.add_reaction(comment_id, reaction_type, ip)
        return jsonify(updated_state)
    except Exception as e:
        print(f"Reaction Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# API Endpoints
@app.route("/api/comments", methods=["GET", "POST"])
def api_comments():
    db = database()
    
    # Get IP to check user_reactions status
    if request.headers.getlist("X-Forwarded-For"):
       user_ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
       user_ip = request.remote_addr

    if request.method == "GET":
        page = int(request.args.get("page", 1))
        limit = int(request.args.get("limit", 10))
        sort_by = request.args.get("sort", "newest")
        
        return jsonify(db.get_comments(user_ip, page, limit, sort_by))

    if request.method == "POST":
        # Handle Multipart Form Data for Images
        content = request.form.get("content")
        parent_id = request.form.get("parent_id") # Optional
        as_admin_str = request.form.get("as_admin") 
        as_admin = as_admin_str == 'true'
        
        # JSON Fallback (if no image/legacy)
        if not content and request.is_json:
             data = request.json
             content = data.get("content")
             parent_id = data.get("parent_id")
             as_admin = data.get("as_admin")

        # Handle Images (Multiple)
        image_paths = []
        if 'images' in request.files:
            files = request.files.getlist('images')
            for file in files:
                if file and file.filename != '' and '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
                    filename = secure_filename(file.filename)
                    unique_name = str(uuid.uuid4()) + "_" + filename
                    file.save(os.path.join(UPLOAD_FOLDER, unique_name))
                    image_paths.append("/uploads/" + unique_name)
        elif 'image' in request.files: # Legacy single file support
             file = request.files['image']
             if file and file.filename != '' and '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
                filename = secure_filename(file.filename)
                unique_name = str(uuid.uuid4()) + "_" + filename
                file.save(os.path.join(UPLOAD_FOLDER, unique_name))
                image_paths.append("/uploads/" + unique_name)

        if not content and not image_paths:
            return jsonify({"error": "Content or image required"}), 400

        # Store as JSON list string
        image_path_value = json.dumps(image_paths) if image_paths else None

        # Admin Logic
        if as_admin:
            token_header = request.headers.get("Authorization")
            payload = verify_jwt(token_header)
            if not payload or payload.get("sub") != "admin":
                 return jsonify({"error": "Unauthorized admin"}), 401

        # Add comment
        new_comment = db.add_comment(content, user_ip, parent_id, as_admin, image_path_value)
        return jsonify(new_comment)

@app.route("/api/verify_token", methods=["GET"])
def api_verify_token():
    token = request.headers.get("Authorization")
    payload = verify_jwt(token)
    if payload and payload.get("sub") == "admin":
        return jsonify({"status": "valid"})
    return jsonify({"status": "invalid"}), 401

@app.route("/api/notifications", methods=["GET", "POST"])
def api_notifications():
    db = database()
    if request.headers.getlist("X-Forwarded-For"):
       ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
       ip = request.remote_addr

    if request.method == "GET":
        return jsonify(db.get_notifications(ip))
    else:
        db.mark_notifications_read(ip)
        return jsonify({"status": "success"})

@app.route("/api/identity", methods=["GET"])
def api_identity():
    db = database()
    if request.headers.getlist("X-Forwarded-For"):
       ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
       ip = request.remote_addr
    return jsonify(db.get_identity(ip))

@app.route("/api/download", methods=["POST"])
def download_db():
    data = request.json
    password = data.get("password") if data else None
    
    if not password:
        password = request.form.get("password")

    if password == DOWNLOAD_PASSWORD:
        db_path = os.path.join(os.path.dirname(__file__), "database.db")
        return send_file(db_path, as_attachment=True)
    else:
        return jsonify({"status": "error", "message": "Incorrect Password"}), 401

@app.route("/api/comments/<comment_id>/replies", methods=["GET"])
def api_replies(comment_id):
    db = database()
    if request.headers.getlist("X-Forwarded-For"):
       ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
       ip = request.remote_addr
    return jsonify(db.get_replies(comment_id, ip))

@app.route("/api/comments/<comment_id>", methods=["GET"])
def api_get_comment(comment_id):
    db = database()
    if request.headers.getlist("X-Forwarded-For"):
       ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
       ip = request.remote_addr
    comment = db.get_comment(comment_id, ip)
    if comment: return jsonify(comment)
    return jsonify({"error": "Not found"}), 404

@app.route("/api/comments/<comment_id>/trace", methods=["GET"])
def api_trace_comment(comment_id):
    db = database()
    return jsonify(db.get_thread_path(comment_id))

@app.route("/logs/answers", methods=["POST"])
def logs():
    data = request.json
    try:
        ispremium = data.get("fullContent", 0)
        
        major = data["major"]
        unit = data["unit"]
        task = data["task"]
        
        db = database()
        
        major_id = db.get_or_create_major(major)
        unit_id = db.get_or_create_unit(major_id, unit)
        task_id = db.get_or_create_task(unit_id, task)
        
        if ispremium:
            answers = data["answers"]
            for item in answers:
                question = item["question"]
                questionNumber = item["questionNumber"]
                ans_text = item["answer"]
                option = item["option"]
                db.upsert_answer(task_id, ans_text, question, questionNumber, option)
        
        return jsonify({"status": "success"}), 200
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "error": str(e)}), 404

@app.route("/api/sync/clones", methods=["POST"])
def sync_clones():
    try:
        data = request.json
        major_name = data.get("major", "Unknown Course")
        units_data = data.get("units", {})

        # Access database instance
        db = database()
        
        # 1. Major
        major_id = db.get_or_create_major(major_name)
        db.upsert_major(major_id, major_name) # Ensure timestamp update

        # 2. Units
        count_units = 0
        count_tasks = 0
        
        for unit_name, tasks in units_data.items():
            unit_id = db.get_or_create_unit(major_id, unit_name)
            db.upsert_unit(unit_id, unit_name)
            count_units += 1

            # 3. Tasks
            for task_name in tasks:
                task_id = db.get_or_create_task(unit_id, task_name)
                db.upsert_task(task_id, task_name)
                count_tasks += 1

        db.log_db_update(f"Synced Clone Data: {major_name} ({count_units} units, {count_tasks} tasks)")
        return jsonify({"status": "success", "units_synced": count_units, "tasks_synced": count_tasks}), 200

    except Exception as e:
        print(f"Sync error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/logs/length", methods=["POST"])
def logs_answer():
    data = request.json
    try:
        #only update major and unit
        major = data["major"]
        unit = data["unit"] # list
        
        db = database()
        major_id = db.get_or_create_major(major)
        for item in unit:
            unit_id = db.get_or_create_unit(major_id, item)
            db.upsert_unit(unit_id, item)
        db.upsert_major(major_id, major)

        return jsonify({"status": "success"}), 200
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "error": str(e)}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
