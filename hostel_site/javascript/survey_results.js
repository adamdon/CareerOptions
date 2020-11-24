requestSurveyResults();
function requestSurveyResults()
{
    var xmlhttp = new XMLHttpRequest();
    var jsonObject = null;


    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            jsonObject = JSON.parse(this.responseText);
            updateSurveyResultsDiv(jsonObject);
        }
        else
        {
            //document.getElementById("surveyResultsBox").innerHTML ='<h3>Loading failed</h3>';
        }
    };
    xmlhttp.open("GET", "../temp/json_select_all_survey.php", true);
    xmlhttp.send();
}



function updateSurveyResultsDiv(objectsArray)
{
    var tableHTML = "";
    var barChartElement = null;

    tableHTML = createTableFromObjectsArray(objectsArray);
    barChartElement = createBarChartFromObjectsArray(objectsArray);


    document.getElementById("surveyResultsBox").innerHTML = (  tableHTML );
    document.getElementById("surveyResultsBox").appendChild(barChartElement);
}



function createTableFromObjectsArray(objectsArray)
{
    var topOutputHTML = "";
    var middleOutputHTML = "";
    var bottomOutputHTML = "";
    var fullOutputHTML = "";


    topOutputHTML =
        '<table>\n' +
        '  <tr>\n' +
        '    <th>First Name</th>\n' +
        '    <th>Last Name</th>\n' +
        '    <th>Email</th>\n' +
        '    <th>Type of Transport</th>\n' +
        '  </tr>' +
        '';


    for(let indexInt = 0; indexInt < objectsArray.length; indexInt++)
    {
        var firstName;
        var lastName;
        var email;
        var transportType;
        var published;


        firstName = objectsArray[indexInt].first;
        lastName = objectsArray[indexInt].last;
        email = objectsArray[indexInt].email;
        transportType = objectsArray[indexInt].transport;
        published = objectsArray[indexInt].published;

        if(published !== "0")
        {
            middleOutputHTML = (middleOutputHTML +
                '  <tr>\n' +
                '    <td>' + firstName + '</td>\n' +
                '    <td>' + lastName + '</td>\n' +
                '    <td>' + email + '</td>\n' +
                '    <td>' + transportType + '</td>\n' +
                '  </tr>' +
                '');
        }
        else
        {
            //middleOutputHTML = (middleOutputHTML + "DO NOT SHOW");
        }
    }

    bottomOutputHTML = '</table>\n';


    fullOutputHTML = (topOutputHTML + middleOutputHTML + bottomOutputHTML);
    return fullOutputHTML;
}


function createBarChartFromObjectsArray(objectsArray)
{
    var carLabel = "Cars: ";
    var carAmount = 0;
    var carCanvasElement = document.createElement("canvas");
    var carBarCanvasContext = carCanvasElement.getContext("2d");
    var carBarLength = 0;


    for (let indexInt = 0; indexInt < objectsArray.length; indexInt++)
    {
        if(objectsArray[indexInt].transport === "car")
        {
            carAmount = (carAmount + 1);
        }
    }



    carCanvasElement.setAttribute("width", "200");
    carCanvasElement.setAttribute("height", "25");

    carBarLength = carAmount;
    if (carAmount > 0)
    {
        if (carBarLength > 100)
        {
            carBarLength = 100;
        }
        carBarCanvasContext.fillStyle = "#ADD9EC"; //"blue";
    }

    carBarCanvasContext.rect(1, 1, 10 * carBarLength, 20);
    carBarCanvasContext.fill();
    carBarCanvasContext.stroke()






    var barTableElement = document.createElement("table");
    var carTableRowElement = document.createElement("tr");
    var carLabelTableDataElement = document.createElement("td");
    var carLabelTextElement = document.createTextNode(carLabel);
    var carAmountTableDataElement = document.createElement("td");
    var carAmountTextElement = document.createTextNode(carAmount);
    var carCanvasDataElement = document.createElement("td");

    barTableElement.appendChild(carTableRowElement);

    carTableRowElement.appendChild(carLabelTableDataElement);
    carLabelTableDataElement.appendChild(carLabelTextElement);

    carTableRowElement.appendChild(carAmountTableDataElement);
    carAmountTableDataElement.appendChild(carAmountTextElement);

    carTableRowElement.appendChild(carCanvasDataElement);
    carCanvasDataElement.appendChild(carCanvasElement);



    return barTableElement;
}

