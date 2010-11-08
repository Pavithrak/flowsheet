package org.openmrs.module.flowsheet;

import java.util.Locale;

import org.openmrs.Concept;
import org.openmrs.Obs;

public class FlowsheetEntry {

	private String name;
	private String value;
	private String dataType;
	private String classType;
	private String date;
	private Numeric numeric;

	public FlowsheetEntry(Obs obs) {
		Concept concept = obs.getConcept();
		name = concept.getName().getName();
		value = obs.getValueAsString(Locale.ENGLISH);
		dataType = concept.getDatatype().getName();
		classType = obs.getConcept().getConceptClass().getName();
		date = obs.getObsDatetime().toString();
		if (concept.isNumeric()) {
			this.numeric = new Numeric(concept);
		}
	}

	public String getName() {
		return name;
	}

	public String getValue() {
		return value;
	}

	public String getDataType() {
		return dataType;
	}

	public String getClassType() {
		return classType;
	}

	public String getDate() {
		return date;
	}

	public Numeric getNumeric() {
		return numeric;
	}

}
