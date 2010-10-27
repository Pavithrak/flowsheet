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
    public void shouldReturnFlowsheetData() {
        FlowsheetService service = Context.getService(FlowsheetService.class);
        Flowsheet flowsheet
                = service.getFlowsheet(1);
        List<FlowsheetEntry> entries = flowsheet.getEntries();
        Assert.assertEquals(9, entries.size());
    }

}
