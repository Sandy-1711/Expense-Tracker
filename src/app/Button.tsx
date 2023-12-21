'use client'
export default function Button({ id, deleteData }: any) {
    // console.log(id);
    return <button onClick={function () {
        deleteData(id);
    }} className="px-2 h-max py-2 bg-blue-500 text-white rounded-sm">Delete</button>
}