export default function Message({ message, own }) {
    return (
        <div
            className={
                own ? "flex flex-col items-end" : "flex flex-col items-start"
            }
        >
            <div className="bg-gray-200 max-w-[234px] p-5 text-center rounded-3xl mt-2">
                {message.content}
            </div>
        </div>
    );
}
