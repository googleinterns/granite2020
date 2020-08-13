/** Dynamically sets the content of the log in/ log out button */
import {profile, signOut} from "./account-info.js"
$(document).ready(function(){
    $('#nav-placeholder').load('../nav.html',changeBar);
})

function changeBar(){
    $("#login").text("log out");
    $("#login").click(signOut);

}
