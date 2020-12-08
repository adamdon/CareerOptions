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
    performApiEstimatedPayRequest(socNumber, 1)
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




function performApiEstimatedPayRequest(socText, regionNumber)
{
    var xmlHttpRequest = new XMLHttpRequest();
    var baseUrlText = "http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=";
    var middleUrlText = "&coarse=true&filters=region%3A";
    var returnedJsonObject = null;


    xmlHttpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 )
        {
            if(this.status === 200)
            {
                returnedJsonObject = JSON.parse(this.responseText);
                updateInfoCardDetailsWithChart(returnedJsonObject);
            }
            else if (this.status === 0)
            {
                returnedJsonObject = [{ 'soc': this.status, 'title': 'Data API down',}, {'soc': 0, 'title': ' ',},];
                updateTableWithData(returnedJsonObject);
            }
        }

    };
    xmlHttpRequest.open("GET", (baseUrlText + socText + middleUrlText + regionNumber), true);
    xmlHttpRequest.send();
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
    var infoCardRoleTitleText;
    var infoCardQualificationsPText;
    var infoCardDescriptionPText;
    var infoCardRoleTitleElement;
    var infoCardQualificationsPElement;
    var infoCardDescriptionPElement;


    infoCardRoleTitleText = toUpdateWithData.title;
    infoCardQualificationsPText = toUpdateWithData.qualifications;
    infoCardDescriptionPText = toUpdateWithData.description;

    infoCardRoleTitleElement = $('#infoCardRoleTitle');
    infoCardQualificationsPElement = $('#infoCardQualificationsP');
    infoCardDescriptionPElement = $('#infoCardDescriptionP');

    infoCardRoleTitleElement.text(infoCardRoleTitleText);
    infoCardQualificationsPElement.text(infoCardQualificationsPText);
    infoCardDescriptionPElement.text(infoCardDescriptionPText);
}

function updateInfoCardDetailsWithChart(toUpdateWithData)
{
    var seriesData;
    var yearsData;
    var salariesData


    var chartElement;
    var barChart

    seriesData = toUpdateWithData.series;


    yearsData = [];
    salariesData = [];
    for(let currentSeriesData of seriesData)
    {
        yearsData.push(currentSeriesData.year);
        salariesData.push(currentSeriesData.estpay);
    }

    yearsData.sort();
    salariesData.sort();

    // seriesData.sort(function(a, b)
    // {
    //     return a.year - b.year;
    // });

    // seriesData.sort(function(a, b)
    // {
    //     return a.estpay - b.estpay;
    // });

    console.log(JSON.stringify(yearsData));
    console.log(JSON.stringify(salariesData));
    console.log(JSON.stringify(seriesData));



    chartElement = document.getElementById('chart').getContext('2d');
    barChart = new Chart(chartElement,
        {
            type:'bar',
            data:
                {
                    labels:yearsData,
                    datasets:
                        [
                            {
                                label:'£ per week',
                                data:salariesData,
                                backgroundColor:'#df691a'
                            }
                        ]
                },
            options:
                {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
        });







}