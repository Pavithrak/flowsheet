<%@ include file="/WEB-INF/template/include.jsp" %>

<openmrs:htmlInclude file="/moduleResources/flowsheet/grid.locale-en.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.jqGrid.min.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/flowsheet.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.multiselect.js"/>

<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.jqgrid.css"/>


<input type="hidden" id="patientId" name="patientId" value='<request:parameter name="patientId" />'/>


<table>
	<tr>
		<td>
		<table>
			<tr>
				<td><label for="dateFilter">Date range:</label> <input
					type="text" id="dateFilter"
					style="border: 0; color: #f6931f; font-weight: bold;" /></td>
			</tr>
			<tr>
				<td>
				<div id="slider" style="width: 500px; float: left"></div>
				</td>
			</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td>
		<table id="flowsheet" width="500px">
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

	var handleFlowsheetData = function(flowsheetDataJson) {
		flowsheetData = new FlowsheetData(flowsheetDataJson);
		flowsheetObj.render(flowsheetData.entries);
		slider.render(flowsheetData.getDateRange(), "dateFilter");
	}

	$j.ajax({
		url : "flowsheet.json",
		data : jsondata,
		success : handleFlowsheetData,
		dataType : "json"
	});

	var onChangeHandler = function(from, to) {
		var entries = flowsheetData.filterEntriesByDate(from, to);
		jQuery("#" + gridTableId).GridUnload();
		flowsheetObj.render(entries);
	}

	var slider = new DateRangeSlider(jQuery("#slider"), onChangeHandler);
</script>

