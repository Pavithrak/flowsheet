package org.openmrs.module.flowsheet;

import org.openmrs.Concept;
import org.openmrs.ConceptName;
import org.openmrs.Obs;

import java.util.Locale;

public class ConceptInfo {
    private Concept concept;

    public ConceptInfo(Obs obs) {
        if(obs != null){
            this.concept = obs.getConcept();
        }
        else{
            concept = new Concept();
        }
    }

    public String getName(){
		ConceptName shortName = concept.getShortNameInLocale(Locale.ENGLISH);
		return shortName == null ? concept.getName().getName() : shortName.getName();
    }

    public String getDesc() {
        if(concept.getDescription() != null){
            return concept.getDescription().getDescription();
        }
        return null;
    }

    public String getDataType() {
		return concept.getDatatype().getName();
	}

	public String getClassType() {
		return concept.getConceptClass().getName();
	}
	public Numeric getNumeric() {
        if (concept.isNumeric()) {
			return new Numeric(concept);
		}
		return null;
	}
}
