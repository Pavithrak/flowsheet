String.prototype.contains = function(compare) {
    return this.toLowerCase().indexOf(compare.toLowerCase()) != -1;
}


var Flowsheet = function(tableId) {
    this.tableId = tableId;

    hideColumnHeaders = function() {
        jQuery('.ui-jqgrid-hdiv').hide();
        jQuery('.jqgroup td').attr('colspan', 3);
    }

    createSearchToolBar = function () {
        jQuery("#" + tableId).jqGrid('filterToolbar', {autosearch:true,searchOnEnter:true,multipleSearch:true });
    }

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
            rowNum: -1,
            //            colNames:['Date','Name', 'Value','Range'],
            colModel:[
                {name:'date', width:150, sorttype:'date', formatter:'date', datefmt:'d/m/Y'},
                {name:'name', width:290},
                {name:'value',width:100,formatter:valueFormatter},
                {name:'low',width:100,formatter:rangeFormatter}
            ],
            sortname: 'date',
            altRows:true,
            altclass:'row_odd',
            grouping:true,
            width:700,
            groupingView : { groupField : ['date'], groupColumnShow : [false], groupText : ['<b>{0}</b>'], groupCollapse : true, groupOrder: ['desc'], groupCollapse : false },
            hoverrows:false,
            viewrecords: false, sortorder: "desc"


        });

        hideColumnHeaders();
        createSearchToolBar();

    }

    this.reload = function(entries) {
        jQuery("#" + tableId).clearGridData(false);
        jQuery("#" + tableId).jqGrid('setGridParam', {data:entries}).trigger("reloadGrid");
    }

    var rangeFormatter = function(cellvalue, options, rowObject) {
        if (rowObject.numeric && rowObject.numeric.hi && rowObject.numeric.low) {
            return "(" + rowObject.numeric.low + "-" + rowObject.numeric.hi + ")";
        }
        return " ";
    }

    var valueFormatter = function(cellvalue, options, rowObject) {
        if (rowObject.value) {
            if (rowObject.numeric) {
                return  rowObject.value + " " + rowObject.numeric.unit;
            }
            else {
                return rowObject.value;
            }
        }
        return " ";

    };
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

    this.search = function(query) {
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
    
    var date = function(values){
    	this.from = value.split(";")[0];
    	this.to = value.split(";")[1];
    }
    
    this.render = function(dateRange, dateFilterId) {
        if (!dateRange || dateRange.length <= 1) {
            jQuery(".layout-slider").html("No sufficient date to filter");
            return;
        }

        var dateRangeLength = (dateRange.length - 1);
        jQuery(this.slider).attr("value", "0;" + dateRangeLength);
        jQuery(this.slider).slider(
        {
            range : true,
            from : 0,
            to :dateRangeLength ,
            scale : [dateRange[0],dateRange[dateRangeLength]],
            onstatechange : function(value) {
                var from = value.split(";")[0];
                var to = value.split(";")[1];
                jQuery("#sliderInfoFrom").html(dateRange[from]);
                jQuery("#sliderInfoTo").html(dateRange[to]);
            },
            callback: function(value){
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
        jQuery("#sliderInfoFrom").html(dateRange[0]);
        jQuery("#sliderInfoTo").html(dateRange[dateRangeLength]);
    };

}

