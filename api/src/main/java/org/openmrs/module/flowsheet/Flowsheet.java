package org.openmrs.module.flowsheet;

import java.util.List;

public class Flowsheet {

	private final List<FlowsheetEntry> entries;

	public Flowsheet(List<FlowsheetEntry> obs) {
		this.entries = obs;
	}

	public List<FlowsheetEntry> getEntries() {
		return entries;
	}
}
