import { useForm } from "react-hook-form"
import { ISubject } from "../../../interfaces/ISubject";
import { useEffect } from "react";
import { formStyle } from "../../../styles/formStyle";

type SubjectFormProps = { subject: ISubject | undefined; storeSubject: (data: ISubject) => void }

export function SubjectForm(props: SubjectFormProps) {
    const { subject, storeSubject } = props
    const { register, handleSubmit, reset } = useForm<ISubject>({ defaultValues: subject })

    useEffect(() => {
        reset(subject);
    }, [subject, reset])

    return (
        <form onSubmit={handleSubmit(storeSubject)} className='flex flex-col gap-3'>
            <input type="hidden" {...register("id")} />
            <div>
                <label htmlFor="subjName" className={formStyle.label}>Dalyko pavadinimas</label>
                <input id="subjName" className={formStyle.input} {...register("subjName", { required: true, maxLength: 30 })} defaultValue={subject?.subjName || ''} />
            </div>
            <button className={formStyle.button} type="submit">Atnaujinti</button>
        </form>
    )
}