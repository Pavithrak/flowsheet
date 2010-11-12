Screw.Unit(function() {
    describe("Flowsheet", function() {
        var flowsheet = new Flowsheet("flowsheet");
        var data = new FlowsheetData(SampleFlowsheetData());
        flowsheet.render(data.entries);
        it("should display the concept name of the observation", function() {
            var name = $('#2').find('td:nth-child(2)').html();
            expect(name).to(equal, data.entries[2].name);
        }),
                it("should display the concept value of the observation", function() {
                    var value = $('#2').find('td:nth-child(3)').html();
                    expect(value).to(equal, data.entries[2].value);
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
                    expect(value).to(equal, "(" + data.entries[2].numeric.low + "-" + data.entries[2].numeric.hi + " " + data.entries[2].numeric.unit + ")");
                }),
                it("should not display the range value for non-numeric observation", function() {
                    var value = $('#3').find('td:nth-child(4)').html();
                    expect(value).to(equal, " ");
                }),
                it("should hide the column headers ", function(){
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
        var flowsheetData = new FlowsheetData(SampleFlowsheetData());
        it("should return the unique sorted array of dates", function() {
            var range = flowsheetData.getDateRange();
            expect(range.length).to(equal, 3);
            expect("2001-01-12").to(equal, range[0]);
            expect("2002-01-12").to(equal, range[1]);
            expect("2010-01-12").to(equal, range[2]);

        }),
                it("should be able to filter data by date", function() {
                    var filteredData = flowsheetData.filterEntriesByDate("2002-01-02", "2020-01-01");
                    expect(filteredData.length).to(equal, 3);
                    filteredData = flowsheetData.filterEntriesByDate("1998-01-02", "2020-01-01");
                    expect(5).to(equal, filteredData.length);

                }),
                it("should search by concept name", function() {
                    var filteredData = flowsheetData.search("blood");
                    expect(2).to(equal, filteredData.length);
                }),
                it("should search by concept value", function() {
                    var filteredData = flowsheetData.search("dermatitis");
                    expect(1).to(equal, filteredData.length);
                })
    })
});

Screw.Unit(function() {
    describe("Date range filter", function() {
        it("should create a date range slider for the observations", function() {
            var sliderId = "Slider1";
            var slider = new DateRangeSlider(jQuery("#" + sliderId));
            slider.render(new FlowsheetData(SampleFlowsheetData()).getDateRange(), sliderId);
            expect(jQuery("#" + sliderId).attr("value")).to(equal, "0;2");
        }),
        it("should not render the date range silder if there are observations of one date or no observations", function() {
            var sliderId = "Slider1";
             var emptyData = function() {
                        this.flowsheet = {
                            entries : []
                        };
                        return this;
                    }
            var slider = new DateRangeSlider(jQuery("#" + sliderId));
            slider.render(new FlowsheetData(emptyData()).getDateRange(), sliderId);
            expect(jQuery(".layout-slider").html()).to(equal, "No sufficient date to filter");
        })
    })
});
var dateFilterId = "textSlider1";
