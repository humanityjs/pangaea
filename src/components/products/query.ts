import {gql} from '@apollo/client';

export const CURRENCIES = gql`
  query currency {
    currency
  }
`;

export const PRODUCTS = gql`
  query products($currency: Currency) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`