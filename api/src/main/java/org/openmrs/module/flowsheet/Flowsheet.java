package org.openmrs.module.flowsheet;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Flowsheet {

	private final List<FlowsheetEntry> entries;

    private final Map<Integer,ConceptInfo> conceptMap;

	public Flowsheet(List<FlowsheetEntry> flowsheetEntries) {
		this.entries = flowsheetEntries;
        this.conceptMap = computeConceptMap(flowsheetEntries);
	}

	public List<FlowsheetEntry> getEntries() {
		return entries;
	}

    public Map<Integer, ConceptInfo> getConceptMap(){
        return conceptMap;
    }

    private Map<Integer,ConceptInfo> computeConceptMap(List<FlowsheetEntry> flowsheetEntries){

       Map<Integer, ConceptInfo> conceptMap = new HashMap<Integer, ConceptInfo>();

       for(FlowsheetEntry entry : flowsheetEntries){
           if(!conceptMap.containsKey(entry.getConceptId())){
               conceptMap.put(entry.getConceptId(),new ConceptInfo(entry.returnObs()));
           }
       }
       return conceptMap;
    }
}
