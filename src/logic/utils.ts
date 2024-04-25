/**
 * @param s общая сумма кредита
 * @param p 1/100 доля процентной ставки (в месяц)
 * @param n срок кредитования (в месяцах)
 * @returns размер ежемесячного платежа по аннуитетной схема
 */
export function plt(s: number, p: number, n: number): number {
  return s * (p + p / ((1 + p) ** n - 1));
}

/**
 *
 * @param value значения для формата
 * @param options параметры для форматирования
 * @returns отформатированное значение валюты
 */
export function numberFormat(value: number, options: Intl.NumberFormatOptions = {}): string {
  const { minimumFractionDigits = 2, maximumFractionDigits = 2, currency = 'RUB', style = 'currency' } = options;
  const props = { ...options, style, currency, minimumFractionDigits, maximumFractionDigits };
  return new Intl.NumberFormat('ru', props).format(value);
}
