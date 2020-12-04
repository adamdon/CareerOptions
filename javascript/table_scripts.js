var $table = $('#table')

$(function()
{
    var xmlhttp = new XMLHttpRequest();
    var jsonObject = null;
    var data2

    data2 = [
        {
            'soc': 0,
            'title': 'Item 0',
        }
    ];

    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            jsonObject = JSON.parse(this.responseText);
            data2 = jsonObject;
            $table.bootstrapTable({data: data2})
        }
        else
        {
            //document.getElementById("surveyResultsBox").innerHTML ='<h3>Loading failed</h3>';
        }
    };
    xmlhttp.open("GET", "http://api.lmiforall.org.uk/api/v1/soc/search?q=Software%20Developer", true);
    xmlhttp.send();





    // var data = [
    //     {
    //         'soc': 0,
    //         'title': 'Item 0',
    //     },
    //     {
    //         'soc': 1,
    //         'title': 'Item 1',
    //     },
    //     {
    //         'soc': 2,
    //         'title': 'Item 2',
    //     },
    //     {
    //         'soc': 3,
    //         'title': 'Item 3',
    //     },
    //     {
    //         'soc': 4,
    //         'title': 'Item 4',
    //     },
    //     {
    //         'soc': 5,
    //         'title': 'Item 5',
    //     }
    // ]


})