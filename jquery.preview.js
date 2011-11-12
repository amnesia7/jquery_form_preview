(function($) {

	$.fn.formPreview = function(settings) {

		var config = { "buttonText" : "Preview" };

		if (settings) $.extend(config, settings);

			return this.each(function() {

				// element-specific code here

				$(this).find(":submit").before("<input type='button' class='preview_button' value='" + config["buttonText"] + "' onclick='$.fn.formPreview.generatePreview(this.form)' />");

			});

		return this;

	};


	$.fn.formPreview.generatePreview = function(form) {
		var formId = form.id;
		var formToPreview = $("#" + formId);

		//declare variables as required
		var previewHtml = "";
		var firstRun = true;
		var fieldLabel = "";
		var fieldId = "";
		var fieldName = "";
		var fieldFieldset = "abc-random-string-abc";
		var fieldLegend = "xyz-random-string-xyz";
		var currentFieldLabel = "";
		var currentFieldName = "";
		var currentFieldset = "";
		var currentFieldLegend = "";
		var fieldValue = "";
		var fieldValueLength = "";
		var strSeparator = "";
		var submitButtonValue = $("#" + formId + " :submit:last").val();


		//surrounding div
		previewHtml = "<div class='preview_div' id='preview_div_" + formId + "'>";

		//output form preview heading
		if ($("#" + formId + "[title]").text().length > 0) {
			previewHtml += "<h2 id='preview_heading'>" + formToPreview.attr("title")  + " preview</h2>";
		} else {
			previewHtml += "<h2 id='preview_heading'>Form preview</h2>";
		}

		//loop through all input fields to be checked
		$("#" + formId + " :input").not(":button, :reset, :submit, .nopreview").each(function(i, field){
			currentFieldName = fieldName;

			fieldId = field.id;
			fieldName = field.name;

			if (currentFieldName != fieldName) {
				//use class="for_fieldname", then actual label tag using id & for attributes, then display N/A
				if ($("#for_" + fieldName).html()) {
					fieldLabel = $("#for_" + fieldName).html();
				}
				else if ($("label[for=" + fieldId + "]").text()) {
					fieldLabel = $("label[for=" + fieldId + "]").html();
				}
				else {
					fieldLabel = "N/A"
				}

				//make it easier to compare
				if (fieldLegend == null) {
					fieldLegend = "";
				}
				if (fieldFieldset == null) {
					fieldFieldset = "";
				}

				//set values for fieldset, legend and label so that comparisons can be made
				currentFieldset = fieldFieldset;
				currentFieldLegend = fieldLegend;
				currentFieldLabel = fieldLabel;

				//find the legend tag if possible
				fieldFieldset = $("#" + fieldId).closest("fieldset");
				fieldLegend = fieldFieldset.find("legend").html();
				fieldFieldset = fieldFieldset.html();

				//make it easier to compare
				if (fieldLegend == null) {
					fieldLegend = "";
				}
				if (fieldFieldset == null) {
					fieldFieldset = "";
				}

				//if change fieldsets then close table and re-open another, display legend as h3 tag if possible
				if (currentFieldset != fieldFieldset) {
					//no table to close on first run
					if (!firstRun) {
						previewHtml += "</table>";
					}
					//only display heading between tables/fieldsets if found
					if (fieldLegend.length > 0) {
						previewHtml += "<h3>" + fieldLegend + "</h3>";
					}
					//start new table of form results
					previewHtml += "<table class='preview_table'>";
					previewHtml += "<tr>";
					previewHtml += "<th class='preview_th_field'>Field</th>";
					previewHtml += "<th class='preview_th_value'>Value</th>";
					previewHtml += "<th class='preview_th_edit'></th>";
					previewHtml += "</tr>";
				}

				previewHtml += "<tr>";
				previewHtml += "<td class='preview_td_field'>" + fieldLabel + "</td>";

				//reset values
				fieldValue = "";
				fieldValueLength = "";
				strSeparator = "";

				// radio buttons and checkboxes
				if ($("#" + fieldId).is("input:radio, input:checkbox"))
				{
					$("input[name='" + fieldName + "']:checked").each(function(){
						if ($(this).attr("title"))
						{
							fieldValue += strSeparator + $(this).attr("title");
						} else {
							fieldValue += strSeparator + $("label[for=" + $(this).attr("id") + "]").text();
						}
						strSeparator = "<br />";
					});
				}
				// selectboxes
				else if ($("#" + fieldId).is("select"))
				{
					$("select[name='" + fieldName + "'] option:selected").each(function(){
						fieldValue += strSeparator + $(this).text();
						strSeparator = "<br />";
					});
				}
				// password fields
				else if ($("#" + fieldId).is("input:password"))
				{
					fieldValueLength = $("#" + fieldId).val().length;
					var i=0;
					for (i=0; i<fieldValueLength; i++)
					{
						fieldValue += "*";
					}
				}
				else
				{
					fieldValue = field.value;
				}

				previewHtml += "<td class='preview_td_value'>" + fieldValue + "</td>";
				previewHtml += "<td class='preview_td_edit'><a href='' onclick='$.fn.formPreview.editField(\"" + formId + "\",\"" + fieldId + "\"); return false;'>Edit</a></td>";
				previewHtml += "</tr>";

			}

			firstRun = false;
		});

		previewHtml += "</table>";

		//buttons as required
		previewHtml += "<input type='button' id='preview_button_cancel' class='preview_button' value='Cancel' onclick='$.fn.formPreview.cancelPreview(\"" + formId + "\");' />";
		previewHtml += "<input type='submit' id='preview_button_submit' class='preview_button' value='" + submitButtonValue + "' onclick='document.getElementById(\"" + formId + "\").submit();' />";
		previewHtml += "</div>";

		//hide the form
		$("#" + formId).hide();

		//output the preview - create a new div or re-use if available (already previewed and cancelled then previewed again)
		if ($("#" + formId + "_preview").length > 0) {
			$("#" + formId + "_preview").html(previewHtml);
			$("#" + formId + "_preview").show();
		} else {
			formToPreview.after("<div id='" + formId + "_preview'>" + previewHtml + "</div>");
		}

		var previewOffset = $("#" + formId + "_preview").offset();

		//scroll to top of page when click preview button
		self.scrollTo(previewOffset.left, previewOffset.top);

	};


	$.fn.formPreview.cancelPreview = function(formId) {
		$("#" + formId + "_preview").hide();
		$("#" + formId).show();

		var formOffset = $("#" + formId).offset();

		//scroll to top of page when click preview button
		self.scrollTo(formOffset.left, formOffset.top);
	};


	$.fn.formPreview.editField = function(formId, fieldId) {
		$("#" + formId).show();
		$("#" + formId + "_preview").hide();

		var formOffset = $("#" + formId).offset();

		//scroll to top of page when click preview button
		self.scrollTo(formOffset.left, formOffset.top);

		try {
			$("#" + fieldId).focus();
		}
		catch(e) {
		}
	};


})(jQuery); 
