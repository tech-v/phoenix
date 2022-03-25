import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { EventDisplayService } from '../../../services/event-display.service';

@Component({
  selector: 'app-object-clipping',
  templateUrl: './object-clipping.component.html',
  styleUrls: ['./object-clipping.component.scss'],
})
export class ObjectClippingComponent {
  clippingEnabled: boolean;
  startClippingAngle: number;
  openingAngle: number;

  constructor(private eventDisplay: EventDisplayService) {
    const stateManager = this.eventDisplay.getStateManager();
    stateManager.clippingEnabled.onUpdate(
      (clippingValue) => (this.clippingEnabled = clippingValue)
    );
    stateManager.startClippingAngle.onUpdate(
      (value) => (this.startClippingAngle = value)
    );
  }

  changeStartClippingAngle(change: MatSliderChange) {
    const startAngle = change.value;
    this.eventDisplay.getUIManager().rotateStartAngleClipping(startAngle);
  }

  changeOpeningAngle(change: MatSliderChange) {
    const openingAngle = this.startClippingAngle + change.value;
    this.eventDisplay.getUIManager().rotateOpeningAngleClipping(openingAngle);
  }

  toggleClipping(change: MatCheckboxChange) {
    const value = change.checked;
    this.eventDisplay.getUIManager().setClipping(value);
    this.clippingEnabled = value;
  }
}
