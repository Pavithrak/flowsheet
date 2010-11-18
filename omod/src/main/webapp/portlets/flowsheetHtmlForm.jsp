<%@ include file="/WEB-INF/template/include.jsp" %>

<openmrs:htmlInclude file="/moduleResources/flowsheet/grid.locale-en.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.jqGrid.min.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/date.js" />
<openmrs:htmlInclude file="/scripts/jquery-ui/js/jquery-ui.custom.min.js" />
<openmrs:htmlInclude file="/moduleResources/flowsheet/flowsheet.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.multiselect.js"/>

<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.jqgrid.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jslider.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/uicustom.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.dependClass.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.slider-min.js"/>
<openmrs:htmlInclude file="/scripts/flot/jquery.flot.js" />


<input type="hidden" id="patientId" name="patientId" value='<request:parameter name="patientId" />'/>

<table class="table_group">
    <tr>
        <td class="flowsheet_left_panel">
            <table>
                <tr>
                    <td>
                        <div class="slider_title"> Date Range</div>
                        <div class="slider_info"> From : <label id="sliderInfoFrom"></label></div>
                        <div class="slider_info"> To : <label id="sliderInfoTo"></label></div>

                        <div class="layout-slider">
                             <span class="slider">
                            <input id="Slider1" type="slider" name="price"/></span>
                        </div>
                    </td>

                    </tr>
                <tr>
                    <td>

                        <div id="classTypeList">
                            <div class="slider_title">Result Types</div>
                        </div>

                    </td>
                </tr>
            </table>

        </td>
        <td class="flowsheet_grid">
            <table id="flowsheet">
            </table>

        </td>
</table>

<div id="obsInfo" class="obsInfoPanel">
    <div id="obsInfoLabel" class="obsInfoLabel"></div>
    <div id="numericObsGraph" class="obsGraph"></div>
    <div id="numericObsGraphLegend" class="obsGraphLegend" ></div>
    <div id="numericObsInfoGrid" class="obsInfoGrid">
    </div>

</div>

<script type="text/javascript">
    var patientIdValue = $j('#patientId').val();
    var jsondata = {
        patientId : patientIdValue
    };
    
    var flowsheetObj = new Flowsheet("flowsheet");
    var data;
    var classes = new ConceptClass("#classTypeList");
    var numericObsInfo = new ObsInfo(jQuery("#numericObsInfo"),"numericObsInfoGrid",jQuery("#numericObsGraph"),
            jQuery("#numericObsGraphLegend"),jQuery("#numericObsInfoLabel"));
 
    var filter = function() {
        var from = jQuery('#sliderInfoFrom').text();
        var to = jQuery('#sliderInfoTo').text();
        var entries = data.filter(new DateObject(from, to), classes.getSelected());
        flowsheetObj.reload(entries);
    }

    var dateRange = new DateRange(jQuery("#Slider1"), filter);

    
    var onClickHandlerForGrid = function(rowid,iCol,cellcontent,e) {
        e.stopPropagation();
        var conceptName = jQuery("#"+rowid).find('td:nth-child(2)').html();
        var searchResult = data.search(conceptName);
        numericObsInfo.reload(searchResult,rowid);
    }

    jQuery("body").click(function(){
        jQuery("#numericObsInfo").hide();
     });    
    

    renderflowsheet = function(json) {
    	data = new FlowsheetData(json);
        flowsheetObj.render(data.entries,onClickHandlerForGrid);
        classes.render(data.getConceptClasses());
        classes.change(filter);
        dateRange.render(data.getDateRange());
    };

    $j.ajax({
        url : "flowsheet.json",
        data : jsondata,
        success : renderflowsheet,
        dataType : "json"
    });

</script>

