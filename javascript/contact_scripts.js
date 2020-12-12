// $(document).ready(function()
// {
//     onReadyRegionSelectEvent();
//     //onReadyRegContactFormButtonOnClick();
// })



function onReadyOverrideEnterPress()
{
    $(window).keydown(function(event)
    {
        if(event.keyCode === 13)
        {
            event.preventDefault();
            document.getElementById("contactFormButton").click();
            return false;
        }
    });
}


function ContactFormButtonOnClick()
{
    var shareInputValue = $('#shareInput').val();
    var emailInputValue = $('#emailInput').val();
    var firstInputValue = $('#firstInput').val();
    var lastInputValue = $('#lastInput').val();
    var messageInputValue = $('#messageInput').val();

    console.log("Onlick here");
    $.ajax
    ({
        type: "POST",
        url: "../php/insert_new_contact.php",
        data:
            {
                "shareInput": shareInputValue,
                "emailInput": emailInputValue,
                "firstInput": firstInputValue,
                "lastInput": lastInputValue,
                "messageInput": messageInputValue
            },
        success: function (resultsData)
        {
            console.log(":) worked!!!");
            console.log(resultsData);
            $('outputDiv').html(resultsData);
            // $('#contactform')[0].reset();
        },
        error: function(jqxhr, status, exception)
        {
            $('outputDiv').html(exception);
            console.log('Exception:', exception);
        }
    }); //end of ajax call

    return false;
}