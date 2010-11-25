package org.openmrs.module.flowsheet;

import java.text.SimpleDateFormat;
import java.util.Locale;

import org.openmrs.Obs;

public class FlowsheetEntry {

    private static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    private Obs obs;

    public FlowsheetEntry(Obs obs) {
        this.obs = obs;
    }


    public String getValue() {
        return obs.getValueAsString(Locale.ENGLISH);
    }

    public String getDate() {
        return format.format(obs.getObsDatetime());
    }

    public Integer getConceptId() {
        return obs.getConcept().getConceptId();
    }

    public Obs returnObs() {
        return obs;
    }

    public String getComment() {
        return obs.getComment() == null ? "" : obs.getComment();
    }
}