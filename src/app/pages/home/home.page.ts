/** Importaciones de librerias a usar */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';

// Decorador Componente este indica que el Home Page es un Componente
@Component({
  selector: 'app-home', // Nombre del selector como <input> o <main-page>
  templateUrl: 'home.page.html', // Arhivo HTML de la visual a trabajar
  styleUrls: ['home.page.scss'], // Archivo/s de estilos
})
export class HomePage {
  user:any;
  data: any={
    nombre:"",
    apellido:"",
  }; // Generamos una variable Any (permite cualquier valor)

  /**
   * En el constructor del HomePage se colocan por parametros
   * todas aquellas propiedades con el siguiente formato
   * private = visibilidad
   * activeRoute = identificador
   * ActiveRoute = Tipo de Objeto
   * : Indica que el identificador sera de la clase posterior a los : puntos
   * 
   */

  @ViewChild('animacion1', { read: ElementRef, static: true }) animacion1: ElementRef;
  constructor(private activeroute: ActivatedRoute, private router: Router, public alertController:AlertController, public animationCtrl: AnimationController) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { // Utilizamos lambda
      if (this.router.getCurrentNavigation().extras.state) { // Validamos que en la navegacion actual tenga extras
        this.user = this.router.getCurrentNavigation().extras.state.user; // Si tiene extra rescata lo enviado
        console.log(this.data) // Muestra por consola lo traido
      }else{this.router.navigate(["/login"])} // Si no tiene extra la navegacion actual navegar al login
    });
  }

  limpiar(){
    for (var[key, value] of Object.entries(this.data)){
      Object.defineProperty(this.data,key,{value:""})
    }
  }

  mostrar(){
    if(this.data.nombre!="" && this.data.apellido!=""){
      this.presentAlert("Usuario", "Su nombre es: "+this.data.nombre+ " " + this.data.apellido)
    }else{
      this.presentAlert("Error", "Debe ingresar Nombre y Apellido")
    }
  }

  async presentAlert(title:string, msg:string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  };

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const animacion1 = this.animationCtrl.create()
  .addElement(this.animacion1.nativeElement)
  .fill('none')
  .iterations(Infinity)
  .duration(1000)
  .keyframes([
    { offset: 0, transform: 'scale(1)', opacity: '1' },
    { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
    { offset: 1, transform: 'scale(1)', opacity: '1' }
  ]);

    animacion1.play();
  }

  
}
