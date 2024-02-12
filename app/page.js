"use client";

import TransactionItem from "@/components/TransactionItem";
import { currencyFormatter } from "@/lib/utils";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

import AddTransaction from "@/components/AddTransaction";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "rgba(255, 99, 132, 1)",
    bgColor: "rgba(255, 99, 132, 0.2)",
    total: 500,
  },
  {
    id: 2,
    title: "Gass",
    color: "rgba(54, 162, 235, 1)",
    bgColor: "rgba(54, 162, 235, 0.2)",
    total: 200,
  },
  {
    id: 3,
    title: "Fuel",
    color: "rgba(255, 206, 86, 1)",
    bgColor: "rgba(255, 206, 86, 0.2)",
    total: 1200,
  },
  {
    id: 4,
    title: "Movies",
    color: "rgba(75, 192, 192, 1)",
    bgColor: "rgba(75, 192, 192, 0.2)",
    total: 800,
  },
  {
    id: 5,
    title: "Holiday",
    color: "rgba(153, 102, 255, 1)",
    bgColor: "rgba(153, 102, 255, 0.2)",
    total: 2000,
  },
];

export default function Home() {
  const [income, setIncome] = useState([]);
  console.log(income);

  const [addTransaction, setaddTransaction] = useState(false);

  return (
    <>
      <AddTransaction
        show={addTransaction}
        onClose={setaddTransaction}
        income={income}
        setIncome={setIncome}
      ></AddTransaction>

      <main className="container max-w-screen-md px-6 py-6 mx-auto mt-10">
        <section className="py-3">
          <span className="text-gray-500 text-md">My balance</span>
          <h2 className="text-4xl font-bold">{currencyFormatter(10000)}</h2>
        </section>
        <section className="flex items-center gap-4 py-3">
          <button
            onClick={() => {
              setaddTransaction(true);
            }}
            className="btn btn-primary-outline"
          >
            Transaction
          </button>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">My Transactions</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map((expense, idx) => {
              return (
                <TransactionItem
                  key={idx}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">STATSTICS</h3>
          <div className="w-3/4 mx-auto">
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMMY_DATA.map((expense) => expense.total),
                    backgroundColor: DUMMY_DATA.map((expense) => expense.color),
                    borderColor: DUMMY_DATA.map((expense) => expense.color),
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
