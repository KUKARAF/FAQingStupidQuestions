//elasticlunr init
var index = elasticlunr(function () {
    this.addField('title');
    this.addField('body');
    this.setRef('id');
});



//Fuzzy set data

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


//indexing of FAQ
/*
var doc1 = {
    "id": 1,
    "title": "Oracle released its latest database Oracle 12g",
    "body": "Yesterday Oracle has released its new database Oracle 12g, this would make more money for this company and lead to a nice profit report of annual year."
}

var doc2 = {
    "id": 2,
    "title": "Oracle released its profit report of 2015",
    "body": "As expected, Oracle released its profit report of 2015, during the good sales of database and hardware, Oracle's profit of 2015 reached 12.5 Billion."
}


index.addDoc(doc1);
index.addDoc(doc2);
*/

//console.log(index.search("Oracle database profit"));





function repeat(fn, times) {  //repeats a function x times, cause im lazy
  var loop = function (times) {
    if (times) {
      fn(times);
      loop(--times);
    }
  }
  loop(times);
}




// gen data set for indexing
{
  allFaq = document.getElementsByClassName('faq-list')
  ac = allFaq.length
  for(var i = 0; ac > i; i++){ //for Item in faq-list
    subLisAll = allFaq[i].childNodes;
    sC = subLisAll.length
    for(var is = 0;sC>is; is++){ // for li in faq list
      if(subLisAll[is].tagName == 'LI'){
        docnum = 'ID'+ i.toString() +'--'+ is.toString()
         //body
        var doc = {
            "id": docnum,
            "title": subLisAll[is].getElementsByTagName('a')[0].innerText,
            "body": subLisAll[is].getElementsByTagName('ul')[0].innerText
        }
        index.addDoc(doc);

      }
    }

  }
}
//document.getElementById('comboBoxData').getElementsByTagName('li')

function isIterable(obj) { // true falls if iterable
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
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
}//not used yet might be usefull if search function is too memory intensive




document.getElementById("comboBox").addEventListener("keydown", function() {
  results = index.search(this.value) //searches for value returns object
  console.log(this.value)
  console.log(results)
  if(!results.length){ //if no results try fuzzy search
    close = findCloseWords(this.value)[0]
    results = index.search(close)
    console.log('Corrected to:  '+ close)
  }
  document.getElementById('tit').innerText = results[0].doc.title;
  document.getElementById('bodey').innerText = results[0].doc.body;


}
)
