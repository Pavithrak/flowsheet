Screw.Unit(function() {
    describe("flowsheet grid", function() {
        var flowsheet;
        var data;
        before(function() {
            flowsheet = new Flowsheet("flowsheet");
            data = new FlowsheetData(SampleFlowsheetData());
            flowsheet.render(data);
        }),
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
                })
    })
});


Screw.Unit(function() {
    describe("flowsheet data", function() {
        it("getUniqueAndSortedDates should return the unique sorted array of dates", function() {
            var flowsheetData = new FlowsheetData(SampleFlowsheetData());
            var uniqueAndSortedDates = flowsheetData.getUniqueAndSortedDates();
            expect(uniqueAndSortedDates.length).to(equal, 3);
            expect(uniqueAndSortedDates[0]).to(equal, "2001-01-12");
            expect(uniqueAndSortedDates[1]).to(equal, "2002-01-12");
            expect(uniqueAndSortedDates[2]).to(equal, "2010-01-12");

        })
    })
});
