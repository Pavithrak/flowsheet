package org.openmrs.module.flowsheet.web.dwr.data;

import java.util.ArrayList;
import java.util.List;

/**
 * Lightweight bean - containing required data for flowsheet client. 
 *
 */

// As of now placed Dummy implementations  - WIP
public class Encounter {

	private List<Observation> observations = new ArrayList<Observation>();
	public Encounter(org.openmrs.Encounter encounter) {
		Observation obs = new Observation();
		obs.setName("My first observation");
		getObservations().add(obs);
	}
	public void setObservations(List<Observation> observations) {
		this.observations = observations;
	}
	public List<Observation> getObservations() {
		return observations;
	}
}
