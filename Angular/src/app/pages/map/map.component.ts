import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import "leaflet-routing-machine";

const iconRetinaUrl = "assets/marker-icon-2x.png";
const iconUrl = "assets/marker-icon.png";
const shadowUrl = "assets/marker-shadow.png";
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  //private map;

  constructor() {}

  ngOnInit(): void {

    // var map = L.map('map').setView([0, 0], 1);
    // L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=jR6zKjgEwIoG8xGmKQdG', {
    //   tileSize: 512,
    //   zoomOffset: -1,
    //   minZoom: 1,
    //   attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    //   crossOrigin: true
    // }).addTo(map);
    // this.getPosition().then(pos => {
    //   this.initMap(pos.lng, pos.lat);

    //   const tiles = L.tileLayer(
    //     "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=jR6zKjgEwIoG8xGmKQdG",
    //     {
    //       maxZoom: 19,
    //       attribution:
    //         '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
    //     }
    //   );

      //tiles.addTo(this.map);

      // L.marker([pos.lat, pos.lng]).addTo(this.map);
      // L.marker([49.187320709228516, 2.4595208168029785]).addTo(this.map);

      // L.Routing.control({
      //   waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
      //   routeWhileDragging: true
      // }).addTo(this.map);
    //});
  }

  // private initMap(posLng, posLat): void {
  //   this.map = new L.map("map", {
  //     center: [posLat, posLng],
  //     zoom: 15
  //   });
  // }

  // private getPosition(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(
  //       resp => {
  //         resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
  //       },
  //       err => {
  //         reject(err);
  //       }
  //     );
  //   });
  // }
}
