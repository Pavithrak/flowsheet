String.prototype.contains = function(compare) {
    if (compare) {
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

    this.render = function(entries, onClickHandlerForGrid) {
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
            rowNum: 10000000,
            colModel:[
                {name:'date', width:150, sorttype:'date', formatter:'date', datefmt:'d/m/Y', klass:'firstCol'},
                {name:'name', width:180,formatter:nameFormatter},
                {name:'value',width:100,formatter:valueFormatter},
                {name:'low',width:100,formatter:rangeFormatter},
                {name:'conceptId',hidden: true }
            ],
            sortname: 'date',
            altRows:true,
            altclass:'row_odd',
            grouping:true,
            width:550,
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

    var nameFormatter = function(cellvalue, options, rowObject) {
       return rowObject.name(); 
    }

    var rangeFormatter = function(cellvalue, options, rowObject) {
        if (rowObject.numeric() && rowObject.numeric().hi && rowObject.numeric().low) {
            return "(" + rowObject.numeric().low + "-" + rowObject.numeric().hi + ")";
        }
        return " ";
    }

    var valueFormatter = function(cellvalue, options, rowObject) {
        if (rowObject.value) {
            if (rowObject.numeric()) {
                var valueWitUnit = rowObject.value + " " + rowObject.numeric().unit;
                if (rowObject.comment) {
//                    valueWitUnit = valueWitUnit + "\n" + rowObject.comment + "<img class='commentImage'/>";
//                    valueWitUnit = valueWitUnit + "\n" + "<img src='comment.gif' id='commentImg' class='commentImage'  alt='' //>" +rowObject.comment;
                    valueWitUnit = valueWitUnit + "\n" + "*" +rowObject.comment;
                }
                return valueWitUnit;
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
    this.conceptMap = data.flowsheet.conceptMap;
    this.conceptClasses = data.flowsheet.conceptClasses;
    this.obsDates = data.flowsheet.obsDates;
    
    this.initEntries = function(data){
		jQuery(this.entries).each(function(index,entry){
		    entry.name = function(){
		        var conceptMap = data.flowsheet.conceptMap;
		        return conceptMap[entry.conceptId].name ;
		    };
		    entry.numeric = function(){
		        var conceptMap = data.flowsheet.conceptMap;
		        return conceptMap[entry.conceptId].numeric ;
		    };
		    entry.classType = function(){
		        var conceptMap = data.flowsheet.conceptMap;
		        return conceptMap[entry.conceptId].classType ;
		    };
		
		});
    };
    
    this.initEntries(data);

/*  No longer used. Currently received from server.  
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
*/
    this.getDateRange = function() {
/*
        var dates = createDateArray(this.entries);
        return sortDateArray(jQuery.unique(dates));
*/
        return this.obsDates;
    };

    this.filter = function(dateObj, classTypes, searchEntries) {
        var filteredEntries = new Array();
        var entries = this.entries;
        jQuery(entries).each(function(index, entry) {
            var classTypeCheck = (jQuery.inArray(entry.classType(), classTypes) >= 0);
            var searchEntryCheck = true;
            var dateCheck=true;
            if (searchEntries && searchEntries.length > 0) {
                searchEntryCheck = (jQuery.inArray(entry.name(), searchEntries) >= 0);
            }
            if(dateObj.from && dateObj.to){
                    dateCheck = (entry.date >= dateObj.from) && (entry.date <= dateObj.to);
           }
            if (dateCheck && classTypeCheck && searchEntryCheck) {
                filteredEntries.push(entry);
            }
        });
        return filteredEntries;
    }

    this.searchForConceptId = function(query) {
        var filteredData = new Array();
        jQuery(this.entries).each(function(index, entry) {
            if (entry.conceptId == query) {
                filteredData.push(entry);
            }
        });

        return filteredData;
    }

    this.search = function(query) {
        var filteredData = new Array();
        jQuery(this.entries).each(function(index, entry) {
            if (entry.name().contains(query) || entry.value.contains(query)) {
                filteredData.push(entry);
            }
        });

        return filteredData;
    }

    this.getConceptClasses = function() {
/*
        var uniqueClassTypes = [];
        jQuery(this.entries).each(function() {
            if ((jQuery.inArray(this.classType(), uniqueClassTypes)) < 0) {
                uniqueClassTypes.push(this.classType());
            }
        })
        return uniqueClassTypes;
*/
        return this.conceptClasses;
    }

    this.getConceptDesc = function(conceptId) {
        if (this.conceptMap[conceptId] && this.conceptMap[conceptId].desc) {
            return this.conceptMap[conceptId].desc;
        }
        return null;
    }
    
    this.updateData = function(json){
        this.entries = json.flowsheet.entries;
        this.conceptMap = json.flowsheet.conceptMap;
        this.initEntries(json);
    }
}

var DateRange = function(slider, filterHandler) {
    this.slider = slider;

    var date = function(values) {
        this.from = value.split(";")[0];
        this.to = value.split(";")[1];
    }

    var hideRangeElements = function () {
        jQuery("#dateRangeText").hide();
        jQuery("#dateFrom").hide();
        jQuery("#dateTo").hide();
        jQuery(".layout-slider").hide();
    }

    this.render = function(dateRange) {

        if (!dateRange || dateRange.length === 0) {
            hideRangeElements();
            return "";
        }

        if (dateRange.length <= 1) {
            jQuery("#dateFrom").hide();
            jQuery("#dateTo").hide();
            jQuery(".layout-slider").html("Insufficient data to filter");
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

var ConceptClass = function(list) {
    this.list = list;

    this.render = function(classTypes) {
        if (!classTypes || classTypes.length == 0) {
            jQuery("#classTypeList").hide();
        }


        jQuery(classTypes).each(function(index, classType) {
            var classTypeContainer = jQuery(list);
            var classTypeSpan = jQuery('<span>');

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

    this.getSelected = function() {
        var selectedClassTypes = [];
        jQuery("input[@name='classTypeCB[]']:checked").each(function() {
            var valueCB = jQuery(this).val();
            selectedClassTypes.push(valueCB);
        });
        return selectedClassTypes;
    }

    this.change = function(filterHandler) {
        jQuery("input[name='classTypeCB']").change(filterHandler);
    }

    this.attachSelectClearAll = function(filter) {
        var selectDeselectAll = function(checkedStatus) {
            jQuery("input[name='classTypeCB']").each(function() {
                this.checked = checkedStatus;
            });
        }

        jQuery('#selectAll').click(function() {
            selectDeselectAll(true);
            filter.call();
        })

        jQuery('#clearAll').click(function() {
            selectDeselectAll(false);
            filter.call();
        })
    }

}

var DateObject = function(from, to) {
    this.from = from;
    this.to = to;
}

var ConceptNameSearch = function(selectElement) {
    this.selectElement = selectElement;

    var hideSearchElements = function () {
        jQuery("#conceptSelect").hide();
        jQuery("#holder").hide();
        jQuery(".facebook-auto").hide();
        jQuery("#search").hide();
        jQuery("#clear").hide();
    }

    this.render = function(entries, filter) {
        var uniqueEntries = getUniqueEntries(entries);
        if (uniqueEntries.length > 0) {
            jQuery(".searchPanel").show();
            jQuery(this.selectElement).fcbkcomplete({
                json_url: uniqueEntries,
                addontab: false,
                cache: false,
                height: 20,
                filter_selected:false,
                filter_case:false,
                maxshownitems:10,
                maxitimes:10,
                onselect:function() {
                    filter.call();
                },
                onremove:filter
            });

        } else {
            jQuery(".searchPanel").hide();
        }


    }

    var getUniqueEntries = function (entries) {
        var uniqueEntries = [];
        jQuery.each(entries, function(index, entry) {
            if (jQuery.inArray(entry.name(), uniqueEntries) < 0) {
                uniqueEntries.push(entry.name());
            }
        });

        return uniqueEntries;
    }

}

var ObsInfo = function(obsInfoElem, numericObsInfoGrid, numericObsGraph, numericObsGraphLegend,
                       obsInfoLabel, maximizeIcon, obsInfoDialog) {
    var requiredKey = ["date","value"];
    this.obsInfoElem = obsInfoElem;
    this.numericObsGraph = numericObsGraph;
    this.numericObsGraphLegend = numericObsGraphLegend;
    this.obsInfoLabel = obsInfoLabel;
    this.maximizeIcon = maximizeIcon;
    this.numericObsInfoGrid = numericObsInfoGrid;
    jQuery(this.obsInfoElem).hide();

    var renderObsInfoGrid = function(entries, theme, requiredKey) {
        var array = entries;
        var str = '<table class="' + theme + '">';
        str += '<thead><tr>';
        for (var index in requiredKey) {
            str += '<th scope="col">' + requiredKey[index] + '</th>';
        }
        str += '</tr></thead>';

        str += '<tbody>';
        for (var i = 0; i < array.length; i++) {
            str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
            for (var key in requiredKey) {
                var keyToLook = requiredKey[key];
                str += '<td>' + array[i][keyToLook] + '</td>';
            }
            str += '</tr>';
        }
        str += '</tbody>'
        str += '</table>';
        jQuery(numericObsInfoGrid).append(str);
        jQuery(obsInfoLabel).html(entries[0].name());
        jQuery(maximizeIcon).attr("conceptId", entries[0].conceptId);

    }

    var renderObsInfo = function(entries) {
        jQuery(obsInfoElem).show();
        jQuery(numericObsInfoGrid).empty();
        if (isNumericObs(entries)) {
            jQuery(numericObsGraph).show();
            jQuery(numericObsGraphLegend).show();
            var dataToPlot = convertEntriesToPlotArray(entries);
            jQuery.plot(numericObsGraph, [
                {label:"Normal Hi",data: dataToPlot.criticalRangeHi,lines: { show: true, fill: false,color:"#d18b2c" }},
                {label:"Normal Low",data: dataToPlot.criticalRangeLow,lines: { show: true, fill: false,color:"#d18b2c" }},
                {label:"Value",data: dataToPlot.values,lines: { show: true },points: { show: true }}
            ],
            {
                xaxis:{
                    mode:"time",timeformat:"%y/%m/%d",ticks:4
                },legend:{
                container:jQuery(numericObsGraphLegend),noColumns:3
            },grid: { hoverable: true, clickable: true }
            }
                    );
        } else {
            jQuery(numericObsGraph).hide();
            jQuery(numericObsGraphLegend).hide();
        }
        renderObsInfoGrid(entries, "lightPro", requiredKey);
    }

    this.reload = function(entries, positionTargetElem) {
        jQuery(obsInfoElem).attr("class", "obsInfoPanel");
        jQuery(obsInfoLabel).show();
        jQuery(maximizeIcon).show();
        renderObsInfo(entries);

        jQuery(obsInfoElem).position({
            of: positionTargetElem,
            my: "left center",
            at: "right center",
            offset: "10 0",
            collision: "fit"
        });

    }

    this.reloadInExpandedMode = function(entries) {
        jQuery(obsInfoElem).attr("style", "display: block");
        jQuery(obsInfoElem).attr("class", "obsInfoPanelExpanded");
        jQuery(obsInfoLabel).hide();
        jQuery(maximizeIcon).hide();
        jQuery(obsInfoDialog).attr("title", jQuery(obsInfoLabel).html());
        jQuery(obsInfoDialog).dialog({
            resizable: false,
            modal: true,
            width: 'auto',
            closeOnEscape:true,
            close :hideObsInfo
        });
        renderObsInfo(entries);
    };
    var hideObsInfo = function() {
        jQuery(numericObsInfoGrid).empty();
        jQuery(obsInfoElem).hide();
        jQuery(obsInfoDialog).dialog('destroy');
        jQuery(obsInfoDialog).attr("style", "");
    }
    this.hide = function() {
        hideObsInfo();
    }

    var convertEntriesToPlotArray = function(entries) {
        var dataToPlot = {}; //json containing, critical range array and value array
        var criticalRangeHi = Array();
        var criticalRangeLow = Array();
        var values = Array();
        jQuery.each(entries, function(index, entry) {
            values.push([Date.parse(entry.date).getTime(),entry.value]);
            criticalRangeHi.push([Date.parse(entry.date).getTime(),entry.numeric().hi]);
            criticalRangeLow.push([Date.parse(entry.date).getTime(),entry.numeric().low]);
        })
        dataToPlot.values = values;
        dataToPlot.criticalRangeHi = criticalRangeHi;
        dataToPlot.criticalRangeLow = criticalRangeLow.reverse();
        return dataToPlot;
    }

    var isNumericObs = function(entries) {
        if (entries.length >= 1 && entries[0].numeric()) {
            return true;
        }
        return false;
    }

    this.setConceptDesc = function(conceptDescElem, conceptDescText) {
        if (conceptDescText) {
            jQuery(conceptDescElem).show();
            jQuery(conceptDescElem).html(conceptDescText);
        } else {
            jQuery(conceptDescElem).hide();
        }
    }
}


