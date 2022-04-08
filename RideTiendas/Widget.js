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

      startup: function() {
      //  this.inherited(arguments);
      //  this.mapIdNode.innerHTML = 'map id:' + this.map.id;
       console.log('startup')
       layer = this.map.getLayer("Comercios");

      },
      tiendaService: 'https://formacion.esri.es/server/rest/services/RedPFM/NAServer/Service%20Area',

      symbol: null,

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