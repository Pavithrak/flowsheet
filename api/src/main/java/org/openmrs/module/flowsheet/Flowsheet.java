package org.openmrs.module.flowsheet;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openmrs.Obs;

public class Flowsheet {

	private final List<FlowsheetEntry> entries;

	private final Map<Integer, ConceptInfo> conceptMap;

	public Flowsheet(List<Obs> obsList) {
		this.entries = new ArrayList<FlowsheetEntry>();
		this.conceptMap = new HashMap<Integer, ConceptInfo>();
		for (Obs obs : obsList) {
			FlowsheetEntry entry = new FlowsheetEntry(obs);
			if (!conceptMap.containsKey(entry.getConceptId())) {
				conceptMap.put(entry.getConceptId(),
						new ConceptInfo(entry.returnObs()));
			}
			this.entries.add(entry);
		}

	}

	public List<FlowsheetEntry> getEntries() {
		return entries;
	}

	public Map<Integer, ConceptInfo> getConceptMap() {
		return conceptMap;
	}

}
