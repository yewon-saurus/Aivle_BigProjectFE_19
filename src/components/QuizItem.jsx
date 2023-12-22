import { IoChatboxOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const QuizItem = ({data}) => {
    return (
        <a className="flex gap-2 text-left mx-3 px-4 py-2 hover:bg-[var(--color-primary-200)] rounded-full"
            href={process.env.PUBLIC_URL + "/quiz/" + data.id}>
            {
                data.solved_date === null ?
                <IoChatboxOutline style={{width: '20px', height: 'auto',}} color="var(--color-primary-600)" />
                : <IoCheckmarkCircleOutline style={{width: '20px', height: 'auto',}} color="var(--color-success-700)" />
            }
            <span className="text-sm truncate w-full">{data.id + "단계: " + data.word}</span>
        </a>
    );
}

export default QuizItem;