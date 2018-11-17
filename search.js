








document.getElementsByTagName('h2')[0].remove()
document.getElementsByTagName('h2')[0].remove()
document.getElementsByTagName('h2')[0].remove()
document.getElementsByTagName('h2')[0].remove()
document.getElementsByTagName('h2')[0].remove()
document.getElementsByTagName('h2')[0].remove()
document.getElementsByTagName('h2')[0].remove()
document.getElementsByTagName('h2')[0].remove()
document.getElementsByTagName('h2')[0].remove()
// gets objects from  json data file , creates objects
// key:{'t':}
function CrtElemt(key) {
  wrapper = document.createElement('li');
  title = document.createElement("div");
  desc = document.createElement("div");


}


document.getElementById('comboBoxData').className += " hideMe";

function HideResulsts() {
  document.getElementById('comboBoxData').className += " hideMe";
    shown = document.getElementsByClassName('showMe');
  c = shown.length
  if(c){
    for(var i=0; i<c; i++){
        shown[i].className = shown[i].className.replace(/\bshowMe\b/g, "");
    }
  }
  }

function searchSimple(q, tlc=true) {
  var testAgainst = document.getElementById('comboBoxData').getElementsByTagName('li');
  c = testAgainst.length;
  var r =[];
  for(var i =0; i<c; i++){
    if( testAgainst[i].textContent.toLowerCase().includes(q.toLowerCase())){
      testAgainst[i].style.visibility = 'visible'
      r.push(testAgainst[i])
    }else{testAgainst[i].style.visibility = 'hidden '}
  }
  return r
}


dataSet = document.getElementById('comboBoxData').textContent.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
function findCloseWords(q, t=0.7, tlc=true, set=dataSet) {
fs = FuzzySet(set);
r= fs.get(q);
res = []
r.forEach(function(element) {
  if(element[0]>t){
	   res.push(element[1])
}
});
return res
}

function suggest(original,instead) {
  document.getElementById('showInstead').value = 'Showin Resulsts For:' + ' ' + instead

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


document.getElementById("comboBox").addEventListener("keydown", function() {
searchSimple(this.value)
})
