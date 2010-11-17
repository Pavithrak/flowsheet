<%@ include file="/WEB-INF/template/include.jsp" %>

<openmrs:htmlInclude file="/moduleResources/flowsheet/grid.locale-en.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.jqGrid.min.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/flowsheet.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.multiselect.js"/>

<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.jqgrid.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jslider.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/uicustom.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.dependClass.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.slider-min.js"/>


<input type="hidden" id="patientId" name="patientId" value='<request:parameter name="patientId" />'/>

<table class="table_group">
    <tr>
        <td class="flowsheet_left_panel">
            <table>
                <tr>
                    <td class="slider_title">Date Range
                    </td>
                </tr>
                <tr>
                    <td class="slider_info">From : <label id="sliderInfoFrom"></label>
                    </td>
                </tr>
                <tr>
                    <td class="slider_info">To : <label id="sliderInfoTo"></label>
                    </td>
                </tr>
                <tr>
                    <td>

                        <div class="layout-slider">
                             <span class="slider">
                            <input id="Slider1" type="slider" name="price"/></span>
                        </div>
                        <br/>

                        <div id="classTypeList"> <div class="slider_title">Result Types</div></div>

                    </td>
                </tr>
            </table>

        </td>
        <td class="flowsheet_grid">
            <table id="flowsheet">
            </table>

        </td>
</table>


<script type="text/javascript">
    var gridTableId = "flowsheet";
    var patientIdValue = $j('#patientId').val();
    var jsondata = {
        patientId : patientIdValue
    };
    var flowsheetObj = new Flowsheet(gridTableId);
    var flowsheetData = null;
    var classTypeListId = "classTypeList";
    var sliderId = "Slider1";


    var classTypes = new ConceptClassTypes();

    var filterHandler = function() {
        var from = jQuery('#sliderInfoFrom').text();
        var to = jQuery('#sliderInfoTo').text();
        var entries = flowsheetData.filterEntries(new DateObject(from, to), classTypes.getSelectedClassTypes());
        flowsheetObj.reload(entries);
    }

    var slider = new DateRangeSlider(jQuery("#" + sliderId), filterHandler);
    var handleFlowsheetData = function(flowsheetDataJson) {
        flowsheetData = new FlowsheetData(flowsheetDataJson);
        flowsheetObj.render(flowsheetData.entries);
        slider.render(flowsheetData.getDateRange(), sliderId);
        classTypes.render(flowsheetData.getUniqueClassTypes(), classTypeListId);
        classTypes.attachClassTypesOnChangeHandler(filterHandler);
    }


    $j.ajax({
        url : "flowsheet.json",
        data : jsondata,
        success : handleFlowsheetData,
        dataType : "json"
    });

</script>

