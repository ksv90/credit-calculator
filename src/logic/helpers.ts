import { MONTHS_COUNT } from './constants';
import { LoanPayment, PaymentSetting } from './types';
import { plt } from './utils';

/**
 * @param loan сумма займа
 * @param interestRate процентная ставка за месяц
 * @param creditTerm срок кредита
 * @returns платеж по кредиту за месяц
 */
export function getMonthLoanPayment(loan: number, interestRate: number, creditTerm: number): LoanPayment {
  if (loan <= 0) return { payment: 0, creditPart: 0, mainPart: 0, left: loan, rate: interestRate, excess: 0 };
  const rate = interestRate / 100 / MONTHS_COUNT;
  const payment = plt(loan, rate, creditTerm);
  const creditPart = loan * rate;
  const mainPart = payment - creditPart;
  const left = loan - mainPart;
  return { payment, creditPart, mainPart, left, rate: interestRate, excess: 0 };
}

export function calculateLoanPayments(loan: number, interestRates: readonly PaymentSetting[], fee = 0): LoanPayment[] {
  const loanPayments = new Array<LoanPayment>();
  let term = interestRates.length;
  let left = loan;

  for (const { rate, excess = 0 } of interestRates) {
    const monthLoanPayment = getMonthLoanPayment(left, rate, term);
    const currentExcess = (fee && monthLoanPayment.left > 0 ? fee - monthLoanPayment.payment : 0) + excess;
    term -= 1;
    left = monthLoanPayment.left - currentExcess;
    loanPayments.push({ ...monthLoanPayment, left, excess: monthLoanPayment.payment ? currentExcess : 0 });
  }

  return loanPayments;
}
