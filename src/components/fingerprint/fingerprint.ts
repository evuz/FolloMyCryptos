import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Platform, AlertController } from 'ionic-angular';

@Component({
  selector: "app-fingerprint",
  templateUrl: "./fingerprint.html"
})
export class FingerprintComponent implements OnInit {
  fingerprintAvailable: Promise<{ email: string, password: string }> | boolean;
  useFingerPrint: boolean;
  isClick = false;
  @Output() fingerprintVerify = new EventEmitter<any>();
  @Output() onChangeUseFingerprint = new EventEmitter<boolean>();

  constructor(
    private platform: Platform,
    private alertCtrl: AlertController,
    private faio: FingerprintAIO
  ) { }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Do you want use your fingerprint?',
      message: 'If you choose use fingerprint, option remember password dissapear',
      buttons: [
        {
          text: 'Disagree'
        },
        {
          text: 'Agree',
          handler: () => {
            this.useFingerPrint = true;
            localStorage.setItem('useFingerPrint', 'true');
            this.onChangeUseFingerprint.emit(this.useFingerPrint);
          }
        }
      ]
    });
    confirm.present();
  }

  onClick() {
    this.isClick = true;
    setTimeout(() => this.isClick = false, 500);
    if (this.useFingerPrint) {
      this.showFingerprint();
    } else {
      this.showConfirm();
    }
  }

  onlongPress() {
    if (this.useFingerPrint && !this.isClick) {
      const confirm = this.alertCtrl.create({
        title: 'Will you stop using the fingerprint?',
        buttons: [
          {
            text: 'Disagree',
          },
          {
            text: 'Agree',
            handler: () => {
              this.useFingerPrint = false;
              localStorage.setItem('useFingerPrint', 'false');
              this.onChangeUseFingerprint.emit(this.useFingerPrint);
            }
          }
        ]
      });
      confirm.present();
    }
  }

  showFingerprint() {
    this.faio.show({
      clientId: 'FollowMyCrypto',
      clientSecret: 'password',
      disableBackup: true,
      localizedFallbackTitle: 'Use Pin',
      localizedReason: 'Please authenticate'
    })
      .then((result: any) => this.fingerprintVerify.emit())
      .catch((error: any) => console.log(error));
  }

  ngOnInit() {
    if (this.platform.is('cordova')) {
      this.useFingerPrint = localStorage.getItem('useFingerPrint') === 'true';
      this.onChangeUseFingerprint.emit(this.useFingerPrint);
      this.fingerprintAvailable = this.faio.isAvailable();
    } else {
      this.fingerprintAvailable = false;
    }
  }

}
