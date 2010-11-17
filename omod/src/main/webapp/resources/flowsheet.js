String.prototype.contains = function(compare) {
    if(compare){
        return this.toLowerCase().indexOf(compare.toLowerCase()) != -1;
    }
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

    this.render = function(entries,onClickHandlerForGrid) {
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
                {name:'date', width:150, sorttype:'date', formatter:'date', datefmt:'d/m/Y', class:'firstCol'},
                {name:'name', width:290},
                {name:'value',width:100,formatter:valueFormatter},
                {name:'low',width:100,formatter:rangeFormatter}
            ],
            sortname: 'date',
            altRows:true,
            altclass:'row_odd',
            grouping:true,
            width:700,
            onCellSelect:onClickHandlerForGrid,
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

    this.filterEntries = function(dateObj, classTypes) {
        var filteredEntries = new Array();
        var entries = this.entries;
        jQuery(entries).each(function(index, entry) {
            var classTypeCheck = (jQuery.inArray(entry.classType, classTypes) >= 0);
            var dateCheck = (entry.date >= dateObj.from) && (entry.date <= dateObj.to);
            if (dateCheck && classTypeCheck) {
                filteredEntries.push(entry);
            }
        });
        return filteredEntries;
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

    this.getUniqueClassTypes = function() {
        var uniqueClassTypes = [];
        jQuery(this.entries).each(function() {
            if ((jQuery.inArray(this.classType, uniqueClassTypes)) < 0) {
                uniqueClassTypes.push(this.classType);
            }
        })
        return uniqueClassTypes;
    }
}

var DateRangeSlider = function(slider, filterHandler) {
    this.slider = slider;

    var date = function(values) {
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
            callback: function(value) {
                var from = value.split(";")[0];
                var to = value.split(";")[1];
                filterHandler.call(null);
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

var ConceptClassTypes = function() {

    this.render = function(classTypes, classTypeListId) {
        jQuery(classTypes).each(function(index, classType) {
            var classTypeContainer = jQuery("#" + classTypeListId);
//
//            var classTypeSpan =  jQuery('<span>', {
//                id: classType+"span"
//            })

             var classTypeSpan =  jQuery('<span>');


            var inputElement = jQuery('<input>', {
                id: classType,
                name: 'classTypeCB',
                type: 'checkbox',
                value: classType,
                checked:true
            }).appendTo(classTypeSpan);

            classTypeSpan.append(classType);

            classTypeSpan.appendTo(classTypeContainer);

        })
    }

    this.getSelectedClassTypes = function() {
        var selectedClassTypes = [];
        jQuery("input[@name='classTypeCB[]']:checked").each(function() {
            var valueCB = jQuery(this).val();
            selectedClassTypes.push(valueCB);
        });
        return selectedClassTypes;
    }

    this.attachClassTypesOnChangeHandler = function(filterHandler) {
        jQuery("input[name='classTypeCB']").change(filterHandler);
    }

}

var DateObject = function(from, to) {
    this.from = from;
    this.to = to;
}

var ObsInfo = function(obsInfoElem,numericObsInfoGrid,numericObsGraph,numericObsGraphLegend,obsInfoLabel){
 this.obsInfoElem = obsInfoElem;
 this.numericObsGraph = numericObsGraph;
 this.numericObsGraphLegend = numericObsGraphLegend;
 this.obsInfoLabel = obsInfoLabel;
 jQuery(this.obsInfoElem).hide();


 var requiredKey = ["date","value"];

    this.render = function(entries, theme, requiredKey) {
        var array = entries;
        var str = '<table class="' + theme + '">';
        // table head
            str += '<thead><tr>';
            for (var index in requiredKey) {
                str += '<th scope="col">' + requiredKey[index] + '</th>';
            }
            str += '</tr></thead>';

        // table body
        str += '<tbody>';
        for (var i = 0; i < array.length; i++) {
            str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
            for(var key in requiredKey){
                var keyToLook = requiredKey[key];
                str += '<td>' + array[i][keyToLook] + '</td>';
            }
            str += '</tr>';
        }
        str += '</tbody>'
        str += '</table>';
        jQuery("#" + numericObsInfoGrid).append(str);
        jQuery(this.obsInfoLabel).html(entries[0].name);

    }

    this.reload = function(entries,positionTargetId) {
        jQuery(this.obsInfoElem).show();
        jQuery("#" + numericObsInfoGrid).empty();
        jQuery(this.obsInfoElem).position({
            of: jQuery( "#"+positionTargetId ),
            my: "left center",
            at: "right center",
            offset: "10 0",
            collision: "fit"
        });
        if(isNumericObs(entries)){
            jQuery(this.numericObsGraph).show();
            jQuery(this.numericObsGraphLegend).show();
            var dataToPlot = convertEntriesToPlotArray(entries);
            jQuery.plot(this.numericObsGraph, [
                    {label:"Hi",data: dataToPlot.criticalRangeHi,lines: { show: true, fill: false,color:"#d18b2c" }},
                    {label:"Low",data: dataToPlot.criticalRangeLow,lines: { show: true, fill: false,color:"#d18b2c" }},
                    {label:"Value",data: dataToPlot.values,lines: { show: true },points: { show: true }}
            ],
            {
                xaxis:{
                    mode:"time",timeformat:"%y/%m/%d",ticks:4
                },legend:{
                    container:this.numericObsGraphLegend,noColumns:3
                },grid: { hoverable: true, clickable: true }
            }
            );
        }else{
           jQuery(this.numericObsGraph).hide();
           jQuery(this.numericObsGraphLegend).hide();
        }
        this.render(entries, "lightPro", requiredKey);
    }

    this.hide = function(){
        jQuery("#" + numericObsInfoGrid).empty();
        jQuery(this.obsInfoElem).hide();
    }

    var convertEntriesToPlotArray = function(entries){
        var dataToPlot = {}; //json containing, critical range array and value array
        var criticalRangeHi = Array();
        var criticalRangeLow = Array();
        var values = Array();
        jQuery.each(entries,function(index,entry){
            values.push([Date.parse(entry.date).getTime(),entry.value]);
            criticalRangeHi.push([Date.parse(entry.date).getTime(),entry.numeric.hi]);
            criticalRangeLow.push([Date.parse(entry.date).getTime(),entry.numeric.low]);
        })
        dataToPlot.values = values;
        dataToPlot.criticalRangeHi = criticalRangeHi;
        dataToPlot.criticalRangeLow = criticalRangeLow.reverse();
        return dataToPlot;
    }

    var isNumericObs = function(entries){
        if(entries.length>=1 && entries[0].numeric){
            return true;
        }
        return false;
    }

}


