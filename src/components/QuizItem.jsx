import { IoChatboxOutline } from "react-icons/io5";

const QuizItem = ({data}) => {
    return (
        <a className="flex gap-2 text-left mx-3 px-4 py-2 hover:bg-[var(--color-primary-200)] rounded-full"
            href={process.env.PUBLIC_URL + "/quiz/" + data.round}>
            <IoChatboxOutline style={{width: '20px', height: 'auto',}} color="var(--color-primary-600)" />
            {
                data.solved_date === null ?
                <span className="text-sm truncate w-full">{data.round + "회차"}</span>
                :
                <span className="text-sm truncate w-full">{data.round + "회차: " + data.sentence}</span>
            }
        </a>
    );
}

export default QuizItem;