




function repeat(fn, times) {
  var loop = function (times) {
    if (times) {
      fn(times);
      loop(--times);
    }
  }
  loop(times);
}


repeat(function(){document.getElementsByTagName('h2')[0].remove()},9)
repeat(function(){document.getElementsByTagName('h3')[0].remove()},61)
//ignore this, im just to lazy to properly fix the html





// creates object from a json file
// key:{'titleOrNum':[lis,of,paragrafs],[list,of,tags],'HTMLtable'}
function CrtElemt(key) {
  wrapper = document.createElement('li');
  title = document.createElement("div");
  desc = document.createElement("div");
//pass

}


//document.getElementById('comboBoxData').getElementsByTagName('li')

function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}


function ShowResult(result, hb = true) {//hides or shows list or individual results
  if(isIterable(result)){
    c = result.length
      for(var i=0; i<c; i++){
          ShowResult(result[i],hb)
      }
  }else{
  if(hb){
  result.style.height = 'auto';
  result.style.visibility = 'visible'
}else {
  result.style.height = 0;
  result.style.visibility = 'hidden'
}}
}

ShowResult(document.getElementById('comboBoxData').getElementsByTagName('li'),false); //hides all li items in combobox





function searchSimple(q, tlc=true) { //returns found html tags
  var testAgainst = document.getElementById('comboBoxData').getElementsByTagName('li'); //needs to be adjusted to search json
  c = testAgainst.length;
  var r =[];
  for(var i =0; i<c; i++){
    if( testAgainst[i].textContent.toLowerCase().includes(q.toLowerCase())){
    r.push(testAgainst[i])
    }
  }
  return r
}


dataSet = document.getElementById('comboBoxData').textContent.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
function findCloseWords(q, t=0.7, tlc=true) {
fs = FuzzySet(dataSet);
r= fs.get(q);
res = []
r.forEach(function(element) {
  if(element[0]>t){
	   res.push(element[1])
}
});
return res
}

function suggest(original,instead) { //will be used to suggest corrected results
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
}//not used yet


document.getElementById("comboBox").addEventListener("keydown", function() {
ShowResult(document.getElementById('comboBoxData').getElementsByTagName('li'),false) //hides everything
if(this.value != ''){
close = findCloseWords(this.value)[0]
found = searchSimple(this.value)
if(found.length){
  ShowResult(found)
  console.log('non fuzzy, found: '+ found.length+' results' )
}else if(close != null){
  console.log('corrected to: '+close)
  ShowResult(searchSimple(close))
}else{
  console.log('Nothing found for: '+this.value)
}
}}
)
