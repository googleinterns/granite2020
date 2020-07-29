fetch("/account").then(response => response.json()).then(loginlink => {
        console.log("setting link to " + loginlink) 

        $("#login").attr("href",loginlink)
    }
)
