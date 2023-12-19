import { IoChatboxOutline } from "react-icons/io5";

const HistoryItem = ({data}) => {
    return (
        <div className="flex gap-2 text-left truncate mx-3 px-4 py-2 hover:bg-[var(--color-primary-300)] rounded-full">
            <IoChatboxOutline style={{width: '20px', height: 'auto',}} color="var(--color-primary-600)" />
            <span className="text-sm truncate w-full">{data.sentence}</span>
        </div>
    );
}

export default HistoryItem;