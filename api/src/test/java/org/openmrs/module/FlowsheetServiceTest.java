package org.openmrs.module;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.openmrs.api.context.Context;
import org.openmrs.module.flowsheet.Flowsheet;
import org.openmrs.module.flowsheet.FlowsheetEntry;
import org.openmrs.module.flowsheet.impl.FlowsheetService;
import org.openmrs.test.BaseContextSensitiveTest;

public class FlowsheetServiceTest extends BaseContextSensitiveTest {

    @Test
    public void shouldReturnObservationsForPerson() {
        FlowsheetService service = Context.getService(FlowsheetService.class);
        List<FlowsheetEntry> entries = service.getFlowsheet(1).getEntries();
        Assert.assertEquals(0, entries.size());
        
        entries = service.getFlowsheet(7).getEntries();
        Assert.assertEquals(9, entries.size());
    }

    @Test
    public void shouldReturnConceptNameForEachObservation() {
        FlowsheetService service = Context.getService(FlowsheetService.class);
        FlowsheetEntry entry = service.getFlowsheet(7).getEntries().get(0);
        Assert.assertEquals("WEIGHT (KG)", entry.getName());
    }
}
