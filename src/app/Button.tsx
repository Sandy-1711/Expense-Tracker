'use client'
export default function Button({ id, deleteData }: any) {
    // console.log(id);
    return <button onClick={function () {
        deleteData(id);
    }} className="px-2 py-5 bg-blue-500 text-white">Delete</button>
}