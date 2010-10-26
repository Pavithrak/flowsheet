<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Flowsheet</title>
<%@ include file="/WEB-INF/template/include.jsp"%>
<openmrs:htmlInclude file="/dwr/engine.js" />
<openmrs:htmlInclude file="/dwr/util.js" />
<openmrs:htmlInclude file="/dwr/interface/DWRFlowsheetService.js" />

</head>
<body>

Hello World!, Welcome to Flowsheet project
<div id="flowsheet">
</div>

</body>

	<script>
	var patientId = <request:parameter name="patientId"/> ;
	var getFlowsheetData = function(){
		DWRFlowsheetService.getFlowSheetForPatient(patientId,drawFlowsheet);
	};
	var newcontent = '';
	var drawFlowsheet = function(flowsheetData){
		$j.each(flowsheetData.encounters,function(val){
			newcontent += val;
		});
		$j('#flowsheet').html(newcontent);
	}
	
	 $j(document).ready(getFlowsheetData);            
	 </script>

</html>