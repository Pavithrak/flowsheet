package org.openmrs.module.flowsheet.web.dwr;

import java.util.ArrayList;
import java.util.List;

import org.openmrs.module.flowsheet.web.dwr.data.Encounter;
import org.openmrs.module.flowsheet.web.dwr.data.Flowsheet;

// DWRFlosheetService - dummy implementation as of now - WIP
public class DWRFlowsheetService {

	public Flowsheet getFlowSheetForPatient(Integer patientId){
		List<Encounter> encounters = new ArrayList<Encounter>();
		Encounter encounter = new Encounter(new org.openmrs.Encounter());
		encounters.add(encounter);
		Flowsheet flowsheet = new Flowsheet(encounters);
		return flowsheet;
	}
}
