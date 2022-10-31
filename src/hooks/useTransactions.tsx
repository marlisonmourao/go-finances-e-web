import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

import { api } from '../services/api';

interface Transaction {
  id: number,
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

// interface TransactionInputs {
//   title: string;
//   amount: number;
//   category: string;
//   type: string;
// }

type TrasactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TrasactionInput) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);


export function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("/transactions").then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(trasactionInput: TrasactionInput){
   const response =  await api.post('/transactions', {
    ...trasactionInput,
    createdAt: new Date(),
   })
   const { transaction } = response.data;

   setTransactions([
    ...transactions, transaction
   ])
  }

  return(
    <TransactionContext.Provider value={{ transactions , createTransaction }}>
      {children}
    </TransactionContext.Provider>
  )

}

export function useTransactions() {
  const context = useContext(TransactionContext);

  return context
}