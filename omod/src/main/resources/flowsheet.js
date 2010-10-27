var Flowsheet = function() {

    this.render = function(flowsheetData, tableId) {
        jQuery("#" + tableId).jqGrid({
            data: flowsheetData.entries,
            datatype: "local",
            height: 'auto',
            rowNum: 100,
            rowList: [10,20,30],
            colNames:['Date','Name', 'Value'],
            colModel:[
                {name:'obs_date', width:150, sorttype:'date', formatter:'date', datefmt:'d/m/Y'},
                {name:'name', width:290},
                {name:'value',width:100}
            ],
            sortname: 'obs_date',
            viewrecords: true, caption: "Observations" , sortorder: "desc"});

    }

}
