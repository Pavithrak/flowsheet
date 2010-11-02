Screw.Unit(function() {
    describe("date Range Slider Creation", function() {
        it("should create a date range slider for the observations", function() {
            var slider = new DateRangeSlider(new FlowsheetData(SampleFlowsheetData()));
            var dateFilterId = "dateFilter";
            slider.slider("slider", dateFilterId);
            expect(jQuery("#"+dateFilterId).val()).to(equal,"2001-01-12 - 2010-01-12");
        })
    })
});