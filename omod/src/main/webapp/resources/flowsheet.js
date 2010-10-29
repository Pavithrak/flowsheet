var Flowsheet = function(tableId) {
    this.tableId = tableId;

    this.render = function(flowsheetData) {
        jQuery("#"+this.tableId).jqGrid({
            data: flowsheetData.entries,
            datatype: "local",
            height: 'auto',
            rowNum: 100,
            rowList: [10,20,30],
            colNames:['Date','Name', 'Value'],
            colModel:[
                {name:'date', width:150, sorttype:'date', formatter:'date', datefmt:'d/m/Y'},
                {name:'name', width:290},
                {name:'value',width:100}
            ],
            sortname: 'date',
            viewrecords: true, caption: "Observations" , sortorder: "desc"});

    }
}
var FlowsheetData = function(data) {
    this.entries = data.flowsheet.entries;
}
