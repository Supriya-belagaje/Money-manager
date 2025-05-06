// import { Formik, Form, Field, ErrorMessage, useField } from "formik";
// import * as Yup from "yup";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "@/components/ui/tabs";
// import { CalendarIcon, ClockIcon } from "lucide-react";
// import { addTransaction } from "../../utils/addTransaction";
// import TimePicker from "react-time-picker";
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';

// // const TransactionSchema = Yup.object().shape({
// //   amount: Yup.number().required("Amount is required"),
// //   category: Yup.string().required("Category is required"),
// //   note: Yup.string(),
// //   date: Yup.string().required("Date is required"),
// //   time: Yup.string().required("Time is required"),
// //   type: Yup.string().required(),
// // });

// const TransactionSchema = Yup.object().shape({
//   amount: Yup.number().required("Amount is required"),
//   category: Yup.string().required("Category is required"),
//   note: Yup.string(),
//   datetime: Yup.date().required("Date and Time are required"),
//   type: Yup.string().required(),
// });


// // Custom time picker field with Formik
// const TimeField = ({ name }) => {
//   const [field, meta, helpers] = useField(name);

//   return (
//     <div className="relative z-50"> {/* z-50 ensures it appears above modal */}
//       <ClockIcon className="absolute left-3 top-3 text-gray-400 w-4 h-4 z-10" />
//       <div className="pl-10">
//         <TimePicker
//           onChange={(val) => helpers.setValue(val)}
//           value={field.value}
//           format="h:mm a"
//           clearIcon={null}
//           clockIcon={null} // Optional: hides the small inline clock icon
//           className="w-full"
//         />
//       </div>
//       {meta.touched && meta.error && (
//         <div className="text-red-500 text-xs mt-1">{meta.error}</div>
//       )}
//     </div>
//   );
// };


// export default function TransactionForm({ onSubmit }) {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Add Transaction</Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl p-6 border-none">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-extrabold text-indigo-600 text-center">
//             Add Income or Expense
//           </DialogTitle>
//         </DialogHeader>

//         <Tabs defaultValue="expense" className="mt-6 w-full">
//           <TabsList className="grid grid-cols-2 bg-indigo-100 rounded-md overflow-hidden mb-6">
//             <TabsTrigger
//               value="expense"
//               className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-indigo-600 font-semibold py-2"
//             >
//               Expense
//             </TabsTrigger>
//             <TabsTrigger
//               value="income"
//               className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-indigo-600 font-semibold py-2"
//             >
//               Income
//             </TabsTrigger>
//           </TabsList>

//           {["expense", "income"].map((type) => (
//             <TabsContent key={type} value={type}>
//               <Formik
//                initialValues={{
//                 amount: "",
//                 category: "",
//                 note: "",
//                 datetime: "",  // ✅ single field
//                 type,
//               }}
//                 validationSchema={TransactionSchema}
//                 onSubmit={async (values, { resetForm }) => {
//                   await addTransaction(values);
//                   onSubmit(values);
//                   resetForm();
//                 }}
//               >
//                 <Form className="space-y-4">
//                   <div>
//                     <Field
//                       as={Input}
//                       type="number"
//                       name="amount"
//                       placeholder="Amount"
//                       className="focus:ring-indigo-400"
//                     />
//                     <ErrorMessage
//                       name="amount"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <div>
//                     <Field
//                       as={Input}
//                       type="text"
//                       name="category"
//                       placeholder="Category"
//                       className="focus:ring-indigo-400"
//                     />
//                     <ErrorMessage
//                       name="category"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <div>
//                     <Field
//                       as={Input}
//                       type="text"
//                       name="note"
//                       placeholder="Note (optional)"
//                       className="focus:ring-indigo-400"
//                     />
//                     <ErrorMessage
//                       name="note"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <div className="relative">
//                     <CalendarIcon className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
//                     <Field
//                       as={Input}
//                       type="date"
//                       name="date"
//                       className="pl-10 focus:ring-indigo-400"
//                     />
//                     <ErrorMessage
//                       name="date"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <TimeField name="time" />

//                   <Button
//                     type="submit"
//                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
//                   >
//                     Add {type.charAt(0).toUpperCase() + type.slice(1)}
//                   </Button>
//                 </Form>
//               </Formik>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   );
// }


// 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { CalendarIcon } from "lucide-react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { addTransaction } from "../../utils/addTransaction";


const TransactionSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
  category: Yup.string().required("Category is required"),
  note: Yup.string(),
  datetime: Yup.date().required("Date and Time are required"),
  type: Yup.string().required(),
});

const categoryOptions = [
  { value: "Food", label: "🍜 Food" },
  { value: "Social Life", label: "🧑‍🤝‍🧑 Social Life" },
  { value: "Pets", label: "🐶 Pets" },
  { value: "Transport", label: "🚖 Transport" },
  { value: "Culture", label: "🖼️ Culture" },
  { value: "Household", label: "🪑 Household" },
  { value: "Apparel", label: "🧥 Apparel" },
  { value: "Beauty", label: "💄 Beauty" },
  { value: "Health", label: "🧘 Health" },
  { value: "Education", label: "📙 Education" },
  { value: "Gift", label: "🎁 Gift" },
  { value: "Other", label: "❓ Other" },
];

const CategorySelect = ({ field, form }) => {
  const handleChange = (selectedOption) => {
    form.setFieldValue(field.name, selectedOption.value);
  };

  const selectedOption = categoryOptions.find(
    (option) => option.value === field.value
  );

  return (
    <div className="space-y-1">
      <Select
        options={categoryOptions}
        onChange={handleChange}
        value={selectedOption}
        placeholder="Select a category"
        className="text-sm"
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "white",
            borderColor: "#cbd5e0",
            color: "#1a202c",
            fontSize: "0.875rem",
            boxShadow: "none",
            '&:hover': {
              borderColor: "#a0aec0",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#ebf4ff" : "white",
            color: "#1a202c",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#1a202c",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#718096",
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
        }}
      />
      <ErrorMessage
        name="category"
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

export default function TransactionForm({ onSubmit }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Add Transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl p-6 border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-indigo-600 text-center">
            Add Income or Expense
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="expense" className="mt-6 w-full">
          <TabsList className="grid grid-cols-2 bg-indigo-100 rounded-md overflow-hidden mb-6">
            <TabsTrigger
              value="expense"
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-indigo-600 font-semibold py-2"
            >
              Expense
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-indigo-600 font-semibold py-2"
            >
              Income
            </TabsTrigger>
          </TabsList>

          {["expense", "income"].map((type) => (
            <TabsContent key={type} value={type}>
              <Formik
                initialValues={{
                  amount: "",
                  category: "",
                  note: "",
                  datetime: "",
                  type,
                }}
                validationSchema={TransactionSchema}
                onSubmit={async (values, { resetForm }) => {
                  await addTransaction(values);
                  onSubmit(values);
                  resetForm();
                }}
              >
                <Form className="space-y-4">
                  {/* Amount */}
                  <div>
                    <Field
                      as={Input}
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      className="text-gray-900 placeholder-gray-500 focus:ring-indigo-400"
                    />
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Category Field */}
                  <Field name="category" component={CategorySelect} />

                  {/* Note */}
                  <div>
                    <Field
                      as={Input}
                      type="text"
                      name="note"
                      placeholder="Note (optional)"
                      className="text-gray-900 placeholder-gray-500 focus:ring-indigo-400"
                    />
                    <ErrorMessage
                      name="note"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="relative z-50">
  <CalendarIcon className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
  <Field name="datetime">
    {({ field, form }) => (
      <Datetime
        {...field}
        onChange={(value) => form.setFieldValue("datetime", value)}
        value={field.value}
        inputProps={{
          placeholder: "Select Date & Time",
          className:
            "pl-10 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full",
        }}
      />
    )}
  </Field>
  <ErrorMessage
    name="datetime"
    component="div"
    className="text-red-500 text-xs mt-1"
  />
</div>


                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                  >
                    Add {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                </Form>
              </Formik>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
