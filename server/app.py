import sqlite3
import os
import uuid
from flask import Flask, request, jsonify, render_template, send_file

# Configuration
DOWNLOAD_PASSWORD = "admin"  # Password for downloading the database

class database:
    def __init__(self):
        # Use absolute path relative to this script
        self.db_path = os.path.join(os.path.dirname(__file__), "database.db")
        self.connection = sqlite3.connect(self.db_path, check_same_thread=False)
        self.cursor = self.connection.cursor()

    def get_or_create_major(self, major_name):
        self.cursor.execute("SELECT idMajor FROM major WHERE majorName = ?", (major_name,))
        res = self.cursor.fetchone()
        if res:
            return res[0]
        new_id = str(uuid.uuid4())
        self.cursor.execute("INSERT INTO major (idMajor, majorName) VALUES (?, ?)", (new_id, major_name))
        self.connection.commit()
        return new_id

    def get_or_create_unit(self, major_id, unit_name):
        self.cursor.execute("SELECT idUnit FROM unit WHERE idMajor = ? AND unitName = ?", (major_id, unit_name))
        res = self.cursor.fetchone()
        if res:
            return res[0]
        new_id = str(uuid.uuid4())
        self.cursor.execute("INSERT INTO unit (idUnit, idMajor, unitName) VALUES (?, ?, ?)", (new_id, major_id, unit_name))
        self.connection.commit()
        return new_id

    def get_or_create_task(self, unit_id, task_name):
        self.cursor.execute("SELECT idTask FROM task WHERE idUnit = ? AND taskName = ?", (unit_id, task_name))
        res = self.cursor.fetchone()
        if res:
            return res[0]
        new_id = str(uuid.uuid4())
        self.cursor.execute("INSERT INTO task (idTask, idUnit, taskName) VALUES (?, ?, ?)", (new_id, unit_id, task_name))
        self.connection.commit()
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
        self.connection.commit()

    def get_full_tree(self):
        try:
            # Fetch all data
            self.cursor.execute("SELECT * FROM major")
            majors = self.cursor.fetchall()
            
            self.cursor.execute("SELECT * FROM unit")
            units = self.cursor.fetchall()
            
            self.cursor.execute("SELECT * FROM task")
            tasks = self.cursor.fetchall()
            
            self.cursor.execute("SELECT * FROM answer")
            answers = self.cursor.fetchall()
            
            # Organize
            tree = []
            
            # Helper to find children - simplified for performance (could be better with dicts but dataset likely small)
            def find_units(major_id):
                return [u for u in units if u[1] == major_id]
                
            def find_tasks(unit_id):
                return [t for t in tasks if t[1] == unit_id]
                
            def find_answers(task_id):
                task_ans = [a for a in answers if a[1] == task_id]
                # Try to sort numerically
                try:
                    task_ans.sort(key=lambda x: int(x[4]) if x[4].isdigit() else float('inf'))
                except:
                    pass
                return task_ans

            for m in majors:
                major_obj = {"name": m[1], "units": []}
                for u in find_units(m[0]):
                    unit_obj = {"name": u[2], "tasks": []}
                    for t in find_tasks(u[0]):
                        task_obj = {"name": t[2], "answers": []}
                        for a in find_answers(t[0]):
                            task_obj["answers"].append({
                                "question": a[3],
                                "questionNumber": a[4],
                                "answer": a[2],
                                "option": a[5]
                            })
                        unit_obj["tasks"].append(task_obj)
                    major_obj["units"].append(unit_obj)
                tree.append(major_obj)
                
            stats = {
                "majors": len(majors),
                "units": len(units),
                "tasks": len(tasks),
                "answers": len(answers)
            }
            
            return tree, stats
        except Exception as e:
            print(f"Error getting tree: {e}")
            return [], {"majors": 0, "units": 0, "tasks": 0, "answers": 0}

app = Flask(__name__)

@app.route("/")
def dashboard():
    db = database()
    tree, stats = db.get_full_tree()
    return render_template("index.html", tree=tree, stats=stats)

@app.route("/download-db", methods=["POST"])
def download_db():
    password = request.form.get("password")
    if password == DOWNLOAD_PASSWORD:
        db_path = os.path.join(os.path.dirname(__file__), "database.db")
        return send_file(db_path, as_attachment=True)
    else:
        db = database()
        tree, stats = db.get_full_tree()
        return render_template("index.html", tree=tree, stats=stats, error="Incorrect Password")

@app.route("/logs", methods=["POST"])
def logs():
    data = request.json
    print(data)
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

if __name__ == "__main__":
    app.run(port=5000, debug=True)
