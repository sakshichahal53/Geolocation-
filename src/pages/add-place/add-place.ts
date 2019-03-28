import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import { ModalController ,LoadingController, ToastController  } from "ionic-angular";
import { Location } from '../../models/location';
import { Geolocation} from 'ionic-native';
import { SetLocationPage } from '../set-location/set-location';
import { PlacesService } from '../../services/places';
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  
  location: Location = {
    lat: 0,
    lng: 0
  };
  
  locationIsSet=false;

  constructor(private modalCtrl: ModalController, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private placesService : PlacesService){}
  onSubmit(form: NgForm) {
    this.placesService.addPlace(form.value.title,form.value.description,this.location);
    form.reset();
    this.location={
      lat:0,
      lng:0
    };
    this.locationIsSet=false;
  }
  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, { location: this.location});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }
  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    Geolocation.getCurrentPosition()
    .then(
      location => {
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;

      
      
      }
    )
    .catch(
      error => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Could get location, please pick it manually',
          duration: 2500
        });
        toast.present();
        }
        )
        ; 
  }
  

  }
