import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('myCesium')
  public myCesium: ElementRef;

  constructor() {
  }

  public ngAfterViewInit(): void {
    Cesium.Ion.defaultAccessToken = environment.cesiumAccessToken;
    const viewer = new Cesium.Viewer(this.myCesium.nativeElement, {
      //Use Cesium World Terrain
      terrainProvider: Cesium.createWorldTerrain(),
      //Hide the base layer picker
      baseLayerPicker: false,
      // homeButton: false,
      geocoder: false,
      timeline: false,
      animation: false,
      fullscreenButton: false,
    });
  }

}
