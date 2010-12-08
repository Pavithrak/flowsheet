package org.openmrs.module.flowsheet.impl;

import java.util.List;

import org.openmrs.Obs;
import org.openmrs.Person;
import org.openmrs.api.context.Context;
import org.openmrs.module.flowsheet.Flowsheet;

public class FlowsheetServiceImpl implements FlowsheetService {

	public Flowsheet getFlowsheet(int personId) {

		List<Obs> obsList = Context.getObsService().getObservationsByPerson(new Person(personId));
        return new Flowsheet(obsList);
	}
}
