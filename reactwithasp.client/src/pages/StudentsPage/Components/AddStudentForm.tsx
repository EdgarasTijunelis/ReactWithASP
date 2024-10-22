import { useForm } from "react-hook-form";
import { IStudent } from "@/interfaces/IStudent";
import { formStyle } from "@/styles/formStyle";

interface AddStudentFormProps {
    saveNewStudent: (student: IStudent) => void;
}

export function AddStudentForm({ saveNewStudent }: AddStudentFormProps) {
    const { register, handleSubmit, reset } = useForm<IStudent>({
        defaultValues: { firstName: "", lastName: "", email: "" }
    });

    const onSubmit = (data: IStudent) => {
        saveNewStudent(data);
        reset(); 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div>
                <label htmlFor="firstName" className={formStyle.label}>Vardas</label>
                <input
                    id="firstName"
                    className={formStyle.input}
                    {...register("firstName", { required: true, maxLength: 20 })}
                />
            </div>
            <div>
                <label htmlFor="lastName" className={formStyle.label}>Pavardë</label>
                <input
                    id="lastName"
                    className={formStyle.input}
                    {...register("lastName", { required: true, maxLength: 20 })}
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