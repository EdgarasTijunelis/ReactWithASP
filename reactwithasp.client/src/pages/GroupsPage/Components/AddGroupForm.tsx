import { useForm } from "react-hook-form";
import { IGroup } from "../../../interfaces/IGroup";
import { formStyle } from "../../../styles/formStyle";

interface AddGroupFormProps {
    saveNewGroup: (group: IGroup) => void;
}

export function AddGroupForm({ saveNewGroup }: AddGroupFormProps) {
    const { register, handleSubmit, reset } = useForm<IGroup>({
        defaultValues: { groupName: "" }
    });

    const onSubmit = (data: IGroup) => {
        saveNewGroup(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div>
                <label htmlFor="groupName" className={formStyle.label}>Grupës pavadinimas</label>
                <input
                    id="groupName"
                    className={formStyle.input}
                    {...register("groupName", { required: true, maxLength: 30 })}
                />
            </div>
            <button className={formStyle.button} type="submit">Iðsaugoti</button>
        </form>
    );
}