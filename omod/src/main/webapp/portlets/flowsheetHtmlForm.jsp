<%@ include file="/WEB-INF/template/include.jsp" %>

<openmrs:htmlInclude file="/moduleResources/flowsheet/grid.locale-en.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.jqGrid.min.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/sampleFlowsheetData.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/flowsheet.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/dateRangeSlider.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.multiselect.js"/>

<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.jqgrid.css"/>


<input type="hidden" id="patientId" name="patientId" value='<request:parameter name="patientId" />'/>


<table>
    <tr>
        <td>
            <table>
                <tr>
                    <td>
                        <label for="dateFilter">Date range:</label>
                        <input type="text" id="dateFilter" style="border:0; color:#f6931f; font-weight:bold;"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="slider" style="width:500px;float:left">
                        </div>
                    </td>
                </tr>
            </table>
            
        </td>
        <td>
            <table id="flowsheet" width="500px">
            </table>
        </td>
</table>

<script type="text/javascript">

    var patientIdValue = $j('#patientId').val();

    var jsondata = {patientId:patientIdValue};

    var flowsheet = new Flowsheet($j("#flowsheet"));
    var slider = new DateRangeSlider($j("#slider"));
       

    var handleFlowsheetData = function(flowsheetDataJson) {
        var data = new FlowsheetData(flowsheetDataJson);
        flowsheet.render(data);
        slider.render(data.getDateRange(),"dateFilter");
    }

    $j.ajax({
        url: "flowsheet.json",
        data: jsondata,
        success: handleFlowsheetData,
        dataType: "json"
    });


</script>

