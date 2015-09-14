(function pbt(name, definition) {
  if (!this.pbt) { this.pbt = {}; }

  if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else if (typeof module !== 'undefined') module.exports = definition();
  else this.pbt[name] = definition();
}('pbt', function init() {
  var editor = $('#editor');
  var lookupTable = [];

  editor.on('focus', function f() {
    console.log($(this).html());
    // before = $(this).html();
  // }).on('blur keyup paste', function b() {
  });

  function parseTable() {
    var i;
    var count;
    var temp;

    // Check to see if a table element was pasted
    var results = editor.find('table tbody tr');
    if (results.length > 0) {
      count = results.length;

      for (i = 0; i < count; i++) {
        temp = $(results[i]).find('td');
        row = {
          purchase: temp[0].textContent,
          price: temp[1].textContent
        };

        lookupTable.push(row);
      }
      console.log(lookupTable);
      return true;
    }

    console.log(editor.html());
    return false;
  }

  function parseCSV() {
    // TODO:
  }

  pbt.getObjects = function() {
    return lookupTable;
  };

  $('#confirm').on('click', function handleConfirmClick() {
    // 1 - parse data inputs
    var ret = parseTable();
    if (!ret) {
      ret = parseCSV();
    }

    // 2 - display tables
    if (ret) {
      pbtView.displayTable(lookupTable);
    }
  });
}));

