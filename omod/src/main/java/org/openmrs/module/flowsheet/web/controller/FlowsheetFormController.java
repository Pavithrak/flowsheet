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
//@RequestMapping(value = "/flowsheet.form")
public class FlowsheetFormController{
    @RequestMapping(method = RequestMethod.GET )
    public void loadFlowsheet(
            @RequestParam(required = true, value = "patientId") Integer id,
            ModelMap map) {
        FlowsheetService service = Context.getService(FlowsheetService.class);
        Flowsheet flowsheet = service.getFlowsheet(id);
//        map.put("flowsheet", new JSONSerializer().rootName("flowsheet")
//                .exclude("*.class").deepSerialize(flowsheet));
        map.put("flowsheet",flowsheet);
    }
}