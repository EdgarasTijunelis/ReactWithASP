import { useForm } from "react-hook-form";
import { ILecturer } from "../../../interfaces/ILecturer";
import { formStyle } from "../../../styles/formStyle";

interface AddLecturerFormProps {
    saveNewLecturer: (lecturer: ILecturer) => void;
}

export function AddLecturerForm({ saveNewLecturer }: AddLecturerFormProps) {
    const { register, handleSubmit, reset } = useForm<ILecturer>({
        defaultValues: { fullName: "", email: "" }
    });

    const onSubmit = (data: ILecturer) => {
        saveNewLecturer(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div>
                <label htmlFor="fullName" className={formStyle.label}>Vardas Pavardë</label>
                <input
                    id="fullName"
                    className={formStyle.input}
                    {...register("fullName", { required: true, maxLength: 30 })}
                />
            </div>
            <div>
                <label htmlFor="email" className={formStyle.label}>Email</label>
                <input
                    id="email"
                    className={formStyle.input}
                    type="email"
                    {...register("email", { required: true })}
                />
            </div>
            <button className={formStyle.button} type="submit">Iðsaugoti</button>
        </form>
    );
}