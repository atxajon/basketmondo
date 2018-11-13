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
    table.setAttribute('class', 'sortable');
    
    const noOfPlayers = Object.keys(promiseValue).length;
    // Retrieve column header.
    let col = [];
    // Exclude certain col data.
    let excluded = ['id', 'role2', 'photo', 'logo', 'teamId', 'status'];
    for (let i = 0; i < noOfPlayers; i++) {
      for (let key in promiseValue[i]) {
        if (col.indexOf(key) === -1) {
          if (inArray(key, excluded)) {
            continue;
          }
          col.push(key);
        }
      }
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
        var td = document.createElement('td');
        td.innerHTML = promiseValue[i][col[j]];
        bRow.appendChild(td);
      }
      tBody.appendChild(bRow)
      
    }
    table.appendChild(tBody);	
    
		// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById('players');
    divContainer.appendChild(table);
    
    // Add data sorting through DataTable plugin.
    $('.sortable').DataTable();
    
    function inArray(needle, haystack) {
      var length = haystack.length;
      for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
      }
      return false;
    }
    
    
  })
  
})



