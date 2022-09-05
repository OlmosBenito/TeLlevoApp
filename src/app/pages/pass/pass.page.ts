import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {

  user:{
    usuario: "";
  };

  constructor(public toastController: ToastController, private router: Router,) { }

  ngOnInit() {
  }

  recuperarContrasena(){    

    this.presentToast('Revise su correo para recuperar Contraseña.');

    this.router.navigate(['/login']);
      
  }
  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 4000 //si no viene el parámetro el tiempo es 2000
    });
    toast.present();

    
  }
}