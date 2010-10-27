var data = {
    entries : [
        {name:"Systolic blood pressure",value:"95 mmHg",dataType:"numeric",classType:"Test", obs_date: "2001-01-12"}
    ]}

Screw.Unit(function() {
    // Tests are organized into 'describes' and 'its', following the style of RSpec.
    describe("flowsheet", function() {
        it("should render data grid for observations", function() {
            var flowsheet = new Flowsheet();
            flowsheet.render(data, "flowsheet");
            var renderedEntryName = $('#1').find('td:nth-child(2)').html() ;
            expect(renderedEntryName).to(equal,data.entries[0].name);
        })
    })
});