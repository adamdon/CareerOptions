////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////OnREADY FUNCTIONS/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$(document).ready(function()
{
    onReadyOverrideEnterPress();
    onReadyTableRowOnClickEvent();
})



function onReadyOverrideEnterPress()
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

function onReadyTableRowOnClickEvent()
{
    $('#table').on('click-row.bs.table', function ($element, row)
    {
        onClickTableRow(row)
    })
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////OnClick FUNCTIONS////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function onClickTableRow(rowData)
{
    var socNumber;

    socNumber = rowData.soc;
    performApiSocDataRequest(socNumber);
    // console.log(typeof socNumber);
}



function onClickSearchButton()
{
    var searchInputElement;
    var keywordText;


    searchInputElement = $('#searchInput');

    if((searchInputElement.val() !== null) && (searchInputElement.val() !== "") && (searchInputElement.val().trim().length !== 0))
    {
        keywordText = $('#searchInput').val();
        performApiKeywordSearch(keywordText);
    }
    else
    {
        document.getElementById('searchInput').focus();
        document.getElementById('searchInput').select();
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////UPDATE UI FUNCTIONS////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function updateTableWithData(toUpdateWithData)
{
    var tableElement;

    tableElement = $('#table');
    tableElement.bootstrapTable('destroy')
    tableElement.bootstrapTable({data: toUpdateWithData});
}


function updateInfoCardDetailsWithData(toUpdateWithData)
{
    var infoCardRoleTitleElement;
    var infoCardQualificationsPElement;

    var infoCardRoleTitleText;
    var infoCardQualificationsPText;

    infoCardRoleTitleElement = $('#infoCardRoleTitle');
    infoCardQualificationsPElement = $('#infoCardQualificationsP');

    infoCardRoleTitleText = toUpdateWithData.title;
    infoCardQualificationsPText = toUpdateWithData.qualifications;

    infoCardRoleTitleElement.text(infoCardRoleTitleText);
    infoCardQualificationsPElement.text(infoCardQualificationsPText);

}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////API CALLS////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function performApiKeywordSearch(toSearchKeywordText)
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




function performApiSocDataRequest(socText)
{
    var xmlHttpRequest = new XMLHttpRequest();
    var baseUrlText = "http://api.lmiforall.org.uk/api/v1/soc/code/";
    var returnedJsonObject = null;


    xmlHttpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 )
        {
            if(this.status === 200)
            {
                returnedJsonObject = JSON.parse(this.responseText);
                updateInfoCardDetailsWithData(returnedJsonObject);
            }
            else if (this.status === 0)
            {
                returnedJsonObject = [{ 'soc': this.status, 'title': 'Data API down',}, {'soc': 0, 'title': ' ',},];
                updateTableWithData(returnedJsonObject);
            }
        }

    };
    xmlHttpRequest.open("GET", (baseUrlText + socText), true);
    xmlHttpRequest.send();
}


