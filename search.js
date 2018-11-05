$(document).ready(function () {
            //$("#comboBoxData li").hide();

            $('#comboBoxData li').each(function (i) {
                $(this).attr('data-text', function () {
                    return $(this).text();
                });
            });

            $('#comboBox').bind('change keypress  keyup change', function () {
                $("#comboBoxData li").hide();
                $('#comboBoxData li[data-text*="' + $.trim($(this).val()) + '"]').show();
            });
        });


// gets objects from  json data file , creates objects
// key:{'t':}
function CrtElemt(key) {
  wrapper = document.createElement('li');
  title = document.createElement("div");
  desc = document.createElement("div");


}



function searchSimple(q) {
  var testAgainst = document.getElementById('comboBoxData').children;
  c = testAgainst.length;
  var result =[];
  for(var i =0; i<c; i++){

  }
}

function addTextAreaCallback(textArea, callback, delay) {
    var timer = null;
    textArea.onkeypress = function() {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout( function() {
            timer = null;
            callback(textArea.value);
        }, delay );
    };
    textArea = null;
}





document.getElementById("comboBox").addEventListener("keydown", function()) {

}
