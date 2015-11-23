var view = require('js/views/table.jsx');
var lnsView = require('js/views/LNS.jsx');

var editor = $('#editor');
var lookupTable = [];

var $confirm = $('#confirm');

var source = Rx.Observable.fromEvent($confirm, 'click');
// var addSource = Rx.Observable.fromEvent($addLabel, 'click');

lnsView.display();

/**
Return parse table array if it's pasted from Excel
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

function parseCSV() {
  // TODO:
  return false;
}

source.subscribe(
  function success() {
    // 1 - parse data inputs
    var ret = parseTable();
    if (!ret) {
      ret = parseCSV();
    }

    // 2 - display tables
    if (ret) {
      view.display(lookupTable);
      this.completed();
    } else {
      this.error('stuff');
    }
  },

  function error(err) {
    console.log('Error: %s', err);
  },
  function complete() {
    console.log('Completed');
  }
);

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
