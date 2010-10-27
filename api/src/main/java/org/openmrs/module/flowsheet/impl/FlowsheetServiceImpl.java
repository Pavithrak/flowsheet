package org.openmrs.module.flowsheet.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.openmrs.module.flowsheet.Flowsheet;
import org.openmrs.module.flowsheet.FlowsheetEntry;

public class FlowsheetServiceImpl implements FlowsheetService {
	private SessionFactory factory;

	@SuppressWarnings("unchecked")
	public Flowsheet getFlowsheet(int patientId) {
		Query query = factory.getCurrentSession().createQuery(
				"select new org.openmrs.module.flowsheet.FlowsheetEntry(obs.obsDatetime) from Obs obs");
		List<FlowsheetEntry> obs = query.list();
		return new Flowsheet(obs);
	}

	public void setFactory(SessionFactory factory) {
		this.factory = factory;
	}
}
