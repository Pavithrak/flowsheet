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
        /* To be used if date format received is different from the default
        var dateRE = /^(\d{2})[\/\- ](\d{2})[\/\- ](\d{4})/;
        dates.sort(function(date1, date2) {
            date1 = date1.replace(dateRE, "$3$2$1");
            date2 = date2.replace(dateRE, "$3$2$1");
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
        });
        */
        dates.sort();
        return dates;
    }

    this.getAllDates = function() {
        var dates = createDateArray(this.entries);
        return sortDateArray(jQuery.unique(dates));
    };
}
