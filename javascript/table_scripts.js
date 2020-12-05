$(document).ready(function()
{
    // var searchInputElement = document.getElementById("searchInput");
    //
    // searchInputElement.addEventListener("keyup", function(event)
    // {
    //     // Number 13 is the "Enter" key on the keyboard
    //     if (event.keyCode === 13)
    //     {
    //         event.preventDefault();
    //     }
    // });


    // $("#searchInput").on('keyup', function (event)
    // {
    //     if (event.keyCode === 13)
    //     {
    //         event.preventDefault();
    //         console.log("Enter key pressed!!!!!");
    //
    //         onClickSearchButton();
    //         // document.getElementById("searchButton").click();
    //     }
    // });

    $(window).keydown(function(event)
    {
        if(event.keyCode == 13)
        {
            event.preventDefault();
            document.getElementById("searchButton").click();
            document.getElementById('searchInput').focus();
            document.getElementById('searchInput').select();
            return false;
        }
    });



    // var keywordText;
    //
    //
    // keywordText = "software";
    // performLmiforallApiSearch(keywordText);
})


function onClickSearchButton()
{
    var keywordText;


    if(($('#searchInput').val() !== null) && ($('#searchInput').val() !== ""))
    {
        keywordText = $('#searchInput').val();
        performLmiforallApiSearch(keywordText);
    }
    else
    {
        alert("null pointer");
    }
}




function performLmiforallApiSearch(toSearchKeywordText)
{
    var xmlHttpRequest = new XMLHttpRequest();
    var baseUrlText = "http://api.lmiforall.org.uk/api/v1/soc/search?q=";
    var returnedJsonObject = null;


    xmlHttpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 )
        {
            if(this.status === 200)
            {
                returnedJsonObject = JSON.parse(this.responseText);
                updateTableWithData(returnedJsonObject);
            }
            else if (this.status === 0)
            {
                returnedJsonObject = [{ 'soc': this.status, 'title': 'Data API down',}, {'soc': 0, 'title': ' ',},];
                updateTableWithData(returnedJsonObject);
            }
        }

    };
    xmlHttpRequest.open("GET", (baseUrlText + toSearchKeywordText), true);
    xmlHttpRequest.send();
}







function updateTableWithData(toUpdateWithData)
{
    var tableElement;

    tableElement = $('#table');
    tableElement.bootstrapTable('destroy')
    // tableElement.bootstrapTable('load', toUpdateWithData);
    tableElement.bootstrapTable({data: toUpdateWithData});
}