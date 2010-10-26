package org.openmrs.module.flowsheet.web.dwr.data;

import java.util.ArrayList;
import java.util.List;

/**
 * This is the data object which is sent to the client.
 * 
 *
 */
public class Flowsheet {


	private List<Encounter> encounters = new ArrayList<Encounter>();
	public Flowsheet(List<Encounter> encounters) {
		this.setEncounters(encounters);
	}
	public void setEncounters(List<Encounter> encounters) {
		this.encounters = encounters;
	}
	public List<Encounter> getEncounters() {
		return encounters;
	}
	
	
}
