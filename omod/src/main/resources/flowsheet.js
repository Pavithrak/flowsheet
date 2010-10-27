var Flowsheet = function() {

	this.render = function(flowsheetData,tableId){
		jQuery("#"+tableId).jqGrid({
			data: flowsheetData.entries,
			datatype: "local", 
			height: 'auto', 
			rowNum: 100, 
			rowList: [10,20,30], 
			colNames:['Date','Name', 'Value'], 
			colModel:[ {name:'obs_date', width:150}, 
			           {name:'name', width:290}, 
			           {name:'value',width:100}], 
           viewrecords: true, caption: "Observations" });
		
	}
	
}
