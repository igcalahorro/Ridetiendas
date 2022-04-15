define(['dojo/_base/declare', 'jimu/BaseWidget', 
"esri/graphic",
'esri/Color',

"esri/tasks/query",
"esri/tasks/ServiceAreaTask", 
"esri/tasks/ServiceAreaParameters", 
"esri/tasks/FeatureSet",
"esri/layers/FeatureLayer",
"esri/geometry/geometryEngine",

"esri/renderers/SimpleRenderer",
"esri/symbols/SimpleMarkerSymbol", 
"esri/symbols/SimpleLineSymbol", 
"esri/symbols/SimpleFillSymbol",

'dojo/_base/lang', 
'dojo/_base/array'
],
  function(
    declare, BaseWidget, Graphic, Color, Query,
    ServiceAreaTask, ServiceAreaParameters, FeatureSet, FeatureLayer, GeometryEngine,
    SimpleRenderer, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
    lang, arrayUtils
    ) {
    return declare([BaseWidget], {
      baseClass: 'jimu-widget-customwidget',
      tiendaService: new ServiceAreaTask('https://formacion.esri.es/server/rest/services/RedPFM/NAServer/Service%20Area'),
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
          var comercioService = this.comercioService;

          map.graphics.clear();

          var point = event2.mapPoint;
          var graphic = new Graphic(point, symbol);
          
          map.graphics.add(graphic);

          params = new ServiceAreaParameters();
          params.defaultBreaks = [parseFloat(comercios.get('time'))];
          params.travelMode = parseInt(comercios.get('mode'));
          params.outSpatialReference = map.spatialReference;
          params.returnFacilities = false;
          
          var facilities = new FeatureSet();
          facilities.features = [graphic];
          params.facilities = facilities;

          comercioService = this.comercioService;

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
      }
    });
  });