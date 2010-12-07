Screw.Unit(function() {
    describe("Flowsheet", function() {
        var flowsheet = new Flowsheet("flowsheet");
        var data = new FlowsheetData(SampleFlowsheetData());
        flowsheet.render(data.entries);
        it("should display the concept name of the observation", function() {
            var name = $('#2').find('td:nth-child(2)').html();
            expect(name).to(equal, data.entries[2].name());
        }),
                it("should display the concept value along with the units for the numeric observations", function() {
                    var value = $('#2').find('td:nth-child(3)').html();
                    var expectedData = data.entries[2];
                    expect(value).to(equal, expectedData.value + " " + expectedData.numeric().unit);
                }),
                it("should display the concept value  for the non numeric observations", function() {
                    var value = $('#1').find('td:nth-child(3)').html();
                    var expectedData = data.entries[4];
                    expect(value).to(equal, expectedData.value);
                }),
                it("should display blank value for the null observations", function() {
                    var value = $('#4').find('td:nth-child(3)').html();
                    expect(value).to(equal, " ");
                }),
                it("should display date of the observation", function() {
                    var date = $('#2').find('td:nth-child(1)').html();
                    expect(date).to(equal, "12/01/2002");//formatted date
                }),
                it("should display observation in reverse chronological order", function() {
                    var firstRowDate = $('#1').find('td:nth-child(1)').html();
                    var secondRowDate = $('#2').find('td:nth-child(1)').html();
                    expect(firstRowDate).to(equal, "12/01/2010");
                    expect(secondRowDate).to(equal, "12/01/2002");
                }),
                it("should display observations grouped by date", function() {
                    var firstGroupRowDate = $('#flowsheetghead_0').find('td:nth-child(1) b').html();
                    var secondGroupRowDate = $('#flowsheetghead_1').find('td:nth-child(1) b').html();
                    expect(firstGroupRowDate).to(equal, "2010-01-12");
                    expect(secondGroupRowDate).to(equal, "2002-01-12");
                }),
                it("should display the range value for numeric observation", function() {
                    var value = $('#2').find('td:nth-child(4)').html();
                    expect(value).to(equal, "(" + data.entries[2].numeric().low + "-" + data.entries[2].numeric().hi + ")");
                }),
                it("should not display the range value for numeric observation when the high or low value is empty", function() {
                    var value = $('#4').find('td:nth-child(4)').html();
                    expect(value).to(equal, " ");
                }),
                it("should not display the range value for non-numeric observation", function() {
                    var value = $('#3').find('td:nth-child(4)').html();
                    expect(value).to(equal, " ");
                }),
                it("should hide the column headers ", function() {
                    expect(jQuery('.ui-jqgrid-hdiv').css("display")).to(equal, "none");
                }),
                it("should not create Grid if there are no observations", function() {
                    jQuery("#flowsheet").GridUnload();
                    var emptyData = function() {
                        this.flowsheet = {
                            entries : []
                        };
                        return this;
                    }
                    flowsheet.render(new FlowsheetData(emptyData()).entries);
                    expect(jQuery("#flowsheet").find("tbody").find("tr").find("td").text()).to(equal, "There are currently no observations for this patient");
                })

    })

});


Screw.Unit(function() {
    describe("Flowsheet data", function() {
        var flowsheetData ;
        before(function() {
            flowsheetData = new FlowsheetData(SampleFlowsheetData());
        });

                it("should be able to filter data by date and Concept Class Types", function() {
                    var filteredData = flowsheetData.filter(new DateObject("2002-01-02", "2020-01-01"), ["Finding","Test"]);
                    expect(filteredData.length).to(equal, 3);
                    var newfilteredData = flowsheetData.filter(new DateObject("1998-01-02", "2020-01-01"), ["Test","Diagnosis"]);
                    expect(3).to(equal, filteredData.length);
                }),
                it("should be able to filter data by date , Concept Class Types & Search Concept Names", function() {
                    var filteredData = flowsheetData.filter(new DateObject("2002-01-02", "2020-01-01"), ["Finding"], ["Problem added","Temparature"]);
                    expect(1).to(equal, filteredData.length);
                    var newfilteredData = flowsheetData.filter(new DateObject("1998-01-02", "2020-01-01"), ["Test","Diagnosis"], ["Pregnancy status"]);
                    expect(1).to(equal, filteredData.length);
                }),
                it("should search by concept name", function() {
                    var filteredData = flowsheetData.search("blood");
                    expect(2).to(equal, filteredData.length);
                }),
                it("should search by concept name for exact match", function() {
                    var filteredData = flowsheetData.searchForConceptId(22);
                    expect(0).to(equal, filteredData.length);
                    filteredData = flowsheetData.searchForConceptId(1);
                    expect(1).to(equal, filteredData.length);
                }),
                it("should search by concept value", function() {
                    var filteredData = flowsheetData.search("dermatitis");
                    expect(1).to(equal, filteredData.length);
                }),
                it("should return concept desc for concept name",function(){
                    var conceptDesc = flowsheetData.getConceptDesc(1);
                    var expectedDesc = "SBP is the pressure exerted by circulating blood upon " +
                            "the walls of blood vessels, and is one of the principal vital signs.";
                    expect(conceptDesc).to(equal,expectedDesc);
                }),
                it("should update data if needed",function(){
                	var json = {};
                	json.flowsheet = {
                	        entries : [
                	            {conceptId:1,value:"220",date: "2001-01-12"}
                	        ],
                	        "conceptMap":{
                	            "1":
                	            {"name":"Systolic blood pressure","numeric":{hi:"",low:"",unit:"mmHg"},
                	                "desc":"SBP is the pressure exerted by circulating blood upon the walls of blood vessels, and is one of the principal vital signs.",
                	                "classType":"Test","dataType":"Coded"}
                	            }
                	        };
                	flowsheetData.updateData(json);
                	expect(1).to(equal, flowsheetData.entries.length);
                })
    })
});

Screw.Unit(function() {
    describe("Date range filter", function() {
        it("should create a date range slider for the observations", function() {
            var sliderId = "Slider1";
            var slider = new DateRange(jQuery("#" + sliderId));
            slider.render(new FlowsheetData(SampleFlowsheetData()).getDateRange(), sliderId);
            expect(jQuery("#" + sliderId).attr("value")).to(equal, "0;2");
        }),
                it("should provide initial from and to date information", function() {
                    var sliderId = "Slider1";
                    var slider = new DateRange(jQuery("#" + sliderId));
                    slider.render(new FlowsheetData(SampleFlowsheetData()).getDateRange(), sliderId);
                    expect(jQuery("#sliderInfoFrom").html()).to(equal, "2001-01-12");
                    expect(jQuery("#sliderInfoTo").html()).to(equal, "2010-01-12");
                }),
                it("should not render the date range silder if there are no observations", function() {
                    var sliderId = "Slider1";
                    var emptyData = function() {
                        this.flowsheet = {
                            entries : []
                        };
                        return this;
                    }
                    var slider = new DateRange(jQuery("#" + sliderId));
                    slider.render(new FlowsheetData(emptyData()).getDateRange(), sliderId);
                    expect(jQuery(".layout-slider").is(':hidden')).to(equal, true);

                }),
                it("should not render the date range silder if there are observations of one date with the text stating the reason", function() {
                    var sliderId = "Slider1";
                    var emptyData = function() {
                        this.flowsheet = {
                            entries : [
                                {name:"Systolic blood pressure",value:"",dataType:"numeric",classType:"Test", date: "2001-01-12",numeric:{hi:"",low:"",unit:"mmHg"}}
                            ],
                            "obsDates":["2001-01-12"]
                        };
                        return this;
                    }
                    var slider = new DateRange(jQuery("#" + sliderId));
                    slider.render(new FlowsheetData(emptyData()).getDateRange(), sliderId);
                    expect(jQuery(".layout-slider").html()).to(equal, "Insufficient data to filter");
                })
    })
});

Screw.Unit(function() {
    describe("ConceptClassTypes", function() {
        var flowsheetData = new FlowsheetData(SampleFlowsheetData());
        var classTypeFilter = new ConceptClass("#classTypeList");
        classTypeFilter.render(flowsheetData.getConceptClasses());

        it("should render checkbox for all UniqueClassType data", function() {
            expect(3).to(equal, jQuery("#classTypeList").find("input").length);

            expect("Test").to(equal, jQuery("#classTypeList").find("input")[0].id);
            expect("classTypeCB").to(equal, jQuery("#classTypeList").find("input")[0].name);
            expect("Test").to(equal, jQuery("#classTypeList").find("input")[0].value);
            expect(true).to(equal, jQuery("#classTypeList").find("input")[0].checked);

            expect("Diagnosis").to(equal, jQuery("#classTypeList").find("input")[1].id);
            expect("classTypeCB").to(equal, jQuery("#classTypeList").find("input")[1].name);
            expect("Diagnosis").to(equal, jQuery("#classTypeList").find("input")[1].value);
            expect(true).to(equal, jQuery("#classTypeList").find("input")[1].checked);

            expect("Finding").to(equal, jQuery("#classTypeList").find("input")[2].id);
            expect("classTypeCB").to(equal, jQuery("#classTypeList").find("input")[2].name);
            expect("Finding").to(equal, jQuery("#classTypeList").find("input")[2].value);
            expect(true).to(equal, jQuery("#classTypeList").find("input")[2].checked);

        }),
                it("should retrieve checked classTypes", function() {
                    jQuery("#classTypeList").find("input")[0].checked = false;
                    jQuery("#classTypeList").find("input")[1].checked = false;
                    expect(1).to(equal, classTypeFilter.getSelected().length);
                })

    })
});

Screw.Unit(function() {
    describe("ConceptNameSearch - Search by Concept Name", function() {
        var conceptNameSearch = new ConceptNameSearch(jQuery("#conceptSelect"));
        it("should render the search widget if there are observations", function() {
            var flowsheetData = new FlowsheetData(SampleFlowsheetData());
            conceptNameSearch.render(flowsheetData.entries);
            expect(jQuery("#conceptSelect_annoninput").attr("class")).to(equal, "bit-input");

        }),
                it("should not render the search widget if there are no observations", function() {
                    var entries = [];
                    conceptNameSearch.render(entries);
                    expect(jQuery("#conceptSelect").is(':hidden')).to(equal, true);
                })
    });
})

Screw.Unit(function() {
    describe("ObsInfo - View details of an Observation", function() {
        var flowsheetData = new FlowsheetData(SampleFlowsheetData());
        var obsInfo = new ObsInfo("#obsInfo", "#obsInfoGrid", "#numericObsGraph",
                "#numericObsGraphLegend", "#obsInfoLabel", "#maximizeIcon", "#obsInfoDialog");

        it("should display observation specific data in a table for numeric observation", function() {
            var searchResult = flowsheetData.search("diastolic blood pressure");
            obsInfo.reload(searchResult, $("#positionTest"));
            expect($('#obsInfoGrid').find('td:nth-child(1)').html()).to(
                    equal, "2001-01-12"
                    );
            expect($('#obsInfoGrid').find('td:nth-child(2)').html()).to(
                    equal, "55"
                    );

        }),
                it("should dispay graph for numeric observation", function() {
                    var searchResult = flowsheetData.searchForConceptId(2);
                    obsInfo.reload(searchResult, $("#positionTest"));
                    expect($('#numericObsGraph').find('canvas').length).to(equal, 2);
                    expect($('#numericObsGraphLegend').find('td:nth-child(2)').html()).to(equal, "Normal Hi");
                    expect($('#numericObsGraphLegend').find('td:nth-child(4)').html()).to(equal, "Normal Low");
                    expect($('#numericObsGraphLegend').find('td:nth-child(6)').html()).to(equal, "Value");
                }),
                it("should not dispay graph for non-numeric observation", function() {
                    var searchResult = flowsheetData.searchForConceptId(4);
                    obsInfo.reload(searchResult, $("#positionTest"));
                    expect($('#numericObsGraph').is(':hidden')).to(be_true);
                    obsInfo.hide();
                }),
                it("should display observation specific data in a table for non-numeric observation", function() {
                    var searchResult = flowsheetData.searchForConceptId(4);
                    obsInfo.reload(searchResult, $("#positionTest"));
                    expect($('#obsInfoGrid').find('td:nth-child(1)').html()).to(
                            equal, "2002-01-12"
                            );
                    expect($('#obsInfoGrid').find('td:nth-child(2)').html()).to(
                            equal, "false"
                            );

                }),
                it("should be able to expand the obsInfo", function() {
                    var searchResult = flowsheetData.searchForConceptId(4);
                    obsInfo.reloadInExpandedMode(searchResult);
                    var classForObsInfoElem = jQuery("#obsInfo").attr("class");
                    expect(classForObsInfoElem).to(equal, "obsInfoPanelExpanded");
                    expect($('#obsInfoLabel').is(':hidden')).to(be_true);
                    expect($('#maximizeIcon').is(':hidden')).to(be_true);
                }),
                it("should display concept name in popup title", function() {
                    var searchResult = flowsheetData.searchForConceptId(4);
                    obsInfo.reloadInExpandedMode(searchResult);
                    var title = jQuery("#obsInfoDialog").attr("title");
                    expect(title).to(equal,"Pregnancy status" );
                    obsInfo.hide();
                }),
                it("should set concept desc when available",function(){
                    var conceptDescText = "This is the desc from flowsheetData";
                    obsInfo.setConceptDesc("#conceptDesc",conceptDescText);
                    expect($("#conceptDesc").html()).to(equal,conceptDescText);
                }),
                it("should make concept desc hidden when desc not available",function(){
                    var conceptDescText = null;
                    obsInfo.setConceptDesc("#conceptDesc",conceptDescText);
                    expect($("#conceptDesc").is(':hidden')).to(be_true);
                })

    })
});
