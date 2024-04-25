export interface LoanPayment {
  readonly payment: number;
  readonly creditPart: number;
  readonly mainPart: number;
  readonly left: number;
  readonly rate: number;
  readonly excess: number;
}

export interface PaymentSetting {
  readonly rate: number;
  readonly excess?: number;
}
