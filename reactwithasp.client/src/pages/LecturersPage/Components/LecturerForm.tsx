import { useForm } from "react-hook-form"
import { ILecturer } from "../../../interfaces/ILecturer";
import { useEffect } from "react";
import { formStyle } from "../../../styles/formStyle";

type LecturerFormProps = { lecturer: ILecturer | undefined; storeLecturer: (data: ILecturer) => void }

export function LecturerForm(props: LecturerFormProps) {
    const { lecturer, storeLecturer } = props
    const { register, handleSubmit, reset } = useForm<ILecturer>({ defaultValues: lecturer })

    useEffect(() => {
        reset(lecturer);
    }, [lecturer, reset])

    return (
        <form onSubmit={handleSubmit(storeLecturer)} className='flex flex-col gap-3'>
            <input type="hidden" {...register("id")} />
            <div>
                <label htmlFor="fullName" className={formStyle.label}>Vardas Pavardë</label>
                <input id="fullName" className={formStyle.input} {...register("fullName", { required: true, maxLength: 30 })} defaultValue={lecturer?.fullName || ''} />
            </div>
            <div>
                <label htmlFor="email" className={formStyle.label}>El. paðtas</label>
                <input id="email" className={formStyle.input} type="email" {...register("email")} defaultValue={lecturer?.email || ''} />
            </div>
            <button className={formStyle.button} type="submit">Atnaujinti</button>
        </form>
    )
}