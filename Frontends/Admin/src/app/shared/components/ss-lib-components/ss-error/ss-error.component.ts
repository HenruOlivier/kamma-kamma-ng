import { Component, Input } from '@angular/core';
import * as UITools from '../../helpers/ui-tools';

@Component({
  selector: 'ss-error',
  templateUrl: './ss-error.component.html',
  styleUrls: ['./ss-error.component.scss']
})
export class SSErrorComponent {

  private _errorMessage: string;
  @Input()
  set errorMessage(value: string) {
    this._errorMessage = value !== undefined ? value : 'Something went wrong';
  }

  get errorMessage(): string {
    return this._errorMessage || 'Something went wrong';
  }

  private _showImage: boolean;
  @Input()
  set showImage(value: boolean) {
    this._showImage = value !== undefined ? value : true;
  }

  get showImage(): boolean {
    return this._showImage || true;
  }

  getErrorImgURL() {
    let theme = UITools.getTheme();
    if (theme === 'light-mode') {
      return 'assets/statics/error_sm_light.gif';
    } else if (theme === 'dark-mode') {
      return 'assets/statics/error_sm_dark.gif';
    } else {
      return 'assets/statics/error.png';
    }
  }

}
