import { ChangeEventHandler, useEffect, useState } from 'react';
import { LoanPayment, PaymentSetting, calculateLoanPayments, numberFormat } from '../logic';

function calculateLite(loan: number, term: number, rate: number, fee: number) {
  const settings = Array.from({ length: term }).map<PaymentSetting>(() => {
    return { rate };
  });

  const loanPayments = calculateLoanPayments(loan, settings, fee);
  let overpayment = 0;
  let total = 0;
  const loanPaymentsFormat = loanPayments
    .filter((loanPayment) => loanPayment.payment)
    .map((loanPayment) => {
      overpayment += loanPayment.creditPart;
      total += loanPayment.payment + loanPayment.excess;
      return {
        payment: numberFormat(loanPayment.payment),
        creditPart: numberFormat(loanPayment.creditPart),
        mainPart: numberFormat(loanPayment.mainPart),
        left: numberFormat(loanPayment.left),
        rate: numberFormat(loanPayment.rate / 100, { style: 'percent', minimumFractionDigits: 0 }),
        excess: numberFormat(loanPayment.excess),
      } satisfies Record<keyof LoanPayment, string>;
    });
  return {
    loan: numberFormat(loan),
    overpayment: numberFormat(overpayment),
    total: numberFormat(total),
    loanPayments: loanPaymentsFormat,
  };
}

export function App() {
  const [loan, setLoan] = useState(0);
  const [rate, setRate] = useState(0);
  const [term, setTerm] = useState(0);
  const [fee, setFee] = useState(0);

  useEffect(() => {
    console.clear();
    const data = calculateLite(loan, term, rate, fee);
    console.log('loan', data.loan);
    console.log('overpayment:', data.overpayment);
    console.log('total:', data.total);
    console.log(data.loanPayments);
  }, [loan, rate, term, fee]);

  const loanChangeHandler: ChangeEventHandler<globalThis.HTMLInputElement> = ({ target }) => {
    setLoan(+target.value);
  };

  const rateChangeHandler: ChangeEventHandler<globalThis.HTMLInputElement> = ({ target }) => {
    setRate(+target.value);
  };

  const termChangeHandler: ChangeEventHandler<globalThis.HTMLInputElement> = ({ target }) => {
    setTerm(+target.value);
  };

  const feeChangeHandler: ChangeEventHandler<globalThis.HTMLInputElement> = ({ target }) => {
    setFee(+target.value);
  };

  return (
    <>
      <p style={{ color: 'grey', fontSize: '12px' }}>
        Динамичная ставка и переплата по месяцу поддерживаются программно, но пока не реализованы в интерфейсе.
        Установка ежемесячного платежа - не обязательный параметр.
      </p>
      <p>
        <label htmlFor="loan">Сумма кредита</label>
        <input id="loan" type="number" value={loan} onChange={loanChangeHandler} min={0} />
      </p>
      <p>
        <label htmlFor="rate">Процентная ставка</label>
        <input id="rate" type="number" value={rate} onChange={rateChangeHandler} min={0} />
      </p>
      <p>
        <label htmlFor="term">Срок кредитования</label>
        <input id="term" type="number" value={term} onChange={termChangeHandler} min={0} />
      </p>
      <br></br>
      <p>
        <label htmlFor="fee">Постоянная ежемесячная плата</label>
        <input id="fee" type="number" placeholder={fee.toString()} onChange={feeChangeHandler} min={0} />
      </p>
      <p style={{ color: 'red', fontSize: '12px' }}>смотри результаты в консоли</p>
    </>
  );
}
