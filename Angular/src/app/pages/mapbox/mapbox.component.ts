import { Component, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";
import * as mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";


@Component({
  selector: "app-mapbox",
  templateUrl: "./mapbox.component.html",
  styleUrls: ["./mapbox.component.scss"]
})
export class MapboxComponent implements OnInit {
  // map: mapboxgl.Map;
  // style = "https://api.maptiler.com/maps/streets/style.json?key=jR6zKjgEwIoG8xGmKQdG";
  // lat = 37.75;
  // lng = -122.41;

  // constructor() {
  //   mapboxgl.accessToken = environment.mapbox.accessToken;
  // }

  // ngOnInit(): void {
  //   this.initializeMap();
  // }

  // private initializeMap() {
  //   /// locate the user
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //       this.map.flyTo({
  //         center: [this.lng, this.lat]
  //       });
  //     });
  //   }

  //   this.buildMap();
  // }

  // buildMap() {
  //   this.map = new mapboxgl.Map({
  //     container: "map",
  //     style: this.style,
  //     zoom: 18,
  //     center: [this.lng, this.lat],
  //     pitch: 45,
  //   });

  //   /// Add map controls
  //   this.map.addControl(new mapboxgl.NavigationControl());

  //   this.map.addControl(
  //     new MapboxDirections({
  //       accessToken: mapboxgl.accessToken
  //     }),
  //     "top-left"
  //   );
  // }

  private map;

  public start = [2.3514616, 48.8566969];
  public canvas;

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      //style: 'mapbox://styles/mapbox/streets-v10',
      style: 'mapbox://styles/mapbox/light-v10',
      //center: [-122.662323, 45.523751], // starting position
      center: [2.3514616, 48.8566969],
      zoom: 15.5,
      pitch: 45,
    });

    // var bounds = [[-123.069003, 45.395273], [-122.303707, 45.612333]];
    // this.map.setMaxBounds(bounds);

    this.canvas = this.map.getCanvasContainer();

    this.map.on('load', this.onLoad.bind(this));

    this.map.on('click', this.onClick.bind(this));
  }

  // create a function to make a directions request
  getRoute(end, map) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    //var start = [-122.662323, 45.523751];
    var start = [2.3514616, 48.8566969];
    var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function () {
      var json = JSON.parse(req.response);
      var data = json.routes[0];
      var route = data.geometry.coordinates;
      var geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
      // if the route already exists on the map, reset it using setData
      if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
      } else { // otherwise, make a new request
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: geojson
              }
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }
      // add turn instructions here at the end
    };
    req.send();
  }

  onLoad() {
    // make an initial directions request that
    // starts and ends at the same location
    this.getRoute(this.start, this.map);

    // Add starting point to the map
    this.map.addLayer({
      id: 'point',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: this.start
            }
          }
          ]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#3887be'
      }
    });
    // this is where the code from the next step will go

    var layers = this.map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
        labelLayerId = layers[i].id;
        break;
      }
    }

    this.map.addLayer(
      {
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      },
      labelLayerId
    );
  }

  onClick(e) {
    var coordsObj = e.lngLat;
    this.canvas.style.cursor = '';
    var coords = Object.keys(coordsObj).map(function (key) {
      return coordsObj[key];
    });
    var end = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: coords
        }
      }
      ]
    };
    if (this.map.getLayer('end')) {
      this.map.getSource('end').setData(end);
    } else {
      this.map.addLayer({
        id: 'end',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: coords
              }
            }]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#f30'
        }
      });
    }
    this.getRoute(coords, this.map);
  }
}
