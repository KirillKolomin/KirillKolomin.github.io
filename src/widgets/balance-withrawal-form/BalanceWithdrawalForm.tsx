'use client';

import React, { useState } from 'react';
import NumberInput from '@exchange-gateway/shared/components/forms/NumberInput';
import Button from '@exchange-gateway/shared/components/forms/Button';
import { BALANCE_TO_WITHDRAW_INPUT_NAME } from '@exchange-gateway/shared/api/balance/consts';
import { withdrawBalance } from '@exchange-gateway/shared/api/balance/actions';
import { BalanceWithdrawalFormTranslations } from '@exchange-gateway/shared/translations/balance-withdrawal-form';

export default function BalanceWithdrawalForm() {
  const [error, setError] = useState<string>('');

  const doFormAction = async (formData: FormData) => {
    setError('');
    const errorMessage = await withdrawBalance(formData);

    if (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <form action={doFormAction} className="flex flex-col lg:flex-row lg:items-end gap-4">
      <NumberInput id="balance-withdrawal" name={BALANCE_TO_WITHDRAW_INPUT_NAME} label={BalanceWithdrawalFormTranslations.balanceWithdrawalInputLabel} error={error} />
      <div>
        <Button full={false} type="submit">{BalanceWithdrawalFormTranslations.balanceWithdrawalButtonTitle}</Button>
      </div>
    </form>
  );
}
