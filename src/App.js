import './App.css';
/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_data_countries2 from "@amcharts/amcharts4-geodata/data/countries2";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useState } from 'react';
import React from "react";
import axios from 'axios';
import am4geodata_indiaLow2020 from '@amcharts/amcharts4-geodata/india2020Low';
import am4geodata_usaLow from '@amcharts/amcharts4-geodata/usaLow';
  

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
//chart.geodata = am4geodata_indiaLow2020;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Set Map Definition 
polygonSeries.geodata = am4geodata_indiaLow2020;

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name} : {value}";

// Color the Map Based on the Conditon
/*
polygonTemplate.polygon.adapter.add("fill",function(fill,target){
  if(target.dataItem){
    if(target.dataItem.value >= 30){
      return am4core.color("green")
    }
    else if(target.dataItem.value >= 20 && target.dataItem.value <= 30 ){
      return am4core.color("yellow")
    }
    else{
      return am4core.color("red")
    }
  }
})
*/

polygonSeries.heatRules.push({
  property: "fill",
  target: polygonSeries.mapPolygons.template,
  min: chart.colors.getIndex(1).brighten(1),
  max: chart.colors.getIndex(1).brighten(-0.3)
});


// Set up heat legend
var heatLegend = chart.createChild(am4maps.HeatLegend);
heatLegend.id = "heatLegend";
heatLegend.series = polygonSeries;
heatLegend.align = "left";
heatLegend.valign = "top";
heatLegend.orientation = "vertical";
heatLegend.width = am4core.percent(35);
heatLegend.marginRight = am4core.percent(4);
heatLegend.background.fill = am4core.color("#000");
heatLegend.background.fillOpacity = 0.05;
heatLegend.padding(5, 5, 5, 5);


polygonSeries.mapPolygons.template.events.on("over", events => {
  handleOver(events.target);
});


function handleOver(mapPolygon){
  if(!isNaN(mapPolygon.dataItem.value)){
    heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
  }
  else{
    heatLegend.valueAxis.hideTooltip();
  }
}



// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");

// Remove Antarctica
//polygonSeries.exclude = ["IN-UP", "IN-TN"];

// Add heat rule
/*
polygonSeries.heatRules.push({
  "property": "fill",
  "dataField" : "value",
  "target": polygonSeries.mapPolygons.template,
  "min" : am4core.color("#FFFFFF"),
  "max" : am4core.color("AAAA00")
  }

);
*/


/*
polygonSeries.data =
[ { id: "US-AL", value: 4447100 },
{ id: "US-AK", value: 626932 },
{ id: "US-AZ", value: 5130632 },
{ id: "US-AR", value: 2673400 },
{ id: "US-CA", value: 33871648 },
{ id: "US-CO", value: 4301261 },
{ id: "US-CT", value: 3405565 },
{ id: "US-DE", value: 783600 },
{ id: "US-FL", value: 15982378 },
{ id: "US-GA", value: 8186453 },
{ id: "US-HI", value: 1211537 },
{ id: "US-ID", value: 1293953 },
{ id: "US-IL", value: 12419293 },
{ id: "US-IN", value: 6080485 },
{ id: "US-IA", value: 2926324 },
{ id: "US-KS", value: 2688418 },
{ id: "US-KY", value: 4041769 },
{ id: "US-LA", value: 4468976 },
{ id: "US-ME", value: 1274923 },
{ id: "US-MD", value: 5296486 },
{ id: "US-MA", value: 6349097 },
{ id: "US-MI", value: 9938444 },
{ id: "US-MN", value: 4919479 },
{ id: "US-MS", value: 2844658 },
{ id: "US-MO", value: 5595211 },
{ id: "US-MT", value: 902195 },
{ id: "US-NE", value: 1711263 },
{ id: "US-NV", value: 1998257 },
{ id: "US-NH", value: 1235786 },
{ id: "US-NJ", value: 8414350 },
{ id: "US-NM", value: 1819046 },
{ id: "US-NY", value: 18976457 },
{ id: "US-NC", value: 8049313 },
{ id: "US-ND", value: 642200 },
{ id: "US-OH", value: 11353140 },
{ id: "US-OK", value: 3450654 },
{ id: "US-OR", value: 3421399 },
{ id: "US-PA", value: 12281054 },
{ id: "US-RI", value: 1048319 },
{ id: "US-SC", value: 4012012 },
{ id: "US-SD", value: 754844 },
{ id: "US-TN", value: 5689283 },
{ id: "US-TX", value: 20851820 },
{ id: "US-UT", value: 2233169 },
{ id: "US-VT", value: 608827 },
{ id: "US-VA", value: 7078515 },
{ id: "US-WA", value: 5894121 },
{ id: "US-WV", value: 1808344 },
{ id: "US-WI", value: 5363675 },
{ id: "US-WY", value: 493782 }]
*/


/* JSON file of India'State*/

polygonSeries.data = [
  
    {
      "state" : "Jammu and Kashmir",
      "id" : "IN-JK",
      "value" : 5 
    },
  
    {
      "state" : "Ladakh",
      "id" : "IN-LK",
      "value" : 1
    },

    {
      "state" : "Himachal Pradesh",
      "id" : "IN-HP",
      "value" : 4
    },
    
    {
      "state" : "Uttrakhand",
      "id" : "IN-UT",
      "value" : 5
    },
    
    {
      "state" : "Punjab",
      "id" : "IN-PB",
      "value" : 13
    },
    
    {
      "state" : "Haryana",
      "id" : "IN-HR",
      "value" : 10 
    },
    
    {
      "state" : "Uttar Pradesh",
      "id" : "IN-UP",
      "value" : 80
    },
    {
      "state" : "Delhi",
      "id" : "IN-DL",
      "value" : 7
    },
    
    {
      "state" : "Rajasthan",
      "id" : "IN-RJ",
      "value" : 25
    },
    
    {
      "state" : "Madhya Pradesh",
      "id" : "IN-MP",
      "value" : 29
    },
    {
      "state" : "Bihar",
      "id" : "IN-BR",
      "value" : 40
    },

    {
      "state" : "Jharkhand",
      "id" : "IN-JH",
      "value" : 14
    },
    
    {
      "state" : "Chattisgarh",
      "id" : "IN-CT",
      "value" : 11
    },

    
    {
      "state" : "West Bengal",
      "id" : "IN-WB",
      "value" : 41
    },
    
    {
      "state" : "Odisha",
      "id" : "IN-OR",
      "value" : 21
    },
    
    {
      "state" : "Sikkim",
      "id" : "IN-SK",
      "value" : 1
    },
    
    {
      "state" : "Assam",
      "id" : "IN-AS",
      "value" : 14
    },
    
    {
      "state" : "Arunchal Pradesh",
      "id" : "IN-AR",
      "value" : 2
    },
    
    {
      "state" : "Nagaland",
      "id" : "IN-NL",
      "value" : 1
    },
    {
      "state" : "Manipur",
      "id" : "IN-MN",
      "value" : 2
    },
    {
      "state" : "Mizoram",
      "id" : "IN-MZ",
      "value" : 1
    },
    
    {
      "state" : "Meghalaya",
      "id" : "IN-ML",
      "value" : 2
    },
    
    {
      "state" : "Tripura",
      "id" : "IN-TR",
      "value" : 2
    },
    
    {
      "state" : "Gujarat",
      "id" : "IN-GJ",
      "value" : 26
    },
    
    {
      "state" : "Maharashtra",
      "id" : "IN-MH",
      "value" : 48
    },
    
    {
      "state" : "Karnataka",
      "id" : "IN-KA",
      "value" : 28
    },
    
    {
      "state" : "Goa",
      "id" : "IN-GA",
      "value" : 2
    },
    
    {
      "state" : "Kerala",
      "id" : "IN-KL",
      "value" : 20
    },
    {
      "state" : "Tamil Nadu",
      "id" : "IN-TN",
      "value" : 39
    },
    {
      "state" : "Arunchal Pradesh",
      "id" : "IN-AP",
      "value" : 25
    },
    {
      "state" : "Telangana",
      "id" : "IN-TG",
      "value" : 17
    },

    {
      "state" : "Chandigarh",
      "id" : "IN-CH",
      "value" : 1
    },
    
    {
      "state" : "Andaman and Nicobar Island",
      "id" : "IN-AN",
      "value" : 1
    },
    
    {
      "state" : "Pudducherry",
      "id" : "IN-PY",
      "value" : 1
    },
    
    {
      "state" : "Dadar and Nagar Haveli and Daman and Diu",
      "id" : "IN-DNDD",
      "value" : 1
    }
  ];






 /* 
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    startColor: am5.color(0x8ab7ff),
    endColor: am5.color(0x25529a),
    startText: "Lowest",
    endText: "Highest",
    stepCount: 5
  })
);

heatLegend.startLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("startColor")
});

heatLegend.endLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("endColor")
});

*/




/** Map for the USA **/


/*
var data = [        
  {
      "latitude" : 26.8467	,
      "longitude" :    80.9A462,
      "Name" : "Uttar Pradesh",
      "id"   :	"IN-UP"
      },
      
      {
      "latitude" : 10.850516,
      "longitude" :	76.271080,
      "Name" : "Kerala",
      "Leads" :	4,
      "id" :	"IN-KL"
      },
  
      {
      "latitude" :  19.663280,
      "longitude" :	75.300293,
      "Name" :	"Maharashtra",
      "Leads" :	8,
      "id" : "IN-MH"
      },
  
      {
      "latitude" :  26.244156,
      "longitude" :	92.537842	,
      "Name" : "Assam",
      "Leads" : 	1,
      "id":	"IN-AS"
      },
  
      {
      "latitude" :    15.491997,
      "longitude" :	73.81800065,
      "Name" :	"Goa",
      "Leads" :	4,
      "id" : "IN-GA"
      },
  
      {
      "latitude" :    34.29995933,
      "longitude" :	74.46665849,
      "Name" :	"Jammu And Kashmir",
      "Leads" :	2,
      "id" : "IN-JK"
      },
      {
        "Name" : "Ladakh",
        "Leads" : 45,
        "id" : "IN-LK"
      },
      {
        "Name" : "Haryana",
        "Leads" : 7,
        "id" : "IN-HR"
      },
      {
        "Name": "Arunchal Pradesh",
        "Leads" : 78,
        "id" : "IN-AR"
      },
      { 
          "latitude": 12.57038129,
          "longitude" :	76.91999711,
          "Name" :	"Karnataka",
          "Leads" :	1,
          "id" :	"IN-KA"
      },
  
      {
      "latitude" :  10.56257331,
      "longitude" : 	72.63686717,
      "Name" :	"Lakshadweep",
      "Leads" :	2,
      "id" : 	"IN-LD"
      },
      {
        "Name" :"NagaLand",
        "Leads": 45,
        "id" : "IN-NL"
      },
  
      {
        "Name" : "Tripura",
        "Leads" : 12,
        "id" : "IN-TR"
      },
  
      {
      "latitude" :    21.30039105,
      "longitude" :	76.13001949,
      "Name" :	"Madhya Pradesh",
      "Leads" :	4,
      "id" : 	"IN-MP"
      },
  
      {
      "latitude" :    24.79997072,
      "longitude" :	93.95001705,
      "Name" :	"Manipur",
      "Leads" :	5,
      "id" : 	"IN-MN"
      },
  
      {
      "latitude" :    19.82042971,
      "longitude" :	85.90001746,
      "Name" :	"Orissa",
      "Leads" :	1,
      "id" :	"IN-OR"
       },
  
      {
          
       "latitude" :   11.93499371,
       "longitude" :	79.83000037,
       "Name" :	"Puducherry",
       "Leads" :	3,
       "id" :	"IN-PY"
      }
      ];
*/  


  
  function App(){
    return(
      <div id ="chartdiv">
      </div> 
    )
    }

 export default App;

/* Chart code */
// Themes begin
/**am4core.useTheme(am4themes_dataviz); **/
//am4core.useTheme(am4themes_animated);
// Themes end
 
/** 


let continents = {
  "AF": 0,
  "AN": 1,
  "AS": 2,
  "EU": 3,
  "NA": 4,
  "OC": 5,
  "SA": 6
};

// Create map instance
let chart = am4core.create("chartdiv", am4maps.MapChart);
chart.projection = new am4maps.projections.Miller();

// Create map polygon series for world map
let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
worldSeries.useGeodata = true;
worldSeries.geodata = am4geodata_worldLow;

worldSeries.exclude = ["AQ"];

let worldPolygon = worldSeries.mapPolygons.template;
worldPolygon.tooltipText = "{name}";
worldPolygon.nonScalingStroke = true;
worldPolygon.strokeOpacity = 0.5;
//worldPolygon.fill = am4core.color("#eee");
//worldPolygon.propertyFields.fill = "color";

let hs = worldPolygon.states.create("hover");
hs.properties.fill = chart.colors.getIndex(9);

// Create country specific series (but hide it for now)
let countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
countrySeries.useGeodata = true;
countrySeries.hide();
countrySeries.geodataSource.events.on("done", function(ev) {
  worldSeries.hide();
  countrySeries.show();
});




let countryPolygon = countrySeries.mapPolygons.template;



countryPolygon.tooltipText = "{name}";
countryPolygon.nonScalingStroke = true;
countryPolygon.strokeOpacity = 0.5;
countryPolygon.fill = am4core.color("#eee");

let hs1 = countryPolygon.states.create("hover");
hs1.properties.fill = chart.colors.getIndex(9);

// Set up click events
worldPolygon.events.on("hit", function(ev) {
  ev.target.series.chart.zoomToMapObject(ev.target);
  let map = ev.target.dataItem.dataContext.map;
  if (map) {
    ev.target.isHover = false;
    countrySeries.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/" + map + ".json";
    countrySeries.geodataSource.load();
  }
});

// Set up data for countries

var country_code = ["IN", "US", "ZA"]; 

let data = [];
for(var i = 0 ; i < country_code.length ; i++){
var id = country_code[i];
  if (am4geodata_data_countries2.hasOwnProperty(id)) {
    let country = am4geodata_data_countries2[id];
    if (country.maps.length) {
      data.push({
        id: id,
        color: chart.colors.getIndex(continents[country.continent_code]),
        map: country.maps[0]
      });
    }
  }
}

worldSeries.data = data;

// Zoom control
chart.zoomControl = new am4maps.ZoomControl();

let homeButton = new am4core.Button();
homeButton.events.on("hit", function() {
  worldSeries.show();
  countrySeries.hide();
  chart.goHome();
});

homeButton.icon = new am4core.Sprite();
homeButton.padding(7, 5, 7, 5);
homeButton.width = 30;
homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
homeButton.marginBottom = 10;
homeButton.parent = chart.zoomControl;
homeButton.insertBefore(chart.zoomControl.plusButton);


// Create the Image Series 
let imageSeries = chart.series.push(new am4maps.MapImageSeries());
//  imageSeries.mapImages.template.propertyFields.latitude = "{latitude}";
//  imageSeries.mapImages.template.propertyFields.longitude = "{longitude}";
//  imageSeries.mapImages.template.propertyFields.tooltipText = "{name}";
//  imageSeries.dataFields.value = "lead";
//  imageSeries.name = name ;

// Create the Template for the ImageSeries

imageSeries.data = [
  {
    "name" : "HDFC Bank" ,
    "latitude" : 34.09 ,
    "longitude" : 74.79 ,
    "lead" :  54 
  },
  {
    "name" : "ICICI Bank" ,
    "latitude" : 31.10 ,
    "longitude" : 77.17 ,
    "lead" : 65
  },
  {
    "name" : "Axis Bank" ,
    "latitude" : 30.31 ,
    "longitude" : 78.03 ,
    "lead" : 15
  },
  {
    "name" : "HSBC Bank" ,
    "latitude" : 19.07 ,
    "longitude" : 72.87 ,
    "lead" : 84
  },
  {
    "name" : "SBI Bank" ,
    "latitude" : 13.05 ,
    "longitude" : 80.16 ,
    "lead" : 98
  },
  {
    "name" : "Kotak Mahindra Bank" ,
    "latitude" : 25.37 ,
    "longitude" : 85.09 ,
    "lead" : 45
  },
  {
    "name" : "Indian Bank" ,
    "latitude" : 22.34 ,
    "longitude" : 88.22 ,
    "lead" : 15
  },
  {
    "name" : "CBI Bank" ,
    "latitude" : 21.08 ,
    "longitude" : 79.05 ,
    "lead" : 69
  },
  {
    "name" : "Union Bank of India" ,
    "latitude" : 26.51 ,
    "longitude" : 80.57 ,
    "lead" : 96
  }
];



let template = imageSeries.mapImages.template;
  template.propertyFields.latitude = "latitude";
  template.propertyFields.longitude = "longitude";
  template.tooltipText = "name";




let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
circle.radius = 3;
circle.name = "name";
////   circle.fill = "colors"; 

// Add the Event to the 


 circle.events.on("inited", function(ev){
  animateCircle(ev.target);
  
  });


   function animateCircle(circle){
      let animation = circle.animate([{property : "scale" , from: 1, to: 5 },{property : "opacity" , from : 1 , to: 0}], 1000, am4core.ease.circleInOut);
      animation.events.on("animationended", function(ev){
          animateCircle(ev.target.object);
      });        
   };









/** 

let triangle = imageSeries.mapImages.template.createChild(am4core.Triangle);
   triangle.height = 3;
   triangle.width = 2;
   triangle.fill = am4core.color("yellow");
   triangle.tooltipText = "{"Leads"}";
   triangle.events.on("inited", function(ev){

    animateTriangle(ev.target);

   });

   function animateTriangle(triangle){

    let animation = triangle.animate([{property : "scale", from: 1, to:5}, {property : "opacity", from:1, to:0}], 1000, am4core.ease.circleInOut);

      animation.events.on("animationended", function(ev){
          animateTriangle(ev.target.object);
      });
   }
**/