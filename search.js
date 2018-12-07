//elasticlunr init
var index = elasticlunr(function() {
  this.addField('title');
  this.addField('body');
  this.setRef('id');
});



//Fuzzy set data

dataSet = document.getElementById('comboBoxData').textContent.toLowerCase().replace(
  /[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(' ');

function findCloseWords(q, t = 0.7, tlc = true) { // t to be adjusted
  fs = FuzzySet(dataSet);
  r = fs.get(q);
  res = []
  if (r != null) {
    r.forEach(function(element) {
      if (element[0] > t) {
        res.push(element[1])
      }
    });
  }
  return res
}



function repeat(fn, times) { //repeats a function x times, cause im lazy
  var loop = function(times) {
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
  for (var i = 0; ac > i; i++) { //for Item in faq-list
    subLisAll = allFaq[i].childNodes;
    sC = subLisAll.length
    for (var is = 0; sC > is; is++) { // for li in Item in faq-list
      if (subLisAll[is].tagName == 'LI') {
        docnum = 'ID' + i.toString() + '--' + is.toString() //created unice identifier
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
    timer = window.setTimeout(function() {
      timer = null;
      callback(textArea.value);
    }, delay);
  };
  textArea = null;
} //not used yet might be usefull if search function is too memory intensive



document.getElementById('comboBoxData').style.visibility = 'hidden'


document.getElementById("comboBox").addEventListener("keydown", function() {
  results = index.search(this.value, {}) //searches for value returns object
  console.log(this.value)
  console.log(results)
  if (!results.length) { //if no results try fuzzy search
    close = findCloseWords(this.value)[0]
    if (close == undefined) {
      console.log('no results found')
    } else {
      results = index.search(close, {})
      console.log('Corrected to:  ' + close)
    }
  }
  if (results[0] != undefined) {
    document.getElementById('tit').innerText = results[0].doc.title;
    document.getElementById('bodey').innerText = results[0].doc.body;
  } else {
    document.getElementById('tit').innerText = '';
    document.getElementById('bodey').innerText = '';
  }


})
