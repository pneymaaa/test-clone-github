from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route("/index")
def index():
    return render_template("index.html")

# Register Student #
@app.route("/register-student")
def register_student():
    return render_template("register_student.html")

# Sign In #
@app.route("/sign-in")
def sign_in():
    return render_template("sign_in.html")

# Student Portal #
@app.route("/student-index")
def student_portal():
    return render_template("student_index.html")

# Student Settings #
@app.route("/student-index/setting")
def student_setting():
    return render_template("student_setting.html")

# Admin Portal #
@app.route("/admin-portal")
def admin_portal():
    return render_template("admin_portal.html")

# Admin Index #
@app.route("/admin-index")
def admin_index():
    return render_template("admin_index.html")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)