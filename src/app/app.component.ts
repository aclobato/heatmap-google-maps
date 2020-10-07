/// <reference types="@types/googlemaps" />

import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  drawingManager: google.maps.drawing.DrawingManager;
  heatmap1: google.maps.visualization.HeatmapLayer;
  heatmap2: google.maps.visualization.HeatmapLayer;

  latitude: any;
  longitude: any;

  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

  isHidden = false;

  ngOnInit() {

  }

  ngAfterViewInit() {
    let mapProp = {
      center: new google.maps.LatLng(-19.9401751,-43.9341315),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.CIRCLE, google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.RECTANGLE]
      },
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1
      },
      polygonOptions: {
        editable: true,
        clickable: true,
        draggable: true,
      }
    });

    this.drawingManager.setMap(this.map);

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function(event) {
      if (event.type == 'polygon') {
        console.log(event.overlay.getPath().getArray().toString());
        alert(google.maps.geometry.spherical.computeArea(event.overlay.getPath()));
      } else if (event.type == 'polyline') {
        console.log(event.overlay.getPath().getArray().toString());
        alert(google.maps.geometry.spherical.computeLength(event.overlay.getPath()));
      }
    });

    this.addHeatMap1();
    this.addHeatMap2();
  }


  addHeatMap1() {
    const heatmapData = [
      new google.maps.LatLng(-19.938016, -43.935500),
      new google.maps.LatLng(-19.940114, -43.933987),
      new google.maps.LatLng(-19.938631, -43.933611),
      new google.maps.LatLng(-19.933674, -43.937093),
      new google.maps.LatLng(-19.929886, -43.932069),
      new google.maps.LatLng(-19.930370, -43.929966),
      new google.maps.LatLng(-19.931389, -43.932466),
      new google.maps.LatLng(-19.917349, -43.939397),
      new google.maps.LatLng(-19.918358, -43.938743)

    ];

    const gradient = [
      "rgba(0, 0, 255, 0)",
      "rgba(0, 0, 255, 1)",
      "rgba(0, 0, 223, 1)",
      "rgba(0, 0, 191, 1)",
      "rgba(0, 0, 159, 1)",
      "rgba(0, 0, 127, 1)",
      "rgba(32, 0, 127, 1)",
      "rgba(63, 0, 127, 1)",
      "rgba(127, 0, 127, 1)",
      "rgba(127, 0, 91, 1)",
      "rgba(63, 0, 91, 1)",
      "rgba(127, 0, 63, 1)",
      "rgba(191, 0, 31, 1)",
      "rgba(255, 0, 0, 1)",
    ];


    this.heatmap1 = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      gradient: gradient,
      radius: 20,
      map: this.map
    });
  }

  addHeatMap2() {
    const heatmapData = [
      new google.maps.LatLng(-19.930557, -43.941798),
      new google.maps.LatLng(-19.929790, -43.943450),
      new google.maps.LatLng(-19.928257, -43.946722),
      new google.maps.LatLng(-19.927833, -43.945971),
      new google.maps.LatLng(-19.938016, -43.935500),
      new google.maps.LatLng(-19.940114, -43.933987),
      new google.maps.LatLng(-19.938631, -43.933611),
      new google.maps.LatLng(-19.933674, -43.937093),
      new google.maps.LatLng(-19.918474, -43.939296),
      new google.maps.LatLng(-19.917420, -43.939913)

    ];

      const gradient = [
        "rgba(255, 255, 0, 0)",
        "rgba(255, 255, 0, 1)",
        "rgba(255, 233, 0, 1)",
        "rgba(255, 213, 0, 1)",
        "rgba(255, 191, 0, 1)",
        "rgba(255, 169, 0, 1)",
        "rgba(255, 137, 0, 1)",
        "rgba(255, 101, 0, 1)",
        "rgba(255, 73, 0, 1)",
        "rgba(255, 41, 0, 1)",
        "rgba(255, 21, 0, 1)",
        "rgba(255, 0, 0, 1)",
      ];

      this.heatmap2 = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      gradient: gradient,
      radius: 20,
      map: this.map
    });
  }


  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId);
  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Got you!'
    });

    marker.addListener('click', this.simpleMarkerHandler);

    marker.addListener('click', () => {
      this.markerHandler(marker);
    });
  }

  simpleMarkerHandler() {
    alert('Simple Component\'s function...');
  }

  markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }

  setPolygonMode() {
    this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  }

  hideGroupA() {
    this.heatmap1.setMap(null);
  }

  hideGroupB() {
    this.heatmap2.setMap(null);
  }

  showGroupA() {
    this.heatmap1.setMap(this.map);
  }

  showGroupB() {
    this.heatmap2.setMap(this.map);
  }
}
