var data = {
    entries : [
        {name:"Systolic blood pressure",value:"95 mmHg",dataType:"numeric",classType:"Test", obs_date: "2001-01-12"}
    ]}

Screw.Unit(function() {
    // Tests are organized into 'describes' and 'its', following the style of RSpec.
    describe("flowsheet grid", function() {
        it("should display the concept name for the observation", function() {
            var flowsheet = new Flowsheet($("#flowsheet"));
            flowsheet.render(data);
            var name = $('#1').find('td:nth-child(2)').html() ;
            expect(name).to(equal,data.entries[0].name);
        })
    })
});