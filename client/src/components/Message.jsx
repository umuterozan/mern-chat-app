export default function Message({ message, own }) {
    return (
        <div className="bg-gray-100 max-w-[234px] py-5 text-center rounded-3xl mt-2">
            {message.content}
        </div>
    )
}