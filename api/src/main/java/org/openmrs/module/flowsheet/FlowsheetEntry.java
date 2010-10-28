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

	public String getValue() {
		return obs.getValueAsString(null);
	}

	public String getDataType() {
		return obs.getConcept().getDatatype().getName();
	}

	public String getClassType() {
		return obs.getConcept().getConceptClass().getName();
	}

	public String getDate() {
		return obs.getObsDatetime().toString();
	}

}
