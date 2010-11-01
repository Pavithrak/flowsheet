var data = {
    entries : [
        {
            name : "Systolic blood pressure",
            value : "95 mmHg",
            dataType : "numeric",
            classType : "Test",
            date : "2001-01-12"
        },
        {
            name : "Temperature",
            value : "102 C",
            dataType : "numeric",
            classType : "Test",
            date : "2003-01-12"
        }
    ]
}

Screw.Unit(function() {
    describe("flowsheet grid", function() {
        var flowsheet;
        before(function(){
            flowsheet = new Flowsheet("flowsheet");
            flowsheet.render(data);
        }),
        it("should display the concept name of the observation", function() {
            var name = $('#2').find('td:nth-child(2)').html();
            expect(name).to(equal, data.entries[0].name);
        }),
        it("should display the concept value of the observation", function() {
           var value = $('#2').find('td:nth-child(3)').html();
           expect(value).to(equal, data.entries[0].value);
           }),
        it("should display date of the observation", function() {
            var date = $('#2').find('td:nth-child(1)').html();
            expect(date).to(equal, "12/01/2001");//formatted date
        }),
        it("should display observation in reverse chronological order", function(){
            var firstRowDate = $('#1').find('td:nth-child(1)').html();
            var secondRowDate = $('#2').find('td:nth-child(1)').html();
            expect(firstRowDate).to(equal,"12/01/2003");
            expect(secondRowDate).to(equal,"12/01/2001");
            }),
        it("should display observations grouped by date",function(){
            var firstGroupRowDate = $('#flowsheetghead_0').find('td:nth-child(1) b').html();
            var secondGroupRowDate = $('#flowsheetghead_1').find('td:nth-child(1) b').html();
            expect(firstGroupRowDate).to(equal,"2003-01-12");
            expect(secondGroupRowDate).to(equal,"2001-01-12");
        })
    })
});

Screw.Unit(function() {
    describe("flowsheet data", function() {
        it("should filter by a date range", function() {
            var sheetData = new FlowsheetData(data);
            var entries = sheetData.filter({
                date : {
                    from : "01/01/2002",
                    to : "01/02/2004"
                }
            })
        }),
        it("should filter by class", function() {
            var sheetData = new FlowsheetData(data);
            var entries = sheetData.filter({
                classType : "Test"
            })
        })
    })
});