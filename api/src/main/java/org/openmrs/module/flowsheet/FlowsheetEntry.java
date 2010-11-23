package org.openmrs.module.flowsheet;

import java.text.SimpleDateFormat;
import java.util.Locale;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.openmrs.Concept;
import org.openmrs.ConceptName;
import org.openmrs.Obs;

public class FlowsheetEntry {

	private String name;
	private String value;
	private String dataType;
	private String classType;
	private String date;
	private Numeric numeric;
	private SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	private String comment;

    private Obs obs;

	public FlowsheetEntry(Obs obs) {
		Concept concept = obs.getConcept();

		ConceptName shortName = concept.getShortNameInLocale(Locale.ENGLISH);
		ConceptName displayName = shortName == null ? concept.getName() : shortName;
		name = displayName.getName();
		value = obs.getValueAsString(Locale.ENGLISH);
		dataType = concept.getDatatype().getName();
		classType = obs.getConcept().getConceptClass().getName();
		date = format.format(obs.getObsDatetime());
		if (concept.isNumeric()) {
			this.numeric = new Numeric(concept);
		}
        this.obs = obs ;
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

	public String getComment() {
		return comment;
	}

    public String getConceptDesc() {
        String conceptDesc = null;
        if(obs.getConcept().getDescription() != null){
            conceptDesc = obs.getConcept().getDescription().getDescription();
        }
        return conceptDesc;
    }

}
