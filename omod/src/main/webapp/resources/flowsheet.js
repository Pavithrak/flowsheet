String.prototype.contains = function(compare){
	return this.toLowerCase().indexOf(compare.toLowerCase()) != -1;
}


var Flowsheet = function(tableId) {
    this.tableId = tableId;

    this.render = function(entries) {
        if (!entries || entries.length == 0) {
            jQuery("#" + tableId).append(jQuery('<tr>')
                    .append(jQuery('<td>')
                    .text('There are currently no observations for this patient')));

            return;
        }
        jQuery("#" + tableId).jqGrid({
            data: entries,
            datatype: "local",
            height: 'auto',
            rowNum: 100,
            rowList: [10,20,30],
            //            colNames:['Date','Name', 'Value','Range'],
            colModel:[
                {name:'date', width:150, sorttype:'date', formatter:'date', datefmt:'d/m/Y',search:true},
                {name:'name', width:290},
                {name:'value',width:100},
                {name:'low',width:100,formatter:rangeFormatter}
            ],
            sortname: 'date',
            grouping:true,
            groupingView : { groupField : ['date'], groupColumnShow : [false], groupText : ['<b>{0}</b>'], groupCollapse : true, groupOrder: ['desc'], groupCollapse : false },
            viewrecords: true, sortorder: "desc"


        });

        jQuery('.ui-jqgrid-hdiv').hide();

        jQuery("#" + tableId).jqGrid('filterToolbar', {autosearch:true,searchOnEnter:true,multipleSearch:true });

    }

    this.reload = function(entries){
    	jQuery("#" + tableId).jqGrid('setGridParam',{data:entries}).trigger("reloadGrid");
    }
    
    function rangeFormatter(cellvalue, options, rowObject) {
        if (rowObject.numeric) {
            return "(" + rowObject.numeric.low + "-" + rowObject.numeric.hi + " " + rowObject.numeric.unit + ")";
        }
        return " ";
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
        });
        
        return filteredData;
    }
    
    this.search = function(query){
        var filteredData = new Array();
        jQuery(this.entries).each(function(index, entry) {
            if (entry.name.contains(query) || entry.value.contains(query)) {
                filteredData.push(entry);
            }        	
        });
        
        return filteredData;
    }
}

var DateRangeSlider = function(slider, onChangeHandler) {
    this.slider = slider;
    this.render = function(dateRange, dateFilterId) {
        if(!dateRange || dateRange.length <= 1){
            jQuery(".layout-slider").html("No sufficient date to filter");
            return;
        }

        var dateRangeLength = (dateRange.length - 1);
        jQuery(this.slider).attr("value", "0;" + dateRangeLength);
        jQuery(this.slider).slider(
        {
            range : true,
            //            min : 0,
            //            max : dateRangeLength,
            from : 0,
            to :dateRangeLength ,
            scale : dateRange,
            onstatechange : function(value) {
                var from = value.split(";")[0];
                var to = value.split(";")[1];
                onChangeHandler.call(null, dateRange[from], dateRange[to]);
            },
            smooth: false,
            limits :false,
            step : 1,
            skin: "plastic"
        });

        jQuery('.jslider-value span').remove();

        //        jQuery("#" + dateFilterId)
        //                .val(
        //                dateRange[jQuery(this.slider).slider("values", 0)]
        //                        + ' - '
        //                        + dateRange[jQuery(this.slider).slider(
        //                        "values", 1)]);
    };

}

