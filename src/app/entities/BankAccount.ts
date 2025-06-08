export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: 'CHECKING' | 'CASH' | 'INVESTMENT';
  color: string;
  currentBalance: number;
}
