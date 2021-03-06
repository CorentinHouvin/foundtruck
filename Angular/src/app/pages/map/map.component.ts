import { Component, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";
import * as mapboxgl from "mapbox-gl";
//import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import * as $ from "jquery";

import { FoodtruckService } from 'src/app/services/foodtruck.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html"
})
export class MapComponent implements OnInit {

  // Private declarations
  private map;
  private start: Array<number>;
  private canvas;
  private geojson;

  // Public declarations
  public foodtrucks;
  public foodtruckCoord;
  public slugActiveFoodtruck;
  public idActiveFoodtruck;
  public routeActive: Boolean = false;

  constructor(
    private foodtruckService: FoodtruckService,
    private nav: NavbarService
  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.nav.show();
  }

  ngOnInit(): void {

    // Get all foodtrucks
    this.foodtruckService.getFoodtrucks().subscribe(
      (res) => {
        this.foodtrucks = res["foodtrucks"];
        let featuresFromFoodtrucks = [];

        this.foodtrucks.forEach(foodtruck => {
          if (foodtruck.open) {
            let obj;

            obj = {
              type: "Feature",
              properties: {
                _id: foodtruck._id,
                name: foodtruck.name,
                slug: foodtruck.slug,
                iconSize: [60, 60],
                iconUrl: "url(" + foodtruck.logo + ")",
              },
              geometry: {
                type: "Point",
                coordinates: [foodtruck.long, foodtruck.lat],
              }
            }

            featuresFromFoodtrucks.push(obj);
          }
        });

        this.geojson = {
          type: "FeatureCollection",
          features: featuresFromFoodtrucks
        }
      },
      (err) => {}
    );

    // Get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.start = [position.coords.longitude, position.coords.latitude];
        this.map.flyTo({
          center: this.start,
        });
      });
    }

    // Create the map
    this.map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/corentinhouvin/ck8q6o3hq15et1ik7eekmfq2j",
      zoom: 15.5,
    });

    this.canvas = this.map.getCanvasContainer();

    // Bind event on the map
    this.map.on("load", this.onLoad.bind(this));
    //this.map.on("click", this.onClick.bind(this));
  }

  createRoute(foodtruckCoord) {

    this.canvas.style.cursor = "";

    var end = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: foodtruckCoord,
          },
        },
      ],
    };
    if (this.map.getLayer("end")) {
      this.map.getSource("end").setData(end);
    } else {
      this.map.addLayer({
        id: "end",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: foodtruckCoord,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#1aafc9",
        },
      });
    }
    this.getRoute(foodtruckCoord, this.map);

    $('#popup').hide();
    $('#popup-trajet').show();

    this.routeActive = true;
  }

  public cancelRoute = () => {;
    $('#popup-trajet').hide();
    this.routeActive = false;
    // Génère une route sur le point de départ, du coup on ne la voit pas
    this.getRoute(this.start, this.map);
  }

  // create a function to make a directions request
  getRoute(end, map) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    //var start = [-122.662323, 45.523751];
    // var start = [2.3514616, 48.8566969];
    var start = this.start;

    var url =
      "https://api.mapbox.com/directions/v5/mapbox/walking/" +
      start[0] +
      "," +
      start[1] +
      ";" +
      end[0] +
      "," +
      end[1] +
      "?steps=true&geometries=geojson&access_token=" +
      mapboxgl.accessToken;

    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onload = function () {
      var json = JSON.parse(req.response);
      var data = json.routes[0];
      var route = data.geometry.coordinates;

      var geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };
      // if the route already exists on the map, reset it using setData
      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        // otherwise, make a new request
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: geojson,
              },
            },
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#f9b233",
            "line-width": 5,
            "line-opacity": 0.75,
          },
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
      id: "point",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: this.start,
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 10,
        "circle-color": "#1aafc9",
      },
    });

    // add markers to map
    this.geojson.features.forEach((marker) => {
      // create a DOM element for the marker
      let icon = document.createElement("div");
      let end = [marker.geometry.coordinates[0], marker.geometry.coordinates[1]];

      $(icon).addClass("marker");
      $(icon).css({
        "background-image": marker.properties.iconUrl,
        "background-size": "100%",
        width: marker.properties.iconSize[0] + "px",
        height: marker.properties.iconSize[1] + "px",
      });

      $(icon).on("click", () => {

        if (!this.routeActive) {
          console.log('Route = false');
          const promise = this.getInfoRoute(this.start, end);
          promise.then((res) => {

            let infosRoute: any = res;

            if (marker.properties.name == 'Foodtruck #1') {
              $("#popup").addClass("foodtruck1").removeClass("foodtruck2");
            } else if (marker.properties.name == 'Foodtruck #2') {
              $("#popup").addClass("foodtruck2").removeClass("foodtruck1");
            }

            $("#popup h2").text(marker.properties.name);
            $("#popup div.distance span").text(infosRoute.distance);
            $("#popup div.time span").text(infosRoute.duration);

            $("#popup-trajet div.distance span").text(infosRoute.distance);
            $("#popup-trajet div.time span").text(infosRoute.duration);
            $("#popup-trajet div.step span").text(infosRoute.firstStep);

            this.idActiveFoodtruck = marker.properties._id;
            this.slugActiveFoodtruck = marker.properties.slug;

            this.foodtruckCoord = [marker.geometry.coordinates[0], marker.geometry.coordinates[1]];

            $("#mapbox").append($("#popup"));
            $("#popup").show();
          });
        }
      });

      // add marker to map
      new mapboxgl.Marker(icon)
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
    });

  }

  getInfoRoute = (start, end) => {

    var url = "https://api.mapbox.com/directions/v5/mapbox/walking/" + start[0] + "," + start[1] + ";" + end[0] + "," + end[1] + "?steps=true&geometries=geojson&access_token=" + mapboxgl.accessToken;
    var req = new XMLHttpRequest();
    req.open("GET", url, true);

    req.send();

    return new Promise((resolve, reject) => {
      req.onload = () => {
        var json = JSON.parse(req.response);
        var data = json.routes[0];

        let date = new Date(null);
        date.setSeconds(data.duration);
        let dateGoodFormat = date.toISOString().substr(11, 8);

        let distanceMeter = Math.round(data.distance);
        let distance: String;
        if (data.distance >= 1000)
          distance = (distanceMeter / 1000).toFixed(2) + "km";
        else
          distance = distanceMeter + "m";

        let firstStep = data.legs[0].steps[1].maneuver.instruction;

        let infoRoute: Object = {
          'duration': dateGoodFormat,
          'distance': distance,
          'firstStep': firstStep
        }
        resolve(infoRoute);
      }
    });



  }

}
