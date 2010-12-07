package org.openmrs.module.flowsheet.web.controller;

import org.openmrs.api.context.Context;
import org.openmrs.module.flowsheet.Flowsheet;
import org.openmrs.module.flowsheet.impl.FlowsheetService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import flexjson.JSONSerializer;

@Controller
public class FlowsheetFormController {
	@RequestMapping(method = RequestMethod.GET,value = "/flowsheet.json")
	public void loadFlowsheet(
			@RequestParam(required = true, value = "patientId") Integer id,
			ModelMap map) {
		FlowsheetService service = Context.getService(FlowsheetService.class);
		Flowsheet flowsheet = service.getFlowsheet(id);
		map.put("flowsheet", flowsheet);
	}

    @RequestMapping(method = RequestMethod.GET,value = "/flowsheetSnapshot.json")
    public void loadFlowsheetSnapshot(
            @RequestParam(required = true, value = "patientId") Integer id,
            ModelMap map) {
        FlowsheetService service = Context.getService(FlowsheetService.class);
        Flowsheet flowsheet = service.getFlowsheetSnapshot(id);
        map.put("flowsheet", flowsheet);

    }

}