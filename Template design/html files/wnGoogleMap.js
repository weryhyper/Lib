/**
*   WN Google Map v1.0
*   Copyright (C) 2011 Wery Nguyen
*	nguyennt86@gmail.com
*   Seamless CMS
*   Ref: http://code.google.com/apis/maps/documentation/javascript/overlays.html#OverlaysOverview
*	     http://code.google.com/apis/maps/documentation/javascript/basics.html
*/
(function($){ 
$.fn.wnGoogleMap = function(options) {

	// Set default variables in an array
    var defaults = {
	    address : "",
    };
	
	// Extend default variable array using supplied options, making opional arguments possible
    options = $.extend(defaults, options);
	
	// get the container
    var container = $(this);
	
	// get the address
	var addr = options.address;
	if(addr=="" || addr ==null) {
		addr = container.attr('rel');
	}
	
    // global "map" variable
    var marker = null;
	var geocoder;
	var map;
	var infowindow = new google.maps.InfoWindow({ 
		size: new google.maps.Size(50,50)
	});
	
	function init() {
		// create the map
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(-37.821447, 145.176294);
		var myOptions = {
			zoom: 15,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		map = new google.maps.Map(document.getElementById(container.attr('id')), myOptions);
		
		// close info window on click to the map
		google.maps.event.addListener(map, 'click', function() {
			infowindow.close();
		});
	}
 
	function codeAddress() {
		geocoder.geocode( { 'address': addr}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				marker = new google.maps.Marker({
					map: map, 
					position: results[0].geometry.location
				});
				
				infowindow.setContent("<div style='font-size:10px;'><b>Location</b><br>"+addr+"</div>"); 
				//infowindow.open(map,marker);
				
				// show the info window when marker is clicked.
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
				});
				
			} else {
				// display error or display nothing
			}
		});
	}	

	return this.each(function() {
		init();
		codeAddress();
	});
	
  };
})(jQuery);