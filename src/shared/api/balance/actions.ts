import { BALANCE_TO_WITHDRAW_INPUT_NAME } from '@exchange-gateway/shared/api/balance/consts';
import getSession from '@exchange-gateway/shared/api/authentication/get-session';
import { redirect } from 'next/navigation';
import { transactionWithdrawalAction } from '@exchange-gateway/shared/translations/transaction-withdrawal-action';
import { getBalanceOfUserFromDatabase } from '@exchange-gateway/shared/api/database-queries/profile';

// eslint-disable-next-line no-unused-vars
async function startWithdrawalTransaction(userId: string, amount: number): Promise<{ status: string }> {
  // const fireBaseDeductionOperationResult = await deductWithdrawalAmountFromUser(amount);
  // throw if fireBaseDeductionOperationResult has an error; rollback the whole transaction
  // const transferInitiatedResult = await requestToBankAPIToInitiateTransfer(amount);
  // throw if transferInitiatedResult has an error; rollback the whole transaction
  // setANewRecordToTransactionHistoryInFirebase();
  return ({ status: 'OK' });
}

export const withdrawBalance = async (formData: FormData): Promise<any> => {
  const session = await getSession();
  const balanceToWithdraw: string | null = formData.get(BALANCE_TO_WITHDRAW_INPUT_NAME) as string;

  if (!session) {
    redirect('/login');
  }

  if (!balanceToWithdraw || typeof +balanceToWithdraw !== 'number') {
    return transactionWithdrawalAction.typeError;
  }

  if (+balanceToWithdraw <= 0) {
    return transactionWithdrawalAction.negativeNumberError;
  }

  const currentBalance = await getBalanceOfUserFromDatabase('user uuid');

  if (+balanceToWithdraw > currentBalance) {
    return transactionWithdrawalAction.balanceMoreThanCurrentError;
  }

  const transactionResult = await startWithdrawalTransaction('user uuid', +balanceToWithdraw);

  if (transactionResult.status !== 'OK') {
    return transactionWithdrawalAction.unableToMakeTransaction;
  }
};
