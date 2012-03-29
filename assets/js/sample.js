// What does the exclamation mark do before the function:
// 		http://stackoverflow.com/questions/3755606/what-does-the-exclamation-mark-do-before-the-function
//
// !function ($) { use $. instead of window.jQuery. }(window.jQuery);
//
!function( $ ){	// $ = window.jQuery (look for comment at the bottom)

	"use strict"

	/* SETUP CLASS DEFINITION
	 * ====================== */

	// Constructor - $(".test2").sample();
	var Sample = function (el) {
		console.log("Constructor was called for class: " + el.className + " with Text: " + el.innerHTML + "...");
		$(el).on('click',this.onClickHandler);
	}

	Sample.prototype = {

	// Global settings for this prototype
	settings: {
	  	  'val1' : 'top',
		  'val2' : 'green'
	}

    , constructor: Sample	// defined above

    , onClickHandler: function ( event ) {
      var $this = $(this) // $this for HTML-Element
      var settings = event.data != null ? event.data /* not a real object - only the eventhandler function*/: $this.data("sample").settings /* real object */
      var val1 = settings.val1;
      var val2 = settings.val2;

      console.log("onClickHandler called for class: " + $this.context.className + ", val2: " + settings.val2 + ", original val2: " + Sample.prototype.settings.val2);

      // helperFunction has to be defined before it can be used
      function helperFunction() { // only usable in myfunc1

      }

      helperFunction()
    }
      // $(".test2").sample("myfunc2");
	, myfunc2: function() {
		var $this = $(this) // $this for HTML-Element
		var settings = $this.data("sample").settings;

		console.log("myfunc2 called for class: " + $this.context.className + ", val2: " + settings.val2 + ", original val2: " + Sample.prototype.settings.val2);
		return this;
	}

  }


 /* SETUP PLUGIN DEFINITION (more infos: http://docs.jquery.com/Plugins/Authoring)
  * ============================================================================= */

  $.fn.sample = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('sample') // instance settings

      // Check if there is already a "sample" object for the specific element.
      if (!data) {
    	  console.log("New objec will be created:");
    	  $this.data('sample', (data = new Sample(this)))
    	  // Overwrite default settings for the new instance of Sample
    	  data.settings = $.extend({},Sample.prototype.settings,option);
      }

      if (typeof option == 'string') {
    	  console.log("Object exists, function: " + option + " will be called for object");
    	  data[option].call($this); // All the memberfunctions are in data so data[option] is looking for the function by its name.
      }
    })
  }

  $.fn.sample.Constructor = Sample	// define Constructor function


 /* SETUP DATA-API
  * ============== */

  // last function called after page was loaded
  $(function () {
	console.log("--- Default handling for elements with .sampletest will be defined...");
    $('body').on('click','.sampletest', Sample.prototype.settings, Sample.prototype.onClickHandler)
  })

}( window.jQuery ); // maps the $ to window.jQuery, avoids conflicts with other libraries.

console.log("- Object definition is done.");

$(".test2").sample({ "val2" : "red"});
$(".test2").sample("myfunc2");
$(".test3").sample("myfunc2");

console.log("-- Settings are made...");
