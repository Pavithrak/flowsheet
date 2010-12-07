package org.openmrs.module.flowsheet.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.openmrs.Obs;
import org.openmrs.Person;
import org.openmrs.api.context.Context;
import org.openmrs.module.flowsheet.Flowsheet;
import org.openmrs.module.flowsheet.FlowsheetEntry;

public class FlowsheetServiceImpl implements FlowsheetService {
    private SessionFactory factory;
    private static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

	@SuppressWarnings("unchecked")
	public Flowsheet getFlowsheet(int personId) {

		List<Obs> obsList = Context.getObsService().getObservationsByPerson(new Person(personId));
        List<FlowsheetEntry> flowsheetEntries = new ArrayList<FlowsheetEntry>();
        for (Obs obs : obsList){
            flowsheetEntries.add(new FlowsheetEntry(obs));
        }
        return new Flowsheet(flowsheetEntries);
	}

    public Flowsheet getFlowsheetSnapshot(int personId) {
/*
        Query query = factory
				.getCurrentSession()
				.createSQLQuery(
						"select distinct(c1.name) from concept_class c1, concept c " +
                        "where c.class_id = c1.concept_class_id and c.concept_id in " +
                            "(select distinct concept_id from obs where person_id="+personId+" and voided=0 )");
*/

        Query query = factory
				.getCurrentSession()
				.createQuery(
/*
                        "select distinct c1.name from ConceptClass c1, Concept c " +
                        "where c.classId = c1.conceptClassId and c.conceptId in " +
                        "( select distinct o1.conceptId from Obs o1 where o1.personId = :id and o1.voided = 0)");
*/
                        "select distinct c.conceptClass.name from Concept c " +
                        "where c.conceptId in " +
                        "( select distinct o1.concept.conceptId from Obs o1 where o1.personId = :id and o1.voided = 0)");
        query.setInteger("id",personId);
		List<String> conceptClasses = query.list();
        query = factory
				.getCurrentSession()
				.createQuery(
						"select distinct o.obsDatetime from Obs o " +
                                "where o.personId = :id and o.voided = 0 ");//order by obsDate desc
        query.setInteger("id",personId);
		List<Date> obsDates = query.list();
        String firstFewDates = "''";
        if(obsDates.size() >0){
            firstFewDates = "'"+format.format(obsDates.get(0))+"'";
        }
        if(obsDates.size() >1){
            firstFewDates = firstFewDates + ",'"+format.format(obsDates.get(0))+"'";
        }
        query = factory
				.getCurrentSession()
				.createQuery(
						"select o1 from Obs o1 where o1.personId = :id and o1.voided = 0 " +
                        "and o1.obsDatetime in ("+firstFewDates+")");
        query.setInteger("id",personId);

        List<Obs> obsList = query.list();
        List<FlowsheetEntry> flowsheetEntries = new ArrayList<FlowsheetEntry>();
        for (Obs obs : obsList){
            flowsheetEntries.add(new FlowsheetEntry(obs));
        }
//        List<FlowsheetEntry> flowsheetEntries = new ArrayList<FlowsheetEntry>();
//        List<Date> obsDates = new ArrayList<Date>();
        return new Flowsheet(flowsheetEntries,conceptClasses,obsDates);
    }

    public void setFactory(SessionFactory factory) {
            this.factory = factory;
    }
}
