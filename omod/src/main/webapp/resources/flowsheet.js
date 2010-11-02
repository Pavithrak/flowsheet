var Flowsheet = function(tableId) {
    this.tableId = tableId;

    this.render = function(flowsheetData) {
        jQuery("#" + this.tableId).jqGrid({
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
            grouping:true,
            groupingView : { groupField : ['date'], groupColumnShow : [true], groupText : ['<b>{0}</b>'], groupCollapse : true, groupOrder: ['desc'], groupCollapse : false },
            viewrecords: true, caption: "Observations" , sortorder: "desc"});

    }
}
var FlowsheetData = function(data) {
    this.entries = data.flowsheet.entries;


    function createDateArray(entries) {
        var datearr = [];
        if (datearr.length == 0) {
            jQuery(entries).each(function(key, value) {
                datearr.push(value.date);
            })
        }
        return datearr;
    }

    function sortDateArray(dates) {
        dates.sort();
        return dates;
    }

    this.getUniqueAndSortedDates = function() {
        var dates = createDateArray(this.entries);
        return sortDateArray(jQuery.unique(dates));
    };
}
