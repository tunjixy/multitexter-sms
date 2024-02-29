import ApiClient from '../api-client'
import type {
  UnitPriceReq,
  UnitPriceRes,
  BuyUnitRes,
  VerifyPaymentRes,
} from '@/types/payment'

class PaymentService extends ApiClient {
  calculateUnitPrice(payload: UnitPriceReq): Promise<UnitPriceRes> {
    return this.call<UnitPriceRes>('post', 'unit-price-online', {
      unit: payload.unit,
      payment_gateway: payload.paymentGateway,
    })
  }

  purchaseUnit(payload: UnitPriceReq): Promise<BuyUnitRes> {
    return this.call<BuyUnitRes>('post', 'buysms', {
      unit: payload.unit,
      payment_gateway: payload.paymentGateway,
    })
  }

  verifyPayment(id: string): Promise<VerifyPaymentRes> {
    return this.call<VerifyPaymentRes>('post', 'payment/verify', {
      transid: id,
    })
  }

  verifyFlutterwavePayment(
    reference: string,
    transactionId: string,
  ): Promise<VerifyPaymentRes> {
    return this.call<VerifyPaymentRes>('post', 'flutter-payment/verify', {
      tx_ref: reference,
      transaction_id: transactionId,
    })
  }
}

export default PaymentService
