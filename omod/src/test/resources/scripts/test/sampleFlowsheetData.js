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
            {"name":"Systolic blood pressure", "shortName":"SBP","numeric":{hi:"",low:"",unit:"mmHg"},
                "desc":"SBP is the pressure exerted by circulating blood upon the walls of blood vessels, and is one of the principal vital signs.",
                "classType":"Test","dataType":"Coded", "synonyms":["Blood Pressure","Systoloc BP"]},
            "2":
            {"name":"diastolic blood pressure","shortName":"DBP", dataType:"numeric",classType:"Diagnosis", numeric:{hi:"150",low:"100",unit:"mmHg"},"synonyms":["Blood Pressure","Diastolic BP"]},
            "3":{"name":"Temparature (C)","shortName":"TEMP",dataType:"numeric",classType:"Test",numeric:{hi:"150",low:"100",unit:"DEG C"},"synonyms":[]},
            "4":{name:"Pregnancy status","shortName":"PS",dataType:"boolean",classType:"Finding","synonyms":["Pregnancy Status"]},
            "5":{name:"Problem added","shortName":"PA",dataType:"non-numeric",classType:"Finding","synonyms":["Diagnosis Added"]}
        },
        "conceptClasses":["Test","Diagnosis","Finding"],
        "obsDates":["2001-01-12","2002-01-12","2010-01-12"]
    };

    this.flowsheet = sampleflowsheet;
    return this;
}