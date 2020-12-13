$(document).ready(function()
{
    requestJsonContactMessageData();
})



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
                requestJsonContactMessageData(); // request new table of results
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


function requestJsonContactMessageData()
{
    $.ajax
    ({
        type: "POST",
        url: "../php/select_all_contact.php",
        data: {},
        success: function (resultsData)
        {
            var resultsDataObject;
            var resultsDataArray;

            resultsDataObject = JSON.parse(resultsData)
            resultsDataArray = [];

            for(let currentResultsData of resultsDataObject)
            {
                resultsDataArray.push({message: currentResultsData}); //key required for bootstrap table
            }
            resultsDataArray.reverse();

            $('#contactTable').bootstrapTable('destroy')
            $('#contactTable').bootstrapTable({data: resultsDataArray});

        },
        error: function(jqxhr, status, exception)
        {
            console.log('Exception:', exception);
        }
    }); //end of ajax call
    return false;
}



