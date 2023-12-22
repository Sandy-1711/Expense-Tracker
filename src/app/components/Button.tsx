export default function Button({ text, action, ...props }: any) {
    return <button className="px-5 text-white rounded-md py-2 bg-blue-500" onClick={action}>{text}</button>
}