// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// export default function TransactionForm({ onSubmit }) {
//   const [transaction, setTransaction] = useState({ amount: "", category: "", type: "expense" });

//   const handleChange = (e) => setTransaction({ ...transaction, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(transaction);
//     setTransaction({ amount: "", category: "", type: "expense" });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded">
//       <label>Amount</label>
//       <Input type="number" name="amount" value={transaction.amount} onChange={handleChange} required />

//       <label>Category</label>
//       <Input type="text" name="category" value={transaction.category} onChange={handleChange} required />

//       <label>Type</label>
//       {/* <Select name="type" value={transaction.type} onChange={handleChange}>
//         <option value="expense">Expense</option>
//         <option value="income">Income</option>
//       </Select> */}
//       <Select>
//   <SelectTrigger className="w-[100%]">
//     <SelectValue placeholder="Type" />
//   </SelectTrigger>
//   <SelectContent>
//     <SelectItem value="expense">Expense</SelectItem>
//     <SelectItem value="income">Income</SelectItem>
//   </SelectContent>
// </Select>


//       <Button type="submit">Add Transaction</Button>
//     </form>
//   );
// }


import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { addTransaction } from "@/utils/api";

// Validation Schema using Yup
const TransactionSchema = Yup.object().shape({
  amount: Yup.number().positive("Amount must be positive").required("Amount is required"),
  category: Yup.string().min(2, "Category must have at least 2 characters").required("Category is required"),
  type: Yup.string().oneOf(["income", "expense"], "Invalid type").required("Type is required"),
});

export default function TransactionForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ amount: "", category: "", type: "expense" }}
      validationSchema={TransactionSchema}
      onSubmit={async (values, { resetForm }) => {
        await addTransaction(values);
        onSubmit(values);
        resetForm();
      }}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form className="space-y-3 p-4 border rounded">
          <label>Amount</label>
          <Field as={Input} type="number" name="amount" className="border rounded p-2 w-full" />
          <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />

          <label>Category</label>
          <Field as={Input} type="text" name="category" className="border rounded p-2 w-full" />
          <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />

          <label>Type</label>
          <Select onValueChange={(value) => setFieldValue("type", value)} className="w-full">
            <SelectTrigger>
              <SelectValue placeholder="Select Types"  />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="income">Income</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />

          <Button type="submit">Add Transaction</Button>
        </Form>
      )}
    </Formik>
  );
}

