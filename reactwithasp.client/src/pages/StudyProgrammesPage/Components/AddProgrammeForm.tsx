import { useForm } from "react-hook-form";
import { IStudProg } from "../../../interfaces/IStudProg";
import { formStyle } from "../../../styles/formStyle";

interface AddProgrammeFormProps {
    saveNewProgramme: (programme: IStudProg) => void;
}

export function AddProgrammeForm({ saveNewProgramme }: AddProgrammeFormProps) {
    const { register, handleSubmit, reset } = useForm<IStudProg>({
        defaultValues: { progName: "" }
    });

    const onSubmit = (data: IStudProg) => {
        saveNewProgramme(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div>
                <label htmlFor="progName" className={formStyle.label}>Studijø programos pavadinimas</label>
                <input
                    id="progName"
                    className={formStyle.input}
                    {...register("progName", { required: true, maxLength: 50 })}
                />
            </div>
            <button className={formStyle.button} type="submit">Iðsaugoti</button>
        </form>
    );
}