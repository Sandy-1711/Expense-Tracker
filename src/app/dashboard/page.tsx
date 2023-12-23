import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Button from "../Button";
const prisma = new PrismaClient();
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { redirect } from "next/navigation";
import Image from "next/image";
export default async function Page() {


    const {
        getAccessToken,
        getBooleanFlag,
        getFlag,
        getIntegerFlag,
        getOrganization,
        getPermission,
        getPermissions,
        getStringFlag,
        getUser,
        getUserOrganizations,
        isAuthenticated
    } = getKindeServerSession();
    const auth = await isAuthenticated();
    const user = await getUser();
    var data;
    if (auth) {

        data = await prisma.expense.findMany({
            where: {
                userId: user?.id,
            }
        });
    }

    async function pushData(formData: FormData) {
        "use server"
        const name = formData.get("name");
        const amount = formData.get("amount");
        const newdata = await prisma.expense.create({
            data: {
                name: name as string,
                amount: Number(amount),
                userId: user?.id as string,
            }
        })
        console.log(newdata);
        revalidatePath('/')
        // prisma.$disconnect();
    }
    async function deleteData(id: any) {
        "use server"
        const deletedData = await prisma.expense.delete({ where: { id: id, userId: user?.id } });
        console.log(deletedData);
        revalidatePath('/')
        // prisma.$disconnect();

    }
    return !auth ? redirect('/') : <div className="relative w-full h-screen bg-white flex justify-center items-center flex-col gap-5">
        <div className="absolute top-4 left-4 flex items-center justify-center gap-4">
            <img className="rounded-full object-center" height={40} width={40} src={user?.picture as string} alt="profile pic" />
            <span className=" max-xd:hidden text-black">{user?.given_name} {user?.family_name} - {user?.email}</span>
        </div>
        <div className="absolute h-10 top-4 left-1/2 -translate-x-1/2 flex justify-center items-center">
            <h2 className=" max-xd:hidden text-xl text-black font-bold">Expense Tracker</h2>
            <h2 className="xd:hidden text-black">Hello, {user?.given_name}</h2>
        </div>
        <LogoutLink className="absolute px-5 py-2 rounded-md top-4 right-4 text-white bg-blue-500">Logout</LogoutLink>
        <form action={pushData} className=" w-[300px] shadow-md flex flex-col bg-slate-100 rounded-md p-6 py-10 gap-2">
            <input className="text-black p-2" type="text" placeholder="Name" name="name"></input>
            <input className="p-2 text-black" type="number" placeholder="Expense" name="amount"></input>
            <button className="rounded-md py-1 px-5 bg-blue-500">Submit</button>
        </form>
        {data && data.map(function ({ id, name, amount }: any) {
            return <div key={id} className="rounded-md border border-slate-400 px-5 py-2 w-[300px] text-black flex justify-between items-center gap-2">
                <span className=" w-max text-black font-semibold ">{name}</span>
                <div className=" flex justify-end gap-2 items-center">
                    <span>${amount}</span>
                    <Button id={id} deleteData={deleteData} />
                </div>
            </div>
        })}
    </div>
}
