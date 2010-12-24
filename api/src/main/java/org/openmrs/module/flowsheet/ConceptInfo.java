package org.openmrs.module.flowsheet;

import org.openmrs.Concept;
import org.openmrs.ConceptDatatype;
import org.openmrs.ConceptName;
import org.openmrs.Obs;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import java.util.Locale;

public class ConceptInfo {
    private Concept concept;
    private Integer obsId;
    public ConceptInfo(Obs obs) {
        if(obs != null){
            this.concept = obs.getConcept();
            this.obsId = obs.getObsId();
        }
        else{
            concept = new Concept();
        }
    }

    public String getShortName(){
        return getConceptNameAsString(concept.getShortNameInLocale(Locale.ENGLISH));
    }

    public String getName(){
        return getConceptNameAsString(concept.getName(Locale.ENGLISH));
    }

    private String getConceptNameAsString(ConceptName name) {
        return name != null ?  name.getName(): "";
    }

    public Collection<String> getSynonyms(){
        Collection<ConceptName> synonyms = concept.getSynonyms();
        Collection<String> synonymNames = new ArrayList<String>();
        if(synonyms != null){
            for(ConceptName name: synonyms){
                synonymNames.add(name.getName());
            }
        }
        return synonymNames;
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

    public String getImageId(){
        return ConceptDatatype.COMPLEX_UUID.equalsIgnoreCase(concept.getDatatype().getUuid())?String.valueOf(obsId):null;
    }
}
