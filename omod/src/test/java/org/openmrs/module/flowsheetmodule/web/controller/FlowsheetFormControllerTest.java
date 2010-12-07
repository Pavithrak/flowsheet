package org.openmrs.module.flowsheetmodule.web.controller;

import java.util.List;
import java.util.Map;

import junit.framework.Assert;

import org.junit.Test;
import org.openmrs.module.flowsheet.Flowsheet;
import org.openmrs.module.flowsheet.web.controller.FlowsheetFormController;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.springframework.ui.ModelMap;

import flexjson.JSONDeserializer;

public class FlowsheetFormControllerTest extends BaseModuleContextSensitiveTest {
	@SuppressWarnings("rawtypes")
	@Test
	public void shouldReturnFlowsheetForPatient() {
		ModelMap map = new ModelMap();
		new FlowsheetFormController().loadFlowsheet(7, map);
		Flowsheet flowsheet = (Flowsheet)map.get("flowsheet");

        Assert.assertEquals(flowsheet.getEntries().size(),9);

	}

	@Test
	public void shouldReturnFlowsheetSnapshotForPatient() {
		ModelMap map = new ModelMap();
		new FlowsheetFormController().loadFlowsheetSnapshot(7, map);
		Flowsheet flowsheet = (Flowsheet)map.get("flowsheet");

        Assert.assertEquals(flowsheet.getEntries().size(),2);

	}
}
