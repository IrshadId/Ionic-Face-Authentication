import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonToast } from '@ionic/angular/standalone';
import { BiometryType, NativeBiometric } from 'capacitor-native-biometric';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonToast],
})
export class HomePage {
  isToast = false;
  toastMessage!: string; constructor() { }

  async performBiometricVerification() {
    try {
      const result = await NativeBiometric.isAvailable({ useFallback: true });
      if (!result.isAvailable) return;

      const isFaceID = result.biometryType == BiometryType.FACE_ID;
      console.log(isFaceID);

      const verified = await NativeBiometric.verifyIdentity({
        reason: 'Authentication',
        subtitle: 'FACE ID',
        description: 'Your Face ID needed for authorisation',
        useFallback: true,
        maxAttempts: 2,
      })
        .then(() => true)
        .catch(() => false);

      if (!verified) return;

    } catch (e) {
      this.openToast('Biometric is not supported in these device,Please choose another one and try again');
      console.log(e);
    }
  }

  openToast(msg: string) {
    this.isToast = true;
    this.toastMessage = msg;
  }
}
