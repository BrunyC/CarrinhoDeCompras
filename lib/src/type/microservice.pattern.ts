import { CartPattern, CheckoutPattern, ProductPattern, ProductPricePattern, UserPattern } from '@lib/enum/index';

export type MicroservicePattern = ProductPattern | ProductPricePattern | UserPattern | CartPattern | CheckoutPattern;
