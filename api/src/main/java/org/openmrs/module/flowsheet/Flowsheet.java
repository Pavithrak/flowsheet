package org.openmrs.module.flowsheet;

import java.util.List;

/**
 * This is the data object which is sent to the client.
 * 
 * 
 */
public class Flowsheet {

	private final List<FlowsheetEntry> entries;

	public Flowsheet(List<FlowsheetEntry> obs) {
		this.entries = obs;
	}

	public List<FlowsheetEntry> getEntries() {
		return entries; 
	}
}
