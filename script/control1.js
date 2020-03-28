/*

  Name: control.js

  Date: April/May 2014

  Description: Functions of the simple webpage page.

  Version: 1.0

*/

var currentEl = 'home-';

function switchDivs(thisEl) {

  document.getElementById(currentEl+'div').setAttribute("class", "hidediv");

  document.getElementById(currentEl+'li').setAttribute("class", "");

  document.getElementById(thisEl+'div').setAttribute("class", "showdiv");

  document.getElementById(thisEl+'li').setAttribute("class", "active");

  currentEl = thisEl;

};

//-- Mapping functions

Ext.onReady(function() {

  var sm = new OpenLayers.Projection("EPSG:3857");  //Spherical Mercator

  var wgs = new OpenLayers.Projection("EPSG:4326");  //WGS84

 

  // Bounding box oordinates Nepal & The World

  var ctryBbox = new OpenLayers.Bounds(79.261, 25.920, 89.056, 30.696).transform(wgs, sm);

  var worldExtent = new OpenLayers.Bounds(-185, -89, 185, 89).transform(wgs, sm);

 

  // Map definition

  var options = {

    controls:[],    //Removes all default controls from the map

    projection: sm,   //Default map projection to allow overlays on OSM or Google

    units: "m",       //required when using Spherical Mercator

    maxExtent: worldExtent  //required when using Spherical Mercator

  };

  theMap = new OpenLayers.Map(options);

  theMap.addControl(new OpenLayers.Control.MousePosition({numDigits:2}));

  theMap.addControl(new OpenLayers.Control.Navigation());  //Adds zoom & drag functionality to the map

  theMap.addControl(new OpenLayers.Control.Zoom());   //Displays the zoom in & zoom out controls

 

  var osmLayer = new OpenLayers.Layer.OSM();  //OpenStreetMap as the base layer of the map

  theMap.addLayer(osmLayer); 

   var googleLayer = new OpenLayers.Layer.Google("Google Streets");

  theMap.addLayers([googleLayer,osmLayer]);

  theMap.setBaseLayer(osmLayer);

 

 var baseWmsUrl = 'http://owsgip.itc.utwente.nl/cgi-bin/mapserv?MAP=/home/owsfiles/mapfiles/world.map';

  worldLayer = new OpenLayers.Layer.WMS(

    'World Borders', baseWmsUrl,

    {

      layers: 'country_border',

      transparent : true,

      version: '1.3.0'

    },{

      isBaseLayer : false

    }

  );                        

  theMap.addLayer(worldLayer);

  

    ctryLayer = new OpenLayers.Layer.WMS(

    'China', baseWmsUrl + '&map.layer[country_border].class[0].style[0]=COLOR+0+0+255',

    {

      layers: 'country_border',

      transparent : true,

      countryname: 'China',

      version: '1.3.0'

    },{

      isBaseLayer : false

    }

  );                        

   

  beLayer = new OpenLayers.Layer.WMS(

    'India', baseWmsUrl + '&map.layer[country_border].class[0].style[0]=COLOR+50+220+50',

    {

      layers: 'country_border',

      transparent : true,

      countryname: 'India',

      version: '1.3.0'

    },{

      isBaseLayer : false

    }

  ); 

 beLayer1 = new OpenLayers.Layer.WMS(

    'Nepal', baseWmsUrl + '&map.layer[country_border].class[0].style[0]=COLOR+50+220+50',

    {

      layers: 'country_border',

      transparent : true,

      countryname: 'Nepal',

      version: '1.3.0'

    },{

      isBaseLayer : false

    }

  );

theMap.addLayers([ctryLayer,beLayer,beLayer1]);





  //-- Map display panel

  var mapPanel = new GeoExt.MapPanel({

	map: theMap,

    extent: ctryBbox,

    region:'center',

    margins: '5 5 5 0'

  });

 

  //-- Layer switcher

  var treePanel = new Ext.tree.TreePanel({

    title: 'Switcher',

    region:'west',

    margins: '5 0 5 5',

    cmargins: '5 5 5 5',

    width: 175,

    minSize: 100,

    maxSize: 200,

    split: true,

    collapsible: true,

    bodyStyle: 'padding:5px',

    rootVisible: false,

    root: new Ext.tree.AsyncTreeNode({

        expanded: true,

        children: [

          new GeoExt.tree.BaseLayerContainer({ text: 'Base Layers', expanded: true }),

          new GeoExt.tree.OverlayLayerContainer({ expanded: true })

        ]

    })

  });

 

  //-- Panel container

  new Ext.Panel({

    renderTo: "viewer-panel",

    height: 500,

    width: 760,

    layout: 'border',

    items:[ mapPanel, treePanel ]

  });

 

});



var slideIndex = 1;

showSlides(slideIndex);



function plusSlides(n) {

  showSlides(slideIndex += n);

}



function currentSlide(n) {

  showSlides(slideIndex = n);

}



function showSlides(n) {

  var i;

  var slides = document.getElementsByClassName("mySlides");

  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {slideIndex = 1}    

  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {

      slides[i].style.display = "none";  

  }

  for (i = 0; i < dots.length; i++) {

      dots[i].className = dots[i].className.replace(" active", "");

  }

  slides[slideIndex-1].style.display = "block";  

  dots[slideIndex-1].className += " active";

}