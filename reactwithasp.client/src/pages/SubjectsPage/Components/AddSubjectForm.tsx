import { useForm } from "react-hook-form";
import { ISubject } from "../../../interfaces/ISubject";
import { formStyle } from "../../../styles/formStyle";

interface AddSubjectFormProps {
    saveNewSubject: (subject: ISubject) => void;
}

export function AddSubjectForm({ saveNewSubject }: AddSubjectFormProps) {
    const { register, handleSubmit, reset } = useForm<ISubject>({
        defaultValues: { subjName: "" }
    });

    const onSubmit = (data: ISubject) => {
        saveNewSubject(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div>
                <label htmlFor="subjName" className={formStyle.label}>Dalyko pavadinimas</label>
                <input
                    id="subjName"
                    className={formStyle.input}
                    {...register("subjName", { required: true, maxLength: 30 })}
                />
            </div>
            <button className={formStyle.button} type="submit">Iðsaugoti</button>
        </form>
    );
}