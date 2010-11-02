var DateRangeSlider = function(flowsheetData){
    var dateRange = flowsheetData.getAllDates();


    this.slider = function(sliderId,dateFilterId) {
        jQuery("#"+sliderId).slider({
                    range: true,
                    min: 0,
                    max: dateRange.length-1,
                    values: [0,dateRange.length-1],
                    slide: function(event, ui) {
                        jQuery("#"+dateFilterId).val( dateRange[ui.values[0]] + ' - ' + dateRange[ui.values[1]]);
                    }
                });

            jQuery("#"+dateFilterId).val(dateRange[jQuery("#"+sliderId).slider("values", 0)] + ' - ' + dateRange[jQuery("#"+sliderId).slider("values", 1)]);
        };


}

