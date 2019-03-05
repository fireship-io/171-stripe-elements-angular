import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireFunctions } from '@angular/fire/functions';

declare var StripeCheckout; // : StripeCheckoutStatic;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private auth: AuthService, private functions: AngularFireFunctions) {}

  @Input() amount;
  @Input() description;

  handler; // : StripeCheckoutHandler;

  confirmation: any;
  loading = false;

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_...',
      image: 'some-image',
      locale: 'auto',
      source: async (source) => {
        this.loading = true;
        const user = await this.auth.getUser();
        // this.confirmation = await mockAPI(user.uid, source.id, this.amount);
        const fun = this.functions.httpsCallable('stripeCreateCharge');
        this.confirmation = await fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
        this.loading = false;

      }
    });
  }

  // Open the checkout handler
  async checkout(e) {
    const user = await this.auth.getUser();
    this.handler.open({
      name: 'Fireship Store',
      description: this.description,
      amount: this.amount,
      email: user.email,
    });
    e.preventDefault();
  }

  // Close on navigate
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }

}
