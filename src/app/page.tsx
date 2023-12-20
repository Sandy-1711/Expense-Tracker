import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";
import Button from "./Buttom";
const prisma = new PrismaClient();
export default async function Page() {
  var data = await prisma.expense.findMany();
  console.log(data);
  async function pushData(formData: FormData) {
    "use server"
    const name = formData.get("name");
    const amount = formData.get("amount");
    const newdata = await prisma.expense.create({
      data: {
        name: name as string,
        amount: Number(amount),
      }
    })
    console.log(newdata);
    revalidatePath('/')
  }
  async function deleteData(id: any) {
    "use server"
    const deletedData = await prisma.expense.delete({ where: { id: id } });
    console.log(deletedData);
    revalidatePath('/')

  }
  return <div className="w-full h-[100vh] bg-white flex justify-center items-center flex-col gap-5">
    <h2 className="text-5xl text-black">Expense Tracker</h2>
    <form action={pushData} className="flex flex-col bg-slate-200 rounded-sm p-4 gap-2">
      <input className="text-black p-2" type="text" placeholder="Name" name="name"></input>
      <input className="p-2 text-black" type="number" placeholder="Expense" name="amount"></input>
      <button className=" py-2 px-5 bg-blue-500">Submit</button>
    </form>
    {data && data.map(function ({ id, name, amount }: any) {
      // console.log(id);
      return <div key={id} className=" w-90 text-black flex justify-between items-center gap-2">
        <div className=" w-60 flex justify-between">
          <span className=" font-semibold">{name}</span>
          <span>${amount}</span>
        </div>
        <Button id={id} deleteData={deleteData} />
      </div>
    })}
  </div>
}