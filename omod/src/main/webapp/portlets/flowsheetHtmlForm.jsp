<%@ include file="/WEB-INF/template/include.jsp" %>

<openmrs:htmlInclude file="/moduleResources/flowsheet/grid.locale-en.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.jqGrid.min.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/flowsheet.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.multiselect.js"/>

<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.jqgrid.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jslider.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.dependClass.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.slider-min.js"/>


<input type="hidden" id="patientId" name="patientId" value='<request:parameter name="patientId" />'/>


<table>
    <tr>
        <td>
            <table>
                <tr>
                    <td valign="top">

                        <div class="layout-slider" style="width: 100%;align:top">
                             <span style="display: inline-block; width: 400px; padding: 0 5px;">
                            <input id="Slider1" type="slider" name="price"/></span>
                        </div>

                    </td>
                    <td>
                        <table id="flowsheet" width="500px">
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

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
        flowsheetObj.reload(entries);
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

