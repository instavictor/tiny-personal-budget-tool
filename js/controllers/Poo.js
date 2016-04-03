var view = require('js/views/Brain.jsx');

var editor = $('#form .content');
var lookupTable = [];

var $confirm = $('#confirm');

/**
  Return parsed table array if it's pasted from Excel
*/
function parseTable() {
  var i;
  var count;
  var temp;

  // Check to see if a table element was pasted
  var results = editor.find('table tbody tr');
  var row;
  if (results.length > 0) {
    count = results.length;

    for (i = 0; i < count; i++) {
      temp = $(results[i]).find('td');
      row = {
        id: i,
        purchase: temp[0].textContent,
        price: temp[1].textContent
      };

      lookupTable.push(row);
    }
  }
  return lookupTable;
}

/**
  Return parsed table array if it's pasted from csv
*/
function parseCSV() {
  // TODO:
  return false;
}

$confirm.on('click', function() {
  var ret = parseTable();
  if (!ret) {
    ret = parseCSV();
  }

  // 2 - display tables
  if (ret) {
    view.display(lookupTable);
    $('#form').css('display', 'none');
  } else {
    this.error('stuff');
  }
});

editor.on('focus', function f() {
  console.log($(this).html());
  // before = $(this).html();
  // }).on('blur keyup paste', function b() {
});

var poo = function(arg) {
  return {
    getObjects: function() {
      return arg;
    }
  };
};

// poo.getObjects = function() {
//  return arg;
// };

module.exports = poo;
