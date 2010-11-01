var SampleFlowsheetData = function() {
    var sampleflowsheet = {
        entries : [
            {name:"Systolic blood pressure",value:"95 mmHg",dataType:"numeric",classType:"Test", date: "2001-01-12"},
            {name:"diastolic blood pressure",value:"55 mmHg",dataType:"numeric",classType:"Diagnosis", date: "2001-01-12"},
            {name:"Temparature (C)",value:"103 DEG C",dataType:"numeric",classType:"Finding", date: "2002-01-12"},
            {name:"Pregnancy status",value:"false",dataType:"boolean",classType:"Finding", date: "2002-01-12"},
            {name:"Problem added",value:"Dermatitis",dataType:"non-numeric",classType:"Finding", date: "2010-01-12"}
        ]
    };
    this.flowsheet = sampleflowsheet;
    return this;
}