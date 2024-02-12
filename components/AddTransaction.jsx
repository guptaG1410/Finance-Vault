import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Modal from "@/components/Modal";
import { currencyFormatter } from "@/lib/utils";

const AddTransaction = ({ show, onClose, income, setIncome }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletError, setWalletError] = useState("");
  const walletAddressRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();

  // Handler Functions

  const handleWalletChange = (event) => {
    setWalletAddress(event.target.value);
    setWalletError("");
  };

  const addIncomeHandler = async (e) => {
    e.preventDefault();
  
    // Validate wallet address
    const currentWalletAddress = walletAddressRef.current.value;
  
    if (!currentWalletAddress.trim()) {
      setWalletError(
        "Invalid wallet address. It must start with `0x` and be exactly 42 characters long, containing only hexadecimal characters."
      );
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(currentWalletAddress)) {
      setWalletError(
        "Invalid wallet address. It must start with `0x` and be exactly 42 characters long, containing only hexadecimal characters."
      );
    } else {
      // Handle the form submission or API call here
      const newIncome = {
        Wallet: currentWalletAddress,
        Amount: amountRef.current.value,
        Description: descriptionRef.current.value,
        createdAt: new Date(),
      };
  
      const collectionRef = collection(db, "Transactions");
  
      try {
        const docSnap = await addDoc(collectionRef, newIncome);
  
        // Update state
        setIncome((prevState) => [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ]);
  
        // Clear form fields
        walletAddressRef.current.value = "";
        descriptionRef.current.value = "";
        amountRef.current.value = "";
  
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  
  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef = doc(db, "Transactions", incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
      // Update State
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "Transactions");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });

      setIncome(data);
    };

    getIncomeData();
  }, []);

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
        <div className="input-group">
          <label htmlFor="wallet">Wallet Address</label>
          <input
            name="wallet"
            ref={walletAddressRef}
            type="text"
            placeholder="Enter Wallet Address"
            required
          />
          {walletError && (
            <p className="mt-2 text-start text-sm text-red-500" role="alert">
              {walletError}
            </p>
          )}
        </div>
        <div className="input-group">
          <label>Transaction Amount</label>
          <input
            type="number"
            name="amount"
            ref={amountRef}
            min={0}
            max={10000}
            step={1}
            placeholder="Enter income amount"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            name="description"
            ref={descriptionRef}
            type="text"
            placeholder="Enter income description"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Transaction
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Transaction History</h3>

        {income.map((i) => {
          return (
            <div className="flex justify-between item-center" key={i.id}>
              <div>
                <p className="font-semibold">{i.Description}</p>
                <small className="text-xs">
                  {i.createdAt.toLocaleString()}
                </small>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormatter(i.Amount)}
                <button
                  onClick={() => {
                    deleteIncomeEntryHandler(i.id);
                  }}
                >
                  Delete
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default AddTransaction;
