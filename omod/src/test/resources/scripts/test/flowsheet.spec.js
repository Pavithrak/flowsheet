var data = {
	entries : [ {
		name : "Systolic blood pressure",
		value : "95 mmHg",
		dataType : "numeric",
		classType : "Test",
		obs_date : "2001-01-12"
	} ]
}

Screw.Unit(function() {
	// Tests are organized into 'describes' and 'its', following the style of
	// RSpec.
	describe("flowsheet grid", function() {
		it("should display the concept name of the observation", function() {
			var flowsheet = new Flowsheet($("#flowsheet"));
			flowsheet.render(data);
			var name = $('#1').find('td:nth-child(2)').html();
			expect(name).to(equal, data.entries[0].name);
		}), it("should display the concept value of the observation",
				function() {
					var flowsheet = new Flowsheet($("#flowsheet"));
					flowsheet.render(data);
					var value = $('#1').find('td:nth-child(3)').html();
					expect(value).to(equal, data.entries[0].value);
				}), it("should display date of the observation", function() {
			var flowsheet = new Flowsheet($("#flowsheet"));
			flowsheet.render(data);
			var date = $('#1').find('td:nth-child(1)').html();
			expect(date).to(equal, data.entries[0].obs_date);
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