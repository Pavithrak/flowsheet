package org.openmrs.module.flowsheet.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.openmrs.Obs;
import org.openmrs.Person;
import org.openmrs.api.context.Context;
import org.openmrs.module.flowsheet.Flowsheet;
import org.openmrs.module.flowsheet.FlowsheetEntry;

public class FlowsheetServiceImpl implements FlowsheetService {

	@SuppressWarnings("unchecked")
	public Flowsheet getFlowsheet(int personId) {

		List<Obs> obsList = Context.getObsService().getObservationsByPerson(new Person(personId));
        List<FlowsheetEntry> flowsheetEntries = new ArrayList<FlowsheetEntry>();
        for (Obs obs : obsList){
            flowsheetEntries.add(new FlowsheetEntry(obs));
        }
        return new Flowsheet(flowsheetEntries);
	}
}
