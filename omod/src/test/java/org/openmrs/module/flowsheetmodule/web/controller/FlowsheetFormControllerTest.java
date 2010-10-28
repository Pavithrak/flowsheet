package org.openmrs.module.flowsheetmodule.web.controller;

import java.util.List;
import java.util.Map;

import junit.framework.Assert;

import org.junit.Test;
import org.openmrs.module.flowsheet.web.controller.FlowsheetFormController;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.springframework.ui.ModelMap;

import flexjson.JSONDeserializer;

public class FlowsheetFormControllerTest extends BaseModuleContextSensitiveTest {
	@SuppressWarnings("rawtypes")
	@Test
	public void shouldSerializeToJson() {
		ModelMap map = new ModelMap();
		new FlowsheetFormController().loadFlowsheet(7, map);
		Map flowsheet = new JSONDeserializer<Map>().deserialize((String) map
				.get("flowsheet"));
		Assert.assertEquals("Test", ((Map) ((List) ((Map) flowsheet
				.get("flowsheet")).get("entries")).get(0)).get("classType"));
	}
}
