#jQuery Form Preview plugin

##Introduction

The jQuery Form Preview plugin allows web developers to easily add preview functionality to any HTML form that follows W3C standards so that users can check their response before submitting the form.

###Basic

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"></script>
	<script type="text/javascript" src="jquery.preview.js"></script>
	<script type="text/javascript">
	    $(function(){
		$("#test_form").formPreview();
	    });
	</script>

###Advanced

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"></script>
	<script type="text/javascript" src="jquery.preview.js"></script>
	<script type="text/javascript">
	    $(function(){
		$("#test_form, #test_form_2").formPreview({ "buttonText" : "Preview this form" });
	    });
	</script>

##Getting Started

* Download the jquery plugin js file to your website
* Add a script link to the .js file (after calling jquery itself)
* Each input must have name and id attributes
* Each input tag must be associated with a label using the id attribute of the input and the for attribute of the label tag. The input tag cannot be inside the label element, they must be separate
* The preview output for a radio button/checkbox will first look for an associated label tag, then a title tag on the radio button/checkbox and failing these it will resort to displaying the field value
* The table row heading for a collection of radio buttons or checkboxes requires an html tag with an id of 'for_' + field name, eg `<p id="for_display_method">Display options</p>`

* The following WILL appear in the form preview 
** Hidden fields with a class of 'preview' (these will have a row heading of 'N/A')
** Password fields
** Checkboxes
** Radio buttons
** Textareas
** Select one dropdowns
** Select multiple dropdowns
** File uploads

* The following WILL NOT appear in the form preview:
** Input fields with a class of 'nopreview'
** Hidden fields that don't have a 'preview' class
** Standard buttons, reset buttons and submit buttons

* When the user clicks preview it hides the form and displays the form field entries in table format
* The table is wrapped in two div elements. The outer one has an id of `'form_preview'`. The inner div element has an id of `'preview_div_' + form id` and a class of `'preview_form'`
* Inside the inner div there is an h2 (`'Form Preview'`) with an id of `'preview_heading'`
* If there form is separated into fieldsets then the preview shows each fieldset as a separate html table
* If the fieldset has a legend tag then this text will be used for a h3 tag with a class `'preview_fieldset_heading'`
* The table has a class of `'preview_table'`
* All rows have a class of `'preview_tr'`
* All rows have an id of `'preview_tr_' + field name`
* All table headers (th tags) have a class of `'preview_th'`
* All table headers (th tags) have an id of `'preview_th_' + field name`
* All table cells (td tags) containing field values have a class of `'preview_value'`
* All table cells (td tags) containing field values have an id of `'preview_value_' + field name`
* All table cells (td tags) containing field edit buttons have a class of `'preview_edit'`
* All table cells (td tags) containing field edit buttons have an id of `'preview_edit_' + field name`
* All edit buttons have a class of `'preview_button_edit'`
* The cancel button on the preview has a class of `'preview_cancel'`
* The submit button on the preview has a class of `'preview_submit'`

##Requirements

* jQuery 1.4+

##Compatibility

* IE
* Firefox
* Opera
* Chrome
* Safari
* Konqueror

##Options

* buttonText : Default label for the Preview button is 'Preview' but buttonText allows the web developer to override this

##Example of the HTML table structure used for the preview

	<div id="form_preview">
	  <div id="preview_div_test_form" class="preview_div">
	    <h2 id="preview_heading">Form Preview</h2>
	    <h3 class="preview_fieldset_heading">First fieldset</h3>
	    <table class="preview_table" summary="Form preview">
	      <tbody>
		<tr id="preview_tr_email" class="preview_tr">
		  <th id="preview_th_email" scope="row" class="preview_th">Email address</th>
		  <td id="preview_value_email" class="preview_value"/>
		  <td id="preview_edit_email" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("email", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_password" class="preview_tr">
		  <th id="preview_th_password" scope="row" class="preview_th">Choose Password</th>
		  <td id="preview_value_password" class="preview_value"/>
		  <td id="preview_edit_password" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("password", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_password_retype" class="preview_tr">
		  <th id="preview_th_password_retype" scope="row" class="preview_th">Re-enter password</th>
		  <td id="preview_value_password_retype" class="preview_value"/>
		  <td id="preview_edit_password_retype" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("password_retype", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_first_name" class="preview_tr">
		  <th id="preview_th_first_name" scope="row" class="preview_th">First Name</th>
		  <td id="preview_value_first_name" class="preview_value"/>
		  <td id="preview_edit_first_name" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("first_name", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_last_name" class="preview_tr">
		  <th id="preview_th_last_name" scope="row" class="preview_th">Last Name</th>
		  <td id="preview_value_last_name" class="preview_value"/>
		  <td id="preview_edit_last_name" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("last_name", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
	      </tbody>
	    </table>
	    <h3 class="preview_fieldset_heading">Second fieldset</h3>
	    <table class="preview_table" summary="Form preview">
	      <tbody>
		<tr id="preview_tr_dob" class="preview_tr">
		  <th id="preview_th_dob" scope="row" class="preview_th">Date of Birth</th>
		  <td id="preview_value_dob" class="preview_value"/>
		  <td id="preview_edit_dob" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("dob", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_phone_num" class="preview_tr">
		  <th id="preview_th_phone_num" scope="row" class="preview_th">Phone number</th>
		  <td id="preview_value_phone_num" class="preview_value"/>
		  <td id="preview_edit_phone_num" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("phone_num", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_skills_interests" class="preview_tr">
		  <th id="preview_th_skills_interests" scope="row" class="preview_th">Skills and interests</th>
		  <td id="preview_value_skills_interests" class="preview_value"/>
		  <td id="preview_edit_skills_interests" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("skills_interests", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_username" class="preview_tr">
		  <th id="preview_th_username" scope="row" class="preview_th">Screen Name</th>
		  <td id="preview_value_username" class="preview_value"/>
		  <td id="preview_edit_username" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("username", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_new_image" class="preview_tr">
		  <th id="preview_th_new_image" scope="row" class="preview_th">Upload Picture</th>
		  <td id="preview_value_new_image" class="preview_value"/>
		  <td id="preview_edit_new_image" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("new_image", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_hidden_field" class="preview_tr">
		  <th id="preview_th_hidden_field" scope="row" class="preview_th">Hidden field</th>
		  <td id="preview_value_hidden_field" class="preview_value">hidden value here</td>
		  <td id="preview_edit_hidden_field" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("hidden_field", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_display_method" class="preview_tr">
		  <th id="preview_th_display_method" scope="row" class="preview_th">Display options</th>
		  <td id="preview_value_display_method" class="preview_value"/>
		  <td id="preview_edit_display_method" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("display_photo", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
		<tr id="preview_tr_checkbox_field" class="preview_tr">
		  <th id="preview_th_checkbox_field" scope="row" class="preview_th">Checkbox field options</th>
		  <td id="preview_value_checkbox_field" class="preview_value"/>
		  <td id="preview_edit_checkbox_field" class="preview_edit">
		    <input type="button" value="Edit" onclick='editPreviewField("checkbox_field_2", "test_form")' class="preview_button_edit"/>
		  </td>
		</tr>
	      </tbody>
	    </table>
	    <input type="button" value="Cancel" onclick='cancelPreviewForm("test_form");' class="preview_cancel"/>
	    <input type="button" value="Submit" onclick='return document.getElementById("test_form").submit();' class="preview_submit"/>
	  </div>
	</div>

