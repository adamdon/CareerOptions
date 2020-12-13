$(document).ready(function()
{
    // requestJsonContactMessageData();
})

function LinkFormatter(value, row, index)
{
    var valueText;
    var valueLabelText;
    var returnHtml;

    valueText = value[0];

    ValueLabelText = valueText.substr(11);//.substring(0, 3);
    console.log("valueLabelText " + valueLabelText);
    console.log("value " + value);
    console.log("valueText " + value);
    console.log(typeof valueLabelText);
    console.log(typeof value);
    console.log(typeof valueText);

    returnHtml = ("<div class=\"text-center\"> <span class=\"badge badge-light\" ><a class=nav-link\" href='" + value + "' >" + (ValueLabelText.slice(0, -1)) + " <i class=\"fas fa-link\"></i></a> </span> </div>");

    return returnHtml;
    //return ("<a href=" + value + ">" + (ValueLabelText.slice(0, -1)) + "</a>");
}
