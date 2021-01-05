                
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
            
            const column = document.createElement("div");
            const content = document.createElement("div");
            
            column.classList.add("column");
            content.classList.add("content");
            
            h3.innerHTML = data.title;
            p.innerHTML = data.description;

            content.append(h3, p);
            column.append(content);
            row.append(column);
            listCourse.append(row);
            window.history.pushState({urlPath:'/index'},"",'/index/list')
        }
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
            
            const column = document.createElement("div");
            const content = document.createElement("div");
            
            column.classList.add("column");
            content.classList.add("content");

            h3.innerHTML = data["title"];
            p.innerHTML = "number of courses enrolled : " + data["number of courses enrolled"];

            content.append(h3, p);
            column.append(content);
            row.append(column);
            topCourse.append(row);
            window.history.pushState({urlPath:'/index'},"",'/index/topcourse')
        }
    }

    // Enrollment
    
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

                // let student_id = document.getElementById("studentId").value; 
                    let sid = window.location.search
                    let studentId = new URLSearchParams(sid);     
                    btn.addEventListener("click", function(e){
                        let courseid = this.getAttribute("value");
                        console.log(courseid)
                        e.preventDefault();
                        const url1 = `http://127.0.0.1:5000/elearning/courses/new/enroll?student_id=${studentId.get("query")}&course_id=${courseid}`
                        fetch(url1, {method: "POST"}) 
                        .then(response => response.json())
                        .then(json => console.log(json))
                        .catch((error) => console.error("Error:", error))
                    })
                }
            })
        }

    // List Progress Course Student
    function statusCourse() {
        // let studentId = document.getElementById("studentId").value;
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
            const p1 = document.createElement("p")
            
            const column = document.createElement("div");
            const content = document.createElement("div");
            
            column.classList.add("column");
            content.classList.add("content");

            h3.innerHTML = data["title"];
            p.innerHTML = data["first_name"] + " " + data["last_name"];
            p1.innerHTML = "Status: " + data["status"];

            content.append(h3, p, p1);
            column.append(content);
            row.append(column);
            progress.append(row);
            // window.history.pushState({urlPath:'/index'},"",'/index/topcourse')
        }
    }

    // Learning Progress
    



    // Settings Students
    function settings(obj) {
        let url = obj.getAttribute("href");
        if (url.indexOf("?") != 1) obj.setAttribute("href", url + window.location.search);
        
    }
        
        let update = document.getElementById("save");
        update.onclick = save;

        function save(){
            let sid = window.location.search
            let studentId = new URLSearchParams(sid)
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
                alert("Thank You, Student Information has been updated")
            })
            .catch((error) => console.error('Error:', error))
        }
    
    // Log Out