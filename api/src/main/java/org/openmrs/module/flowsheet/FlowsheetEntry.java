package org.openmrs.module.flowsheet;

import org.openmrs.Obs;

public class FlowsheetEntry {
	
	private final Obs obs;

	public FlowsheetEntry(Obs obs) {
		this.obs = obs;
	}

	public String getName() {
		return obs.getConcept().getName().getName();
	}
	
}
