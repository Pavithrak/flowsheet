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

                        <div id="classTypeList">Class Types</div>

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
    var patientIdValue = $j('#patientId').val();
    var jsondata = {
        patientId : patientIdValue
    };
    
    var flowsheetObj = new Flowsheet("flowsheet");
    var data;
    var classes = new ConceptClass("#classTypeList");
 
    var filter = function() {
        var from = jQuery('#sliderInfoFrom').text();
        var to = jQuery('#sliderInfoTo').text();
        var entries = data.filter(new DateObject(from, to), classes.getSelected());
        flowsheetObj.reload(entries);
    }

    var dateRange = new DateRange(jQuery("#Slider1"), filter);


    renderflowsheet = function(json) {
    	data = new FlowsheetData(json);
        flowsheetObj.render(data.entries);
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

