package org.openmrs.module;

import java.util.HashMap;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.openmrs.api.context.Context;
import org.openmrs.module.flowsheet.ConceptInfo;
import org.openmrs.module.flowsheet.FlowsheetEntry;
import org.openmrs.module.flowsheet.Flowsheet;
import org.openmrs.module.flowsheet.impl.FlowsheetService;
import org.openmrs.test.BaseContextSensitiveTest;
import org.openmrs.test.BaseModuleContextSensitiveTest;

public class FlowsheetServiceTest extends BaseModuleContextSensitiveTest {

//     protected static final String INITIAL_DATA_XML = "resources/org/openmrs/module/flowsheetTestDataSet.xml";
//     protected static final String INITIAL_DATA_XML = "../../../../../resources/org/openmrs/module/flowsheetTestDataSet.xml";
     protected static final String INITIAL_DATA_XML = "org/openmrs/module/flowsheetTestDataSet.xml";

	private List<FlowsheetEntry> getFlowSheetEntry(int personId) {
		return service.getFlowsheet(personId).getEntries();
	}

	private FlowsheetService service;
	private FlowsheetEntry entry;

	@Before
	public void setUp() throws Exception {
        executeDataSet(INITIAL_DATA_XML);
		service = Context.getService(FlowsheetService.class);
		entry = getFlowSheetEntry(7).get(0);
	}

	@Test
	public void shouldReturnObservationsForPerson() {
		Assert.assertEquals(0, getFlowSheetEntry(1).size());
		Assert.assertEquals(9, getFlowSheetEntry(7).size());
	}

	@Test
	public void shouldReturnConceptNameForEachObservation() {
		Assert.assertEquals("WT", entry.getName());
	}

	@Test
	public void shouldReturnValueForEachObservation() {
		Assert.assertEquals("50.0", entry.getValue());
	}

	@Test
	public void shouldReturnDataTypeForEachObservation() {
		Assert.assertEquals("Numeric", entry.getDataType());
	}

	@Test
	public void shouldReturnClassTypeForEachObservation() {
		Assert.assertEquals("Test", entry.getClassType());
	}

	@Test
	public void shouldReturnDateForEachObservation() {
		Assert.assertEquals("2008-07-01", entry.getDate());
	}

	@Test
	public void shouldReturnUnitForEachObservation() throws Exception {
		Assert.assertEquals("kg", entry.getNumeric().getUnit());
	}

	@Test
	public void shouldReturnCommentObservation() throws Exception {
		FlowsheetEntry entry = getFlowSheetEntry(7).get(0);
		Assert.assertEquals("Normal", entry.getComment());
	}

	@Test
	@Ignore("Add additional data set to test this")
	public void shouldReturnHiValueEachObservation() throws Exception {
		Assert.assertEquals("250.0", entry.getNumeric().getHi().toString());
	}
	
	@Test
	@Ignore("Add additional data set to test this")
	public void shouldReturnHiLowAsEmpty() throws Exception {
		Assert.assertEquals("", entry.getNumeric().getHi());
		Assert.assertEquals("", entry.getNumeric().getLow());
	}

    @Test
    public void shouldReturnConceptDesc(){
        Flowsheet flowsheet = service.getFlowsheet(7);
        HashMap<String, ConceptInfo> conceptDescMap = flowsheet.getConceptMap();
        Assert.assertEquals("Patient's weight in kilograms.",conceptDescMap.get("WT").getDesc());
        Assert.assertEquals("Measure of CD4 (T-helper cells) in blood",conceptDescMap.get("CD4").getDesc());
    }
}
