var Flowsheet = function(flowsheetData) {
	this.observations = flowsheetData.observations;
	this.classTypes = flowsheetData.classTypes;
	
	this.populateObservationDataGrid = function(tableId){
		jQuery("#"+tableId).jqGrid({
			data: this.observations, 
			datatype: "local", 
			height: 'auto', 
			rowNum: 100, 
			rowList: [10,20,30], 
			colNames:['Date','Name', 'Value'], 
			colModel:[ {name:'obs_date', width:150}, 
			           {name:'name', width:290}, 
			           {name:'value',width:100}], 
           viewrecords: true, caption: "Observations" });
		
		//name:"Systolic blood pressure",value:"95 mmHg",dataType:"numeric",classType:"Test", obs_date: "2001-01-12"
	}
	
}
