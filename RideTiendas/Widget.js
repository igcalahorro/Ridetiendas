define(['dojo/_base/declare', 'jimu/BaseWidget', 
"esri/geometry/Point",
"esri/map",
"esri/graphic",
'esri/Color',

"esri/tasks/ServiceAreaTask", 
"esri/tasks/ServiceAreaParameters", 
"esri/tasks/FeatureSet",

"esri/symbols/SimpleMarkerSymbol", 
"esri/symbols/SimpleLineSymbol", 
"esri/symbols/SimpleFillSymbol",

'dojo/_base/lang', 
'dojo/dom'

],
  function(declare, BaseWidget, 
    Point, map, Graphic, Color,

    ServiceAreaTask, ServiceAreaParameters, FeatureSet,

    SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,

    lang, dom
    
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

      // startup: function() {
      //  this.inherited(arguments);
      //  this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      //  console.log('startup');
      // },
      // tiendaService: 'https://formacion.esri.es/server/rest/services/RedPFM/NAServer/Service%20Area',

      symbol: null,

      postCreate: function() {
        this.symbol = new SimpleMarkerSymbol();
        var marker = this.symbol;
        var line = new SimpleLineSymbol();
        line.setColor(new Color([133,133,133,1]));
        marker.setOutline(line);
        marker.setColor(new Color([0,77,168,0.25]));
      },
      

      onOpen: function(){
        console.log('onOpen');
        this.map.on('click', lang.hitch(this,function(event) {
          
            this.map.graphics.clear();

            var point = event.mapPoint;
            console.log(point);
            var graphic = new Graphic(point, this.symbol);

            this.map.graphics.add(graphic);
          
        }));


      },

      // orig: function(){
      //   var inPoint = new Point(evt.mapPoint.x, evt.mapPoint.y, map.spatialReference);


      // },

      funA: function(){
        var inPoint = new Point(evt.mapPoint.x, evt.mapPoint.y, map.spatialReference);



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