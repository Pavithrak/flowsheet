var SampleFlowsheetData = function() {
    var sampleflowsheet = {
        entries : [
            {conceptId:1,value:"",date: "2001-01-12"},
            {conceptId:2,value:"55",date: "2001-01-12"},
            {conceptId:3,value:"103",date: "2002-01-12"},
            {conceptId:4,value:"false",date: "2002-01-12"},
            {conceptId:5,value:"Dermatitis",date: "2010-01-12"},
        ],
        "conceptMap":{
            "1":
            {"name":"Systolic blood pressure","numeric":{hi:"",low:"",unit:"mmHg"},
                "desc":"SBP is the pressure exerted by circulating blood upon the walls of blood vessels, and is one of the principal vital signs.",
                "classType":"Test","dataType":"Coded"},
            "2":
                {"name":"diastolic blood pressure", dataType:"numeric",classType:"Diagnosis", numeric:{hi:"150",low:"100",unit:"mmHg"}},
            "3":{"name":"Temparature (C)",dataType:"numeric",classType:"Test",numeric:{hi:"150",low:"100",unit:"DEG C"}},
            "4":{name:"Pregnancy status",dataType:"boolean",classType:"Finding"},
                "5":{name:"Problem added",dataType:"non-numeric",classType:"Finding"}
            },
        "conceptClasses":["Test","Diagnosis","Finding"],
        "obsDates":["2001-01-12","2002-01-12","2010-01-12"]
        };

    this.flowsheet = sampleflowsheet;
    return this;
}