var Flowsheet = function(tableId) {
    this.tableId = tableId;

    this.render = function(entries) {
        //        jQuery(this.table).jqGrid({
        jQuery("#" + tableId).jqGrid({
            data: entries,
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

    this.getDateRange = function() {
        var dates = createDateArray(this.entries);
        return sortDateArray(jQuery.unique(dates));
    };

    this.filterEntriesByDate = function(from, to) {
        var filteredData = new Array();
        jQuery(this.entries).each(function(index, entry) {
            if ((entry.date >= from) && (entry.date <= to)) {
                filteredData.push(entry);
            }
        })
        return filteredData;
    }
}

var DateRangeSlider = function(slider, onChangeHandler) {
    this.slider = slider;
    this.render = function(dateRange, dateFilterId) {
        jQuery(this.slider).slider(
        {
            range : true,
            min : 0,
            max : dateRange.length - 1,
            values : [ 0, dateRange.length - 1 ],
            change : function(event, ui) {
                jQuery("#" + dateFilterId).val(
                        dateRange[ui.values[0]] + ' - '
                                + dateRange[ui.values[1]]);
                onChangeHandler.call(null, dateRange[ui.values[0]], dateRange[ui.values[1]]);
            }
        });

        jQuery("#" + dateFilterId)
                .val(
                dateRange[jQuery(this.slider).slider("values", 0)]
                        + ' - '
                        + dateRange[jQuery(this.slider).slider(
                        "values", 1)]);
    };

}

