/** Dynamically sets the content of the log in/ log out button */
import {profile, signOut} from "./account-info.js"

$('#nav-placeholder').load('../nav.html',changeBar);

function changeBar(){
    $("#login").text("log out");
    $("#login").click(signOut());

}
console.log(profile);
