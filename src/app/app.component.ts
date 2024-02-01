import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


// Type for main Data
interface ExchangeData  {
  time: Date,
  price: number
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'priceTracker';
  private exchangeData: ExchangeData[] = [];

  // addPrice function allows You to add some data  in this.exchangeData array
  addPrice(newData: ExchangeData): void {
    this.exchangeData.push(newData);
  }

  // getMinMaxPrice function allows You to find the difference between prices depends on
  // the interval that you should pass
  getMinMaxPrice(intervalMinutes: number): { min: number; max: number } {
    const currentTime = new Date();
    const startTime = new Date(currentTime.getTime() - intervalMinutes * 60 * 1000);

    const relevantPrices = this.exchangeData.filter(
      (data) => data.time >= startTime && data.time <= currentTime);
    if (relevantPrices.length === 0) {
      return { min: 0, max: 0 };
    }


    // Hope these lines don't scare you. :)
    // In case of max.apply You can just pass the whole array without using spread
    const minPrice = Math.min.apply(null, relevantPrices.map((data) => data.price));
    const maxPrice = Math.max.apply(null, relevantPrices.map((data) => data.price));

    return { min: minPrice, max: maxPrice };
  }
}



