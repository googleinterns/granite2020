$("#nav-placeholder").load("../nav.html")

fetch("/account").then(response => response.json()).then(loginData => {
        console.log(loginData.userData)
        console.log("setting link to " + loginData.logInOutURL) 

        $("#login").attr("href",loginData.logInOutURL)
    }
)



