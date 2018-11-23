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
    let table  = document.createElement('table');
    table.setAttribute('id', 'sortable');
    table.setAttribute('class', 'display');

    // http://www.webtrainingcentre.com/javascript-solutions/create-a-dynamic-table-using-json-and-javascript/
    
    const noOfPlayers = Object.keys(promiseValue).length;
    let col = [];
    // Exclude certain col data.
    let excluded = ['id', 'role2', 'photo', 'logo', 'teamId', 'status', 'rating'];

    // Get from 1st player in promiseValue's property the keys to make up the table headers.
    for (let key in promiseValue[0]) {
      if (inArray(key, excluded)) {
        continue;
      }
      if (key === 'average') {
        col.push('average');
        col.push('averageLastFive');
        continue;
      }
      col.push(key);
    }
    
    // CREATE TABLE HEAD.
    let tHead = document.createElement('thead');	
    // CREATE ROW FOR TABLE HEAD.
    var hRow = document.createElement('tr');
    
    // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
    for (let i = 0; i < col.length; i++) {
      var th = document.createElement('th');
      th.innerHTML = col[i];
      hRow.appendChild(th);
    }
    
    tHead.appendChild(hRow);
    table.appendChild(tHead);
    
    // CREATE TABLE BODY.
    let tBody = document.createElement('tbody');	
    
    // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
    for (let i = 0; i < noOfPlayers; i++) {
      let bRow = document.createElement('tr');
      for (let j = 0; j < col.length; j++) {
        let td = document.createElement('td');

        // Prevent showing 'undefined' on table column 'averageLastFive';
        // This happens because we added above a hardcoded table col 'averageLastFive', 
        // but promiseValue obj does not have a property key 'averageLastFive',
        // it has an average obj that contains all this data nested inside its properties. 
        if (typeof promiseValue[i][col[j]] === 'undefined') {
          continue;
        }
        let content = promiseValue[i][col[j]];

        // if promiseValue[i][col[j]] is Obj split it into td's with its relevant Average's data.
        if (typeof promiseValue[i][col[j]] === 'object' && promiseValue[i][col[j]] !== null) {
          let avgContent = promiseValue[i][col[j]].average;
          let tdAvgContent = document.createElement('td');

          tdAvgContent.innerHTML = avgContent;
          bRow.appendChild(tdAvgContent);

          let tdAvgContentLastFive = document.createElement('td');
          let tdAvgLastFiveContent = promiseValue[i][col[j]].averageLastFive;
          tdAvgContentLastFive.innerHTML = tdAvgLastFiveContent;
          bRow.appendChild(tdAvgContentLastFive);
        }
        else {
          td.innerHTML = content;
          bRow.appendChild(td);
        }
      }
      tBody.appendChild(bRow)
      
    }
    table.appendChild(tBody);	
    
		// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById('players');
    divContainer.appendChild(table);
    
    // Add data sorting through DataTable plugin.    
    $('#sortable').DataTable({
      "aoColumnDefs": [
        { "sClass": "dt-right", "aTargets": [ 3, 4, 6, 7, 8] },
      ],
      "columnDefs": [
        // { "type": "numeric-comma", targets: 3 }
        { "type": "numeric-comma", "aTargets": [ 3, 4, 6, 7, 8] },
      ],
      "language": {
        "decimal": ",",
        "thousands": "."
      }
    });
    // @todo: plain js equivalent...
    // const myTable = document.querySelector("#sortable");
    // new DataTable(myTable);
    
    
    function inArray(needle, haystack) {
      var length = haystack.length;
      for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
      }
      return false;
    }
  })
  
})



