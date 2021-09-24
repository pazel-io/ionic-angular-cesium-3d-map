import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('myCesium')
  public myCesium: ElementRef;
  public viewer: any;
  public osmBuildingInit = false;

  constructor() {
  }

  public ngAfterViewInit(): void {
    if (environment.cesiumAccessToken) {
      Cesium.Ion.defaultAccessToken = environment.cesiumAccessToken;
    }
    this.viewer = new Cesium.Viewer(this.myCesium.nativeElement, {
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

  public letsGo() {
    const slow$ = of(this.viewer);
    slow$
      .pipe(
        take(1),
        tap(() => this.viewer.scene.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(-74.019, 40.6912, 750),
          orientation: {
            heading: Cesium.Math.toRadians(20),
            pitch: Cesium.Math.toRadians(-20),
          },
        })),
        delay(2000),
        tap(() => {
          if (!this.osmBuildingInit) {
            this.viewer.scene.primitives.add(Cesium.createOsmBuildings());
          }
        }),
        tap(() => this.osmBuildingInit = true),
      )
      .subscribe();
  }
}
