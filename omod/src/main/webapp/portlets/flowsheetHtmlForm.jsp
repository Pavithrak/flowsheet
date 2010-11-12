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
                    <td class="slider_info">From : yyyy-mm-dd
                    </td>
                </tr>
                <tr>
                    <td class="slider_info">To : yyyy-mm-dd
                    </td>
                </tr>
                <tr>
                    <td>

                        <div class="layout-slider" style="width: 100%">
                             <span class="slider">
                            <input id="Slider1" type="slider" name="price"  /></span>
                           </div>

                    </td>
                </tr>
            </table>

        </td>
        <td class="flowsheet_grid">
            <table id="flowsheet" style="{width:'600px'}">
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

    var onChangeHandler = function(from, to) {
        var entries = flowsheetData.filterEntriesByDate(from, to);
        jQuery("#" + gridTableId).GridUnload();
        flowsheetObj.render(entries);
    }
    var slider = new DateRangeSlider(jQuery("#Slider1"), onChangeHandler);

    var handleFlowsheetData = function(flowsheetDataJson) {
        flowsheetData = new FlowsheetData(flowsheetDataJson);
        flowsheetObj.render(flowsheetData.entries);
        slider.render(flowsheetData.getDateRange(), "Slider1");
    }

    $j.ajax({
        url : "flowsheet.json",
        data : jsondata,
        success : handleFlowsheetData,
        dataType : "json"
    });
</script>

