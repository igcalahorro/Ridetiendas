define(['dojo/_base/declare', 'jimu/BaseWidget', 
"esri/geometry/Point",
"esri/map",
"esri/graphic",
'esri/Color',

"esri/tasks/Geoprocessor",
"esri/tasks/QueryTask",
"esri/tasks/query",
"esri/tasks/ServiceAreaTask", 
"esri/tasks/ServiceAreaParameters", 
"esri/tasks/FeatureSet",

"esri/symbols/SimpleMarkerSymbol", 
"esri/symbols/SimpleLineSymbol", 
"esri/symbols/SimpleFillSymbol",

'dojo/_base/lang', 
'dojo/dom',
'dojo/_base/array'

],
  function(declare, BaseWidget, 
    Point, map, Graphic, Color,
    Geoprocessor, QueryTask, Query,
    ServiceAreaTask, ServiceAreaParameters, FeatureSet,

    SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,

    lang, dom, arrayUtils
    
    ) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',



      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      // postCreate: function() {
      //   this.inherited(arguments);
      //   console.log('postCreate');
      // },

      startup: function() {
      //  this.inherited(arguments);
      //  this.mapIdNode.innerHTML = 'map id:' + this.map.id;
       console.log('startup')

       // Layer 1 ID: 27a321323759441e9cda2303f91ffcc7
       // Layer 2 ID: 0693585169a6416ab7850af1ac0bf2e9
      //  console.log(this.map);
      //  console.log("This is it: " + this.map.getLayer('Comercios'));
      //  layer = this.map.getLayer("0693585169a6416ab7850af1ac0bf2e9");

      //  console.log(this.map.getLayer('0693585169a6416ab7850af1ac0bf2e9'));

      },

      // Send x, y, time and type of bike to `tiendaService`
      tiendaService: new ServiceAreaTask('https://formacion.esri.es/server/rest/services/RedPFM/NAServer/Service%20Area'),
      // tiendaService: new ServiceAreaTask("https://sampleserver6.arcgisonline.com/arcgis/rest/services/NetworkAnalysis/SanDiego/NAServer/ServiceArea"),
      comercioService: new ServiceAreaTask('https://services5.arcgis.com/zZdalPw2d0tQx8G1/ArcGIS/rest/services/Comercios_Widget_WFL1/FeatureServer/24'),

      symbol: null,

      comercios: new Map(),

      postCreate: function() {
        this.symbol = new SimpleMarkerSymbol();
        var marker = this.symbol;
        var line = new SimpleLineSymbol();
        line.setColor(new Color([38, 115, 0, 1]));
        marker.setSize(25);
        marker.setOutline(line);
        marker.setColor(new Color([56, 168, 0, 0.88]));
        marker.setPath("M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z");
        marker.setStyle(SimpleMarkerSymbol.STYLE_PATH);
      },
      

      onOpen: function(event1){
        console.log('onOpen');

        this.map.on('click', lang.hitch(this, function(event2) {
          var map = this.map;
          var symbol = this.symbol;
          var comercios = this.comercios;

          console.log(comercios);

          map.graphics.clear();

          var point = event2.mapPoint;
          
          var graphic = new Graphic(point, symbol);
          // graphic.attributes = {
          //   Attr_Drivetime: 5.0
          // }

          console.log(this.map.graphics);
          map.graphics.add(graphic);
          console.log(this.map.graphics);

          params = new ServiceAreaParameters();
          console.log(parseFloat(comercios.get('time')));
          params.defaultBreaks = [parseFloat(comercios.get('time'))];
          params.outSpatialReference = map.spatialReference;
          params.returnFacilities = false;
          // params.travelMode = 1;
          
          var facilities = new FeatureSet();
          facilities.features = [graphic];
          params.facilities = facilities;

          // console.log(params);
          
          this.tiendaService.solve(params, function(solveResult){
            var polygonSymbol = new SimpleFillSymbol(
              "solid",
              new SimpleLineSymbol("solid", new Color([232,104,80]), 2),
              new Color([232,104,80,0.25])
            );

            arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
              serviceArea.setSymbol(polygonSymbol);
              map.graphics.add(serviceArea);
            });
  
          }, function(err){
            console.log(err.message);
          });
        }));
      },


      paramsHandler: function(evt){
        // Check what comercios are checked
        comercios = new Map();
        
        [...evt.srcElement.form.elements].forEach(element => {
          if (element.nodeName === 'INPUT') {
            comercios.set(element.value, element.checked);
          } else if (element.nodeName === 'SELECT') {
            comercios.set(element.name, element.value);
          }
        });
        
        this.comercios = comercios;
      },



      onClose: function(){
        console.log('onClose');
      },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });