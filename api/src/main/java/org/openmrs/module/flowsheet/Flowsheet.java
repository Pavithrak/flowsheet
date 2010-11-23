package org.openmrs.module.flowsheet;

import java.util.HashMap;
import java.util.List;

public class Flowsheet {

	private final List<FlowsheetEntry> entries;

    private final HashMap<String,ConceptInfo> conceptMap;

	public Flowsheet(List<FlowsheetEntry> obs) {
		this.entries = obs;
        this.conceptMap = computeConceptMap(obs);
	}

	public List<FlowsheetEntry> getEntries() {
		return entries;
	}

    public HashMap<String, ConceptInfo> getConceptMap(){
        return conceptMap;
    }

    private HashMap<String,ConceptInfo> computeConceptMap(List<FlowsheetEntry> obs){
       HashMap<String,ConceptInfo> conceptMap = new HashMap<String,ConceptInfo>();
       for(FlowsheetEntry entry : obs){
           String desc = entry.getConceptDesc();
           conceptMap.put(entry.getName(),new ConceptInfo(desc));
       }
       return conceptMap;
    }
}
