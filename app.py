# Test - cloning

from flask import Flask, render_template, url_for

app = Flask(__name__, static_url_path='/static')

@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/index/search")
def search():
    return render_template("search.html")

# Register Student #
@app.route("/register-student")
def register_student():
    return render_template("register_student.html")

# Register Instructor #
@app.route("/register-instructor")
def register_instructor():
    return render_template("register_instructor.html")

# Sign In #
@app.route("/sign-in")
def sign_in():
    return render_template("sign_in.html")

# Student Portal #
@app.route("/student-index")
def student_portal():
    return render_template("student_index.html")

# Instructor Portal #
@app.route("/instructor-index")
def instructor_portal():
    return render_template("instructor_index.html")

# Student Settings #
@app.route("/student-index/setting")
def student_setting():
    return render_template("student_setting.html")

# Instructor Settings #
@app.route("/instructor-index/setting")
def instructor_setting():
    return render_template("instructor_setting.html")

# Admin Portal #
@app.route("/admin-portal")
def admin_portal():
    return render_template("admin_portal.html")

# Admin Index #
@app.route("/admin-index")
def admin_index():
    return render_template("admin_index.html")

# Course Page#
@app.route("/course")
def course():
    return render_template("course.html")

# Course Setting#
@app.route("/course-setting")
def course_setting():
    return render_template("course_setting.html")

# Course Update#
@app.route("/course-update")
def course_update():
    return render_template("course_update.html")

# Course Attending#
@app.route("/course/title/<title>")
def course_attend(title):
    return render_template("course_title.html",title=title)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)