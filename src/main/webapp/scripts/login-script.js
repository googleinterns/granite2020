fetch("/account").then(response => response.text()).then(loginlink => {
        console.log("setting link to " + loginlink) 

        $("#login").attr("href",loginlink)
    }
)
