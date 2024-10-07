import { useForm } from "react-hook-form"
import { IStudProg } from "../../../interfaces/IStudProg";
import { useEffect } from "react";
import { formStyle } from "../../../styles/formStyle";

type ProgrammeFormProps = { programme: IStudProg | undefined; storeProgramme: (data: IStudProg) => void }

export function ProgrammeForm(props: ProgrammeFormProps) {
    const { programme, storeProgramme } = props
    const { register, handleSubmit, reset } = useForm<IStudProg>({ defaultValues: programme })

    useEffect(() => {
        reset(programme);
    }, [programme, reset])

    return (
        <form onSubmit={handleSubmit(storeProgramme)} className='flex flex-col gap-3'>
            <input type="hidden" {...register("id")} />
            <div>
                <label htmlFor="progName" className={formStyle.label}>Studijø programos pavadinimas</label>
                <input id="progName" className={formStyle.input} {...register("progName", { required: true, maxLength: 50 })} defaultValue={programme?.progName || ''} />
            </div>
            <button className={formStyle.button} type="submit">Atnaujinti</button>
        </form>
    )
}