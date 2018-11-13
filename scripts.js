document.addEventListener('DOMContentLoaded', function(event) {  
  // @todo: refactor into own autocomplete module.
  
  const getJSONdata = async () => {
    const fileToFetch = 'players.json';
    try {
      const response = await fetch(fileToFetch);
      if (response.ok) {
        const responseBodyObj = await response.json(); // .json() returns an obj parsed from the json body of the response.
        return responseBodyObj.answer;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // Runs on init.
  getJSONdata().then(function(promiseValue) {
    let _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _th_ = document.createElement('th'),
    _td_ = document.createElement('td');
    
    // Builds the HTML Table out of myList json data from Ivy restful service.
    function buildHtmlTable(arr) {
      var table = _table_.cloneNode(false),
      columns = addAllColumnHeaders(arr, table);
      table.setAttribute('class', 'sortable');
      console.log('class added');

      for (var i=0, maxi=arr.length; i < maxi; ++i) {
        var tr = _tr_.cloneNode(false);
        for (var j=0, maxj=columns.length; j < maxj ; ++j) {
          var td = _td_.cloneNode(false);
          cellValue = arr[i][columns[j]];
          td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      return table;
    }
    
    // Adds a header row to the table and returns the set of columns.
    // Need to do union of keys from all records as some records may not contain
    // all records
    function addAllColumnHeaders(arr, table) {
      let columnSet = [],
      tr = _tr_.cloneNode(false);
      // Exclude certain columns.
      let excluded = ['id', 'role2', 'photo', 'logo', 'teamId', 'status'];
      for (var i=0, l=arr.length; i < l; i++) {
        for (var key in arr[i]) {
          if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key)===-1) {
            if (inArray(key,excluded)) {
              continue;
            }
            columnSet.push(key);
            var th = _th_.cloneNode(false);
            th.appendChild(document.createTextNode(key));
            tr.appendChild(th);
          }
        }
      }
      table.appendChild(tr);
      return columnSet;
    }
    
    
    function inArray(needle, haystack) {
      var length = haystack.length;
      for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
      }
      return false;
    }
    
    
    

    document.body.appendChild(buildHtmlTable(promiseValue));
    $(document).ready( function () {
      $('.sortable').DataTable();
    } );
  })
  
})



