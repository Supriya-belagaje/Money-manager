import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import { CalendarIcon, ClockIcon } from "lucide-react";

const TransactionSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
  category: Yup.string().required("Category is required"),
  note: Yup.string(),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  type: Yup.string().required(),
});

export default function TransactionForm({ onSubmit }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Transaction</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-zinc-900 text-white border border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Add Income or Expense</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="expense" className="mt-4">
          <TabsList className="grid grid-cols-2 w-full mb-4 bg-zinc-800 p-1 rounded">
            <TabsTrigger
              value="expense"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-white rounded p-2"
            >
              Expense
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-white rounded p-2"
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
                  date: "",
                  time: "",
                  type,
                }}
                validationSchema={TransactionSchema}
                onSubmit={async (values, { resetForm }) => {
                  await addTransaction(values);
                  onSubmit(values);
                  resetForm();
                }}
              >
                <Form className="space-y-3">
                  <Field
                    as={Input}
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <Field
                    as={Input}
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <Field
                    as={Input}
                    type="text"
                    name="note"
                    placeholder="Note (optional)"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="note"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <div className="relative">
                    <CalendarIcon className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
                    <Field
                      as={Input}
                      type="date"
                      name="date"
                      className="w-full pl-8"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="relative">
                    <ClockIcon className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
                    <Field
                      as={Input}
                      type="time"
                      name="time"
                      className="w-full pl-8"
                    />
                    <ErrorMessage
                      name="time"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <Button type="submit" className="w-full">
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
} // Don’t forget to define or import addTransaction() somewhere.
