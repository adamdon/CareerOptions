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
    var shareInputValue = $('#shareInput').is(':checked');
    var emailInputValue = $('#emailInput').val();
    var firstInputValue = $('#firstInput').val();
    var lastInputValue = $('#lastInput').val();
    var messageInputValue = $('#messageInput').val();


    $('contactFormButton').prop('disabled', true);

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
            if(resultsData === "0")
            {
                console.log(":) worked!!!, returned 0 echo from php");
                $('#contactForm').trigger("reset");
            }
            else
            {
                console.log(":( Didn't work due to error code: " + resultsData);
            }
        },
        error: function(jqxhr, status, exception)
        {
            console.log('Exception:', exception);
        }
    }); //end of ajax call

    return false;
}