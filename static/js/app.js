                //------ index.html ------//

    // List Course
    function listCourses() {
    const h2 = document.getElementById("hC2");
    h2.innerHTML = "List Course :";

    const url = 'http://127.0.0.1:5000/elearning/courses'
    fetch(url)
    .then(response => response.json())
    .then(json => renderJson(json))
    }

    function renderJson(json) {
        const row = document.createElement("div");
        row.classList.add("row");
        const listCourse = document.getElementById("sCourses");
        listCourse.innerHTML = "";
        for (const data of json) {
            const h3 = document.createElement("h3");
            const p = document.createElement("p");
            const img = document.createElement("img");
            
            const column = document.createElement("button");
            const content = document.createElement("div");
            
            column.id = data["course_id"]
            column.classList.add("column");
            content.classList.add("content");
           
            img.src = data.img_src;
            img.alt = data.title;
            img.title = data.title;
            h3.innerHTML = data.title;
            p.innerHTML = data.description;

            content.append(img, h3, p);
            column.append(content);
            row.append(column);
            listCourse.append(row);

            column.addEventListener("click", function(e){
                e.preventDefault;
                let courseid = this.getAttribute("id");
                const url = new URL(`${window.origin}/course`);
                url.searchParams.set("id",`${courseid}`);
                window.location = url
                // window.history.pushState({},'',url);
            })
            // window.history.pushState({urlPath:'/index'},"",'/index/list')
        }
    }

    // Course Overview
    function courseOverview(){
        let cid = window.location.search;
        let courseId = new URLSearchParams(cid); 
        let course_id = courseId.get("id");

        const url = `http://127.0.0.1:5000/elearning/course-overview?course_id=${course_id}`
        fetch(url)
        .then(response => response.json())
        .then(json => {
            const h2 = document.getElementById("hC2");
            h2.innerHTML = " ";
            const courseOverview = document.getElementById("sCourses");
            courseOverview.innerHTML = "";
            for (data of json) {
                h2.innerHTML = data.title;
                const table = document.createElement("table");
                const tr1 = document.createElement("tr");
                const tr2 = document.createElement("tr");
                const tr3 = document.createElement("tr");
                const tr4 = document.createElement("tr");
                const tr5 = document.createElement("tr");
                const tr6 = document.createElement("tr");
                
                const img = document.createElement("td");
                img.setAttribute("rowspan", "6");
                img.innerHTML = `<img src=${data["img_src"]} alt=${data["title"]} title=${data["title"]}>`;
                const courseTitle = document.createElement("td");
                courseTitle.innerHTML ="Title :" + data.title;
                const courseDesc = document.createElement("td");
                courseDesc.innerHTML = "Description :" + data.description;
                const courseInstructor = document.createElement("td");
                courseInstructor.innerHTML = "Instructor Name : " + data["first_name"] + " " + data["last_name"];
                const courseCount = document.createElement("td");
                courseCount.innerHTML = "Total Enrollment(s) : " + " " + data.count + " student(s)";
                
                const btn = document.createElement("button");
                const txt = document.createTextNode("Enroll");
                
                btn.id = data["course_id"];

                btn.append(txt)
                tr1.append(img, courseTitle);
                tr2.append(courseDesc);
                tr3.append(courseInstructor);
                tr4.append(courseCount);

                const url1 = `http://127.0.0.1:5000/elearning/prerequisite?course_id=${course_id}`
                fetch(url1)
                .then(response => response.json())
                .then(result => {
                    const coursePrerequisite = document.createElement("td");
                    coursePrerequisite.innerHTML = "Prerequisite(s): "
                    tr5.append(coursePrerequisite);
                    for (i= 0; i < result.length; i++) {
                        pre = result[i]["title"];
                        if (pre != null) {
                            const Pre = document.createElement("div")
                            Pre.innerHTML = pre;
                            tr6.append(Pre);
                        }else {
                            const Pre = document.createElement("div")
                            Pre.innerHTML = "-";
                            tr6.append(Pre);
                        }
                    }
                })       

                table.append(tr1,tr2,tr3,tr4,tr5,tr6);
                courseOverview.append(table, btn);

                btn.addEventListener("click", function(e){
                    let courseid = this.getAttribute("id");
                    e.preventDefault();
                    const url1 =`http://127.0.0.1:5000/elearning/courses/new/enroll?std_token${getCookie("std_token")}&course_id=${courseid}`
                    fetch(url1, {method: "POST"})
                    .then(response => response.json())
                    .then(result =>{
                        if (result == "Can't Add Enroll the Course Because Maximum Enroll of Five" || result == "Can't Add Enroll the Course Because Prerequisite Courses Haven't Completed yet" || result == "Course has been taken" || result == "Please, login first!"){
                            alert(result)
                        }else{
                            console.log(result);
                            alert("Thanks! The Course has been added");
                            window.location = `${window.origin}/student-index`;
                        }
                    })
                })
            }
        })
    }


    // Search Course
    function doSearch() {
    const h2 = document.getElementById("hC2");
    h2.innerHTML = "Search :";
    const row = document.createElement("div");
    row.classList.add("row");

    let value = document.getElementById("course").value;
    const url = "http://127.0.0.1:5000/elearning/courses/search?value=" + value
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(json => {
        const searchCourse = document.getElementById("sCourses");
        searchCourse.innerHTML = "";
        for (data of json) {
            const h3 = document.createElement("h3");
            
            const column = document.createElement("div");
            const content = document.createElement("div");
            
            column.classList.add("column");
            content.classList.add("content");

            h3.innerHTML = data.search;

            content.append(h3);
            column.append(content);
            row.append(column);
            searchCourse.append(row);
            }
        })
    }

    // Top Course
    window.topCourse = function() {
    const h2 = document.getElementById("hC2");
    h2.innerHTML = "Top Courses Enrolled :";

    const url = "http://127.0.0.1:5000/elearning/courses/top/enrolled"
    fetch(url)
    .then(response => response.json())
    .then(json => renderDatum(json))
    }
    function renderDatum(json) {
        const row = document.createElement("div");
        row.classList.add("row");
        const topCourse = document.getElementById("sCourses");
        topCourse.innerHTML = "";
        for (data of json) {
            const h3 = document.createElement("h3");
            const p = document.createElement("p");
            const img = document.createElement("p");
            
            const column = document.createElement("div");
            const content = document.createElement("div");
            
            column.classList.add("column");
            content.classList.add("content");

            h3.innerHTML = data["title"];
            p.innerHTML = "Number of courses enrolled : " + data["number of courses enrolled"] + " student(s)";
            img.innerHTML = `<img src=${data["img_src"]} alt=${data["title"]} title=${data["title"]}>`;

            content.append(img, h3, p);
            column.append(content);
            row.append(column);
            topCourse.append(row);
            window.history.pushState({urlPath:'/index'},"",'/index/topcourse')
        }
    }
    // Top Student
    window.topStudent = function() {
    const h2 = document.getElementById("hC2");
    h2.innerHTML = "Top Five Students :";

    const url = "http://127.0.0.1:5000/elearning/courses/top/student"
    fetch(url)
    .then(response => response.json())
    .then(json => renderResult(json))
    }
    function renderResult(json) {
        const row = document.createElement("div");
        row.classList.add("row");
        const topCourse = document.getElementById("sCourses");
        topCourse.innerHTML = "";
        for (data of json) {
            const h3 = document.createElement("h3");
            const p = document.createElement("p");
            
            const column = document.createElement("div");
            const content = document.createElement("div");
            
            
            column.classList.add("column");
            content.classList.add("content");

            h3.innerHTML = data["first_name"] + " " +  data["last_name"];
            p.innerHTML = "Number of complete course: " + data["number of complete course"];

            content.append(h3, p);
            column.append(content);
            row.append(column);
            topCourse.append(row);
            window.history.pushState({urlPath:'/index'},"",'/index/topstudent')
        }
    }

                 //------ register_student.html ------//

    // Enrollment
    function getCookie(name) {
        const value = `${document.cookie}`;
        const parts = value.split(`${name}`);
        if (parts.length === 2){
        return parts.pop().split(';').shift();
        } else if (value == "") {
            return ""
        }
      }
    
    function viewEnroll() {
        const h2 = document.getElementById("studentP");
        h2.innerHTML = "Enrollment";
        const row = document.createElement("div");
        row.classList.add("row");
        const url = "http://127.0.0.1:5000/elearning/courses/list"
        fetch(url)
        .then(response => response.json())
        .then(json => {
            const row = document.createElement("div");
            row.classList.add("row");
            const viewEnrolls = document.getElementById("courseOverview");
            viewEnrolls.innerHTML = "";
            for (data of json) {
                const h3 = document.createElement("h3");
                const p = document.createElement("p");
                const p1 = document.createElement("p");
                const p2 = document.createElement("p");
                const btn = document.createElement("button");
                const txt = document.createTextNode("Enroll");
                const column = document.createElement("div");
                const content = document.createElement("div");
                
                btn.classList.add("enrollment");
                let btns = document.createAttribute("value");
                btns.value = data["course_id"];
                btn.setAttributeNode(btns);
                p.classList.add("courseid");
                column.classList.add("column");
                content.classList.add("content");
                
                h3.innerHTML = data.title;
                p.innerHTML = data["course_id"];
                p1.innerHTML = data["first_name"] + " " + data["last_name"];
                p2.innerHTML = data.description;

                btn.append(txt);
                content.append(h3, p, p1, p2, btn);
                column.append(content);
                row.append(column);
                viewEnrolls.append(row);
    
                btn.addEventListener("click", function(e){
                    let courseid = this.getAttribute("value");
                    e.preventDefault();
                    const url1 =`http://127.0.0.1:5000/elearning/courses/new/enroll?std_token=${getCookie("std_token")}&course_id=${courseid}`
                    fetch(url1, {method: "POST"}) 
                    .then(response => response.json())
                    .then(json => {
                        if (json == "Can't Add Enroll the Course Because Maximum Enroll of Five" || json == "Can't Add Enroll the Course Because Prerequisite Courses Haven't Completed yet" || json == "Course has been taken"){
                            alert(json)
                        } else {
                            console.log(json);
                        }
                        // Showing Course Prerequisite !!
                    })
                    .catch((error) => console.error("Error:", error))
                })
            }
        })
    }

    // List Progress Course Student
    function statusCourse() {
        let sid = window.location.search
        let studentId = new URLSearchParams(sid); 
        const url = "http://127.0.0.1:5000/elearning/courses/status?student_id=" + studentId.get("query")
        fetch(url)
        .then(response => response.json())
        .then(json => renderStatus(json))
    }

    function renderStatus(json) {
        const h2 = document.getElementById("studentP");
        h2.innerHTML = "Course Overview";
        const row = document.createElement("div");
        row.classList.add("row");
        const progress = document.getElementById("courseOverview");
        progress.innerHTML = "";
        for (data of json) {
            const h3 = document.createElement("h3");
            const p = document.createElement("p");
            const p1 = document.createElement("p");
            const btn2 = document.createElement("button");
            const btn3 = document.createElement("button");
            
            const txt2 = document.createTextNode("Drop Out");
            const txt3 = document.createTextNode("Complete");
        
            btn2.append(txt2);
            btn3.append(txt3);

            const column = document.createElement("div");
            const content = document.createElement("div");

            let btns2 = document.createAttribute("value");
            btns2.value = data["course_id"];
            btn2.setAttributeNode(btns2);

            let btns3 = document.createAttribute("value");
            btns3.value = data["course_id"];
            btn3.setAttributeNode(btns3);
        
            btn2.classList.add("D");
            btn3.classList.add("C");
            column.classList.add("column");
            content.classList.add("content");

            h3.innerHTML = data["title"];
            p.innerHTML = data["first_name"] + " " + data["last_name"];
            p1.innerHTML = "Currently Status:" + data["status"];

            content.append(h3, p, p1, btn2, btn3);
            column.append(content);
            row.append(column);
            progress.append(row);
        
            // Learning Progress Student
            btn2.addEventListener("click", function(e){
            e.preventDefault();
            let sid2 = window.location.search
            let studentId2 = new URLSearchParams(sid2); 
            let courseid2 = this.getAttribute("value");
            let status2 = this.getAttribute("class");
            const url2 = `http://127.0.0.1:5000/elearning/courses/users/drop?student_id=${studentId2.get("query")}&course_id=${courseid2}&status=${status2}`
            fetch(url2, {method: "PUT"})
            .then(response => response.json())
            .then(result => {
                p1.innerHTML = "Currently Status:" + status2;
                console.log(result);
            })
        })
            btn3.addEventListener("click", function(e){
                e.preventDefault();
                let sid3 = window.location.search
                let studentId3 = new URLSearchParams(sid3); 
                let courseid3 = this.getAttribute("value");
                let status3 = this.getAttribute("class");
                const url3 = `http://127.0.0.1:5000/elearning/courses/users/drop?student_id=${studentId3.get("query")}&course_id=${courseid3}&status=${status3}`
                fetch(url3, {method: "PUT"})
                .then(response => response.json())
                .then(result => {
                    p1.innerHTML = "Currently Status:" + status3;
                    console.log(result);
                })
            })
        }
    }
                        //------ student_setting.html ------//

    // Settings Students
    function settings(obj) {
        let url = obj.getAttribute("href");
        if (url.indexOf("?") != 1) obj.setAttribute("href", url + window.location.search);
        
        let update = document.getElementById("save");
        update.onclick = save;

        function save(){
            let sid = window.location.search;
            let studentId = new URLSearchParams(sid);
            let firstname = document.getElementById("firstname").value;
            let lastname = document.getElementById("lastname").value;
            let username = document.getElementById("username").value;
            let email = document.getElementById("email").value;

            const info = {
                firstname,
                lastname,
                username,
                email
            };

            fetch ('http://127.0.0.1:5000/elearning/user/edit/student?student_id=' + studentId.get("query"), {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(info)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                alert("Thank You, Student Information has been updated");
            })
            .catch((error) => console.error('Error:', error))
        }
     }

    // Log out
    function logOut(){
        const url = `http://127.0.0.1:5000/elearning/user/logout/student?q=${getCookie("std_token")}`
        fetch(url, {method: "DELETE"})
        .then(response => response.json())
        .then(json => {
            document.cookie="std_token=; expires=";
            alert(json);
            window.location = `${window.origin}/index`;
        })
    }

            //------ admin_portal.html ------//
// Create Course
// Update Course