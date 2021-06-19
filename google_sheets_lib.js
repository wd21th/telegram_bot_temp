const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({
  keyFile: "./orders-sheet.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

  // const spreadsheetId = "17Bmncfgvv-UwokQsuBkOebIc_qVhJUsov0uMlG53V7U";


function objReset(obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof(obj[key]) == 'string') {
        obj[key] = ''
      }else if(typeof(obj[key]) == 'object'){
        obj[key] = {}
        
      }
      else if(typeof(obj[key]) == 'boolean'){
        obj[key] = false
      }
      else if(typeof(obj[key]) == 'number'){
        obj[key] = 0
      }
      // console.log(typeof(obj[key]));
    }
  }
} // <- function objReset(obj)

let ranges = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    // 'AA',
    // 'AB'
  ]


  function asMap(arr1, arr2) {
    let map = new Map();
    if (arr1.length == arr2.length) {
      for (let i = 0; i < arr1.length; i++) {
        const el1 = arr1[i];
        const el2 = arr2[i];
        map.set(`${el1}`, `${el2}`);
      }
      return map;
    }


    
  }


const client = (async () => {
  return await auth.getClient()
})()

const googleSheets = google.sheets({ version: "v4", auth: client });


class GoogleSheet {
  
  // theLastRowNumber: null,
  // theLastColumnCase: '',
  theLastRowNumber = null
theLastColumnCase = ''


  spreadsheetId;
  constructor(spreadsheetId) {
    this.spreadsheetId = spreadsheetId;

  }

 
  async getSheet(sheet) {
    return await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: sheet,
    }).then(async function(res) {
      return await res.data.values
    })
  }
  
  async getProperties(sheet) {
    return await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: `${sheet}!1:1`,
    }).then(async function(res) {
      return await res.data.values[0]
    });
  }


  async getPropertiesAsObj(sheet) {
    return await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: `${sheet}!1:1`,
    }).then(async function(res) {
      var obj = {}
      var props = await res.data.values[0]
      props.forEach((prop) => {
        obj[prop] = ''
      });
      
      return obj;
    });
  }


  


 async getSheetNames()  {
   
  const request = {
    // The spreadsheet to request.
    spreadsheetId: this.spreadsheetId,  // TODO: Update placeholder value.

    // The ranges to retrieve from the spreadsheet.
    ranges: [],  // TODO: Update placeholder value.

    // True if grid data should be returned.
    // This parameter is ignored if a field mask was set in the request.
    includeGridData: false,  // TODO: Update placeholder value.

    auth: auth,
  };

  try {
    var sheets = []
    const response = (await googleSheets.spreadsheets.get(request)).data;
    // TODO: Change code below to process the `response` object:
    // console.log(JSON.stringify(response, null, 2));
    sheets = response.sheets
    // console.log(sheets);

    for (let i = 0; i < sheets.length; i++) {
       sheets[i] =  sheets[i].properties.title
    }
    return sheets;
  } catch (err) {
    console.error(err);
  }
    
 }

  
  // getRows.data.values
  async getRow(sheet, rowNumber) {
    var range = `${sheet}!${rowNumber}:${rowNumber}`
    
    return await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: range,
    }).then(async function(res) {
      return await res.data.values[0]
    })
  }


  
  async getRowAsObj(sheet, rowNumber) {
    var range = `${sheet}!${rowNumber}:${rowNumber}`
    
    var row =  await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: range,
    }).then(async function(res) {
      return await res.data.values[0]
    })
    
    var props = await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: `${sheet}!1:1`,
    }).then(async function(res) {
      return await res.data.values[0]
    });
    
    
    let rowAsObj = {}
    
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (row[i]) {
        
        rowAsObj[prop] = row[i];
      }else {
        rowAsObj[prop] = '';
      }
      
    }
    
    
    return rowAsObj;
    
  }
  
  
  
  
  async getRowWhere(sheet, column, value) {
    

       var arr = await this.selectColumn(sheet, column)

       console.log('index');
       if (typeof(value) == 'number') {
         value = value.toString()
    }
    console.log(arr);
    console.log(value);
       
       
      //  console.log(arr.indexOf(value));
      //  console.log(arr);
       
       if(arr.indexOf(value) > -1) {
         var rowCount = arr.indexOf(value)+2
       }else {
         console.log('Здесь ошибка');
        //  throw err;
       }
    
// console.log('152 '+rowCount);
    
    
    
    
    var range = `${sheet}!${rowCount}:${rowCount}`
    
    return await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: range,
    }).then(async function(res) {
      return await res.data.values[0]
    })
  }

  async getRowAsObjWhere(sheet, column, value) {

       var arr = await this.selectColumn(sheet, column)

      //  console.log('index');
      //  console.log(arr.indexOf(value));
      //  console.log(arr);
    let rowCount;
       if(arr.indexOf(value) > -1) {
         rowCount = arr.indexOf(value)+2
       }else {
         console.log('Здесь ошибка ',280);
        //  throw err;
       }
    
    this.theLastRowNumber = rowCount;
// console.log('152 '+rowCount);
    return await this.getRowAsObj(sheet, rowCount)
    
    
    
   /*  var range = `${sheet}!${rowCount}:${rowCount}`
    
    return await googleSheets.spreadsheets.values.get({
      auth,
      this.spreadsheetId,
      range: range,
    }).then(async function(res) {
      return await res.data.values[0]
    }) */
  }

  async getCeilAdresWhere(sheet, column, value, column2) {
    var props = await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: `${sheet}!1:1`,
    }).then(async function(res) {
      return await res.data.values[0]
    });
var arr = await this.selectColumn(sheet, column)
// console.log();
    var rowNumber;

if (typeof(value) == 'number') {
  rowNumber = arr.indexOf(value.toString()) + 2
}else {
  rowNumber = arr.indexOf(value) + 2
  
}
      
// console.log('index');
      //  console.log();
      //  console.log(arr);
      var index = props.indexOf(column2)
      var indexCase = ranges[index]
// indexCase = ranges[index]

var adres = sheet+'!'+indexCase+rowNumber

    return adres;

  }

  

  async getCeil(sheet, ceil) {
    return await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: ceil,
    }).then(async function(res) {
      return await res.data.values[0][0]
    })
  }
  
// updateCeil(sheet, ceil) {
async updateCeil(ceil, value) {

   var range = `${ceil}`
    
    const request = {
      // The ID of the spreadsheet to update.
      spreadsheetId: this.spreadsheetId,  // TODO: Update placeholder value.
      
      // The A1 notation of the values to update.
      range: range,  // TODO: Update placeholder value.
      // [A6:D6)
      
      
      valueInputOption: 'USER_ENTERED', 
      
      resource: {
        values: [[value]]
      },
      
      // auth: client,
      auth: auth
    };
    
    
    try {
      const response = (await googleSheets.spreadsheets.values.update(request)).data;
      // console.log(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
    }
    
  
  
  
  
    
  }
  


async getRowNumberByProperty(sheet, prop, value) {

  var column = await this.selectColumn(sheet, prop)

  var rowNumber = column.indexOf(value.toString())+2
  

  // console.log(column.indexOf(value));
  // console.log(column);
  // console.log(value);
  return rowNumber;
}
  
  async getRows(sheet, start, end) {
    var range = `${sheet}!${start}:${end}`
    
    return await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: range,
    }).then(async function(res) {
      return await res.data.values
    })
    
  }
  
  async getRowsAsObj(sheet, start, end) {
    var range = `${sheet}!${start}:${end}`
    
    var rows =  await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: range,
    }) // <- expression rows
    .then(async function (res) {
      return await res.data.values
    })
    
    var props = await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: `${sheet}!1:1`,
    }) // <- expression props
    .then(async function (res) {
      return await res.data.values[0]
    });
    
    
    let rowAsObj = {}
    let rowsArr = []
    // console.log(rows);
    
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      //  getRowAsObj
      for (let j = 0; j < props.length; j++) {
        const prop = props[j];
        if (row) {
          rowAsObj[prop] = row[j];
        }else {
          rowAsObj[prop] = '';
        }
        
      }
      rowsArr.push(rowAsObj)
      // objReset
    }
    
    
    
    
    
    
    return rowsArr;
    
  }
  
  
  async addRow(sheet, row)  {
    await googleSheets.spreadsheets.values.append({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: sheet,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [ row ]
      }
    })
  }

  async addRowJustify(sheet, rowObj)  {
    var obj = await this.getPropertiesAsObj(sheet);
    
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        obj[key] = rowObj[key];
      }
    }

    // console.log(obj);
    // console.log(Object.values( obj ));
    await this.addRow(sheet, Object.values( obj ))

  }

  
  // async test() {

    /* const resource = {
  properties: {
    // title,
   title: 'title'
      },
      // auth: client
};


await googleSheets.spreadsheets.create({
  resource,
  fields: this.spreadsheetId,
}, (err, spreadsheet) =>{
  if (err) {
    // Handle error.
    console.log(err);
  } else {
    console.log(`Spreadsheet ID: ${spreadsheet.this.spreadsheetId}`);
  }
});
     */
    
    
    

  // }
  
  
  async updateRow(sheet, rowNumber, row){
    
    /* const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    */
    
    
    
    var range = `${sheet}!${rowNumber}:${rowNumber}`
    
    const request = {
      // The ID of the spreadsheet to update.
      spreadsheetId: this.spreadsheetId,  // TODO: Update placeholder value.
      
      // The A1 notation of the values to update.
      range: range,  // TODO: Update placeholder value.
      // [A6:D6)
      
      
      valueInputOption: 'USER_ENTERED', 
      
      resource: {
        values: [row]
      },
      
      // auth: client,
      auth: auth,
    };
    
    
    try {
      const response = (await googleSheets.spreadsheets.values.update(request)).data;
      // console.log(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
    }
    
    
    
    
    
  } // <- async function updateRow(sheet, rowNumber, row)

  async selectColumn(sheet, column) {

    var props = await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: `${sheet}!1:1`,
    }).then(async function(res) {
      return await res.data.values[0]
    });

var index = props.indexOf(column)
index = ranges[index]

    
    var range = `${sheet}!${index}:${index}`
    // console.log('331: ' +range);
    // let result = await googleSheets.spreadsheets.values.get({
    return await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: range,
    }).then(async function(res) {
      var arr = await res.data.values.slice(1)
      var column = []
      arr.forEach((item) => {
        // console.log(item[0]);
        // console.log(item);
        column.push(item[0])
      });
      // console.log('345: ' +column);
      return column;
    })
// console.log("result "+result);
    // return result;
}

async selectColumns(sheet, columns)  {
var arr = []
  for (let i = 0; i < columns.length; i++) {
    arr.push(await this.selectColumn(sheet, columns[i]))
    // console.log();
  }
  return arr;


}
  
  
  async selectColumnsAsMap(sheet, columns) {
    let result = []
    // console.log('354: ' +columns);
    /* columns.forEach(async (column) => {
      // console.log("column");
      // console.log(column);
      var el = await this.selectColumn(sheet, column)
      console.log('el :'+el);
      // console.log();
      result.push(el)
      console.log('result '+result);
    }); */

    // console.log(sheet);
    // console.log(columns);
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      // console.log(column);
       var el = await this.selectColumn(sheet, column)
      // console.log('el :'+el);
      // console.log();
      result.push(el)
      // console.log('result '+result);
    }

    // console.log('362: ' +result);
    return asMap(result[0], result[1]);
  }

  async getColumnCase(sheet, rowNumber) {
    // console.log(ranges[rowNumber]);
    return ranges[rowNumber];
    /*  var props = await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: this.spreadsheetId,
      range: `${sheet}!1:1`,
    }).then(async function(res) {
      return await res.data.values[0]
    }); */

// console.log(props[index]);




  }


  async removeRow(sheet, rowNumber) {
    var range = `${sheet}!${rowNumber}:${rowNumber}`

    const request = {
    // The ID of the spreadsheet to update.
spreadsheetId: this.spreadsheetId,  // TODO: Update placeholder value.

    // The A1 notation of the values to clear.
    range: range,  // TODO: Update placeholder value.

    resource: {
      // TODO: Add desired properties to the request body.
    },

    auth: auth
  };

  try {
    const response = (await googleSheets.spreadsheets.values.clear(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
    
    
    
    
    
  }
  
  async removeRowWhere(sheet, column, value) {
    

       var arr = await this.selectColumn(sheet, column)

       console.log('index');
       if (typeof(value) == 'number') {
         value = value.toString()
       }
       
       
       console.log(arr.indexOf(value));
       console.log(arr);
       
       if(arr.indexOf(value) > -1) {
         var rowCount = arr.indexOf(value)+2
       }else {
        //  throw err;
       }
    
// console.log('152 '+rowCount);
    
    
    
    var range = `${sheet}!${rowCount}:${rowCount}`

    const request = {
    // The ID of the spreadsheet to update.
spreadsheetId: this.spreadsheetId,  // TODO: Update placeholder value.

    // The A1 notation of the values to clear.
    range: range,  // TODO: Update placeholder value.

    resource: {
      // TODO: Add desired properties to the request body.
    },

    auth: auth
  };

  try {
    const response = (await googleSheets.spreadsheets.values.clear(request)).data;
    // TODO: Change code below to process the `response` object:
    // console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }

  }
  
}




module.exports = GoogleSheet




// {} = updateRow
