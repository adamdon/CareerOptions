$(document).ready(function()
{
    onReadyPageLoaded();
})




function onReadyPageLoaded()
{
    $(window).keydown(function(event)
    {
        if(event.keyCode === 13)
        {
            event.preventDefault();
            document.getElementById("searchButton").click();
            document.getElementById('searchInput').focus();
            document.getElementById('searchInput').select();
            return false;
        }
    });
}




function onClickSearchButton()
{
    var searchInputElement;
    var keywordText;


    searchInputElement = $('#searchInput');

    if((searchInputElement.val() !== null) && (searchInputElement.val() !== "") && (searchInputElement.val().trim().length !== 0))
    {
        keywordText = $('#searchInput').val();
        performLmiforallApiSearch(keywordText);
    }
    else
    {
        document.getElementById('searchInput').focus();
        document.getElementById('searchInput').select();
    }
}












function updateTableWithData(toUpdateWithData)
{
    var tableElement;

    tableElement = $('#table');
    tableElement.bootstrapTable('destroy')
    tableElement.bootstrapTable({data: toUpdateWithData});
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////API CALLS////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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