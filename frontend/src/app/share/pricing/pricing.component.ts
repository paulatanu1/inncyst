import { Component, OnInit } from '@angular/core';
//@ts-ignore
import { load } from '@cashfreepayments/cashfree-js';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // async paymentBtn() {
  //   const cashfree = await load({
  //     mode: 'sandbox', //or production
  //   });
  // }

  async paymentBtn() {
    const cashfree = await load({
      mode: 'sandbox',
    });
    const checkoutOptions = {
      paymentSessionId:
        'session_QXiQN7zXrrKde6GOrCJD5HT9XhyPryc__BC0SsrUD10dYfSkjixN6bSbuqLBeSm2zQ2Jeo9NDjU-C1itYbae-uBP82YcW-KL9DYmuyuigv7S',
      redirectTarget: '_self', //to redirect route at diffrent page use _blank
    };
    cashfree.checkout(checkoutOptions);
  }
}
