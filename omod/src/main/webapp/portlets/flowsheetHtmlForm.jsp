<%@ include file="/WEB-INF/template/include.jsp" %>

<openmrs:htmlInclude file="/moduleResources/flowsheet/grid.locale-en.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.jqGrid.min.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/date.js"/>
<openmrs:htmlInclude file="/scripts/jquery-ui/js/jquery-ui.custom.min.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/flowsheet.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.multiselect.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/fcbkcomplete_2_75.js"/>


<openmrs:htmlInclude file="/moduleResources/flowsheet/ui.jqgrid.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/fcbkStyles_2_75.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jslider.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/uicustom.css"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.dependClass.js"/>
<openmrs:htmlInclude file="/moduleResources/flowsheet/jquery.slider-min.js"/>
<openmrs:htmlInclude file="/scripts/flot/jquery.flot.js"/>


<input type="hidden" id="patientId" name="patientId" value='<request:parameter name="patientId" />'/>

<table class="table_group">
    <tr>
        <td class="flowsheet_left_panel">
            <table>
                <tr>
                    <td>
                        <div class="slider_title"> Date Range</div>
                        <div class="slider_info"> From : <label id="sliderInfoFrom"></label></div>
                        <div class="slider_info"> To : <label id="sliderInfoTo"></label></div>

                        <div class="layout-slider">
                             <span class="slider">
                            <input id="Slider1" type="slider" name="price"/></span>
                        </div>
                    </td>

                </tr>
                <tr>
                    <td>

                        <div id="classTypeList">
                            <div class="slider_title">Result Types</div>
                        </div>

                    </td>
                </tr>
                <tr align="left">
                    <td>
                        <select id="conceptSelect" name="conceptSelect" > </select>
						
                    </td>
                </tr>
                  <tr align="left">
                    <td>
                         <input type="button" id="search" name="search" value="search" />

                    </td>
                </tr>

            </table>

        </td>
        <td class="flowsheet_grid">
            <table id="flowsheet">
            </table>

        </td>
</table>

<div id="obsInfoDialog" class="">
<div id="obsInfo" class="obsInfoPanel">
    <div id="maximizeIcon" class="maximizeIcon ui-icon ui-icon-arrowthick-2-ne-sw"></div>
    <div id="obsInfoLabel" class="obsInfoLabel"></div>

    <div id="numericObsGraph" class="obsGraph"></div>
    <div id="numericObsGraphLegend" class="obsGraphLegend" ></div>
    <div id="obsInfoGrid" class="obsInfoGrid">
    </div>

</div>
</div>

<script type="text/javascript">
//to be refactored - Balaji/Khaarthiga
var searchList=[];

    function getUniqueEntries(entries) {
        var uniqueEntries = [];
        jQuery.each(entries, function(index, entry) {
            if (jQuery.inArray(entry.name, uniqueEntries) < 0) {
                uniqueEntries.push(entry.name);
            }
        });

        return uniqueEntries;
    }
    jQuery(document).ready(function() {

        var patientIdValue = $j('#patientId').val();
        var jsondata = {
            patientId : patientIdValue
        };
	    var flowsheetObj = new Flowsheet("flowsheet");
        var data = {};
        var classes = new ConceptClass("#classTypeList");
        var obsInfo = new ObsInfo("#obsInfo","#obsInfoGrid","#numericObsGraph",
            "#numericObsGraphLegend","#obsInfoLabel","#maximizeIcon","#obsInfoDialog");

        var filter = function() {
            var from = jQuery('#sliderInfoFrom').text();
            var to = jQuery('#sliderInfoTo').text();
			var list=getSearchEntries();
            var entries = data.filter(new DateObject(from, to), classes.getSelected(),list);
            flowsheetObj.reload(entries);
            searchHandler(getUniqueEntries(entries));
        }

        var dateRange = new DateRange(jQuery("#Slider1"), filter);


        var onClickHandlerForGrid = function(rowid, iCol, cellcontent, e) {
            e.stopPropagation();
            var conceptName = jQuery("#" + rowid).find('td:nth-child(2)').html();
            var searchResult = data.search(conceptName);
            obsInfo.reload(searchResult,rowid);
        }

         jQuery("body").click(function(){
          obsInfo.hide();
           });

        jQuery("#maximizeIcon").click(function(e){
            e.stopPropagation();
            var conceptName = jQuery("#maximizeIcon").attr("concept");
            var searchResult = data.search(conceptName);
            obsInfo.reloadInExpandedMode(searchResult);
        });


        renderflowsheet = function(json) {
            data = new FlowsheetData(json);
            flowsheetObj.render(data.entries, onClickHandlerForGrid);
            classes.render(data.getConceptClasses());
            classes.change(filter);
            dateRange.render(data.getDateRange());
            searchHandler(getUniqueEntries(data.entries));
        };

        $j.ajax({
            url : "flowsheet.json",
            data : jsondata,
            success : renderflowsheet,
            dataType : "json"
        });


		var getSearchEntries= function(){
			var list=[]
       		jQuery(".holder").children('li').each(function(index){
				var text=jQuery(this).text();
				if(text.length>0){
				list.push(text);
				}
			});
			return list
			}




    	 function searchHandler(entries) {
			jQuery("#conceptSelect").fcbkcomplete({
                json_url: entries,
                addontab: true,
                cache: true,
                height: 20,
                filter_selected:true,
                filter_case:false,
                maxshownitems:10,
                cache:false,
                maxitimes:10                           
            });

        }

		 jQuery("#search").click(function(){
			searchList=getSearchEntries();
			filter();

		});

	});
</script>

