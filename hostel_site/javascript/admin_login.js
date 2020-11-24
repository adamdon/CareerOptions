function loginOnClick()
{
    var requestUrlText = "";
    var usernameText = "";
    var passwordText = "";


    requestUrlText = "../php/attempt_admin_login.php";
    usernameText = document.getElementById("username").value;
    passwordText = document.getElementById("password").value;
    requestAdminLoginAttempt(requestUrlText, usernameText, passwordText);
}




function requestAdminLoginAttempt(requestUrlText, var1Text, var2Text)
{
    var xmlhttp = new XMLHttpRequest();
    var jsonObject = null;


    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            // jsonObject = JSON.parse(this.responseText); //TODO add back in
            // processResponseAdminLogin(jsonObject); //TODO add back in

            processResponseAdminLogin(this.responseText);
        }
        else
        {
            //document.getElementById("surveyResultsBox").innerHTML ='<h3>Loading failed</h3>';
        }
    };
    xmlhttp.open("POST", "../php/attempt_admin_login.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("var1Text=" + var1Text + "&var2Text=" + var2Text);
}



function processResponseAdminLogin(jsonObject)
{
    //document.getElementById("username").value = jsonObject[0].username;
    document.body.innerHTML = jsonObject;

}