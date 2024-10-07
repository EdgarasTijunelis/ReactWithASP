import { useForm } from "react-hook-form"
import { IGroup } from "../../../interfaces/IGroup";
import { useEffect } from "react";
import { formStyle } from "../../../styles/formStyle";

type GroupFormProps = { group: IGroup | undefined; storeGroup: (data: IGroup) => void }

export function GroupForm(props: GroupFormProps) {
    const { group, storeGroup } = props
    const { register, handleSubmit, reset } = useForm<IGroup>({ defaultValues: group })

    useEffect(() => {
        reset(group);
    }, [group, reset])

    return (
        <form onSubmit={handleSubmit(storeGroup)} className='flex flex-col gap-3'>
            <input type="hidden" {...register("id")} />
            <div>
                <label htmlFor="groupName" className={formStyle.label}>Grupës pavadinimas</label>
                <input id="groupName" className={formStyle.input} {...register("groupName", { required: true, maxLength: 30 })} defaultValue={group?.groupName || ''} />
            </div>
            <button className={formStyle.button} type="submit">Atnaujinti</button>
        </form>
    )
}