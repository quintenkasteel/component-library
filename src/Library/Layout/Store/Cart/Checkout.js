import React, { Component } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { compose } from 'recompose';
import { loadStripe } from '@stripe/stripe-js';
import { withContext } from '../Context/StoreProvider';
import InjectedCheckoutForm from './Stripe/CheckoutForm';

const stripePromise = loadStripe('pk_test_IogDyGkHolovJCWBGzBVK7LZ00lWRyo2Y7');

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  render() {
    const { context } = this.props;
    if (context.items.length === 0) {
      return <h1>Loading</h1>;
    }
    return (
      <div>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm />
        </Elements>
      </div>
    );
  }
}

export default compose(withContext)(Checkout);
