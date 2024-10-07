import { useEffect, useState } from "react"
import { IGroup } from "../../interfaces/IGroup";
import { getApi, putApi, postApi, deleteApi } from "../../api";
import { UserIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Modal } from "../components/Modal";
import { GroupDetailsModal } from "./Components/GroupDetailsModal"
import { GroupForm } from "./Components/GroupForm";
import { AddGroupForm } from "./Components/AddGroupForm";

export default function Groups() {
    const [groups, setGroups] = useState<IGroup[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [editGroup, setEditGroup] = useState<IGroup | undefined>()
    const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false)
    const [groupDetails, setGroupDetails] = useState<IGroup| undefined>();

    const getGroups = () => getApi<IGroup[]>('groups').then(l => l && setGroups(l))

    const storeGroup = (group: IGroup) => {
        setVisibleModal(false)
        if (group.id) {
            putApi(`groups/${group.id}`, group).then(r => getGroups()).then(i => i)
        }
    }
    const saveNewGroup = (group: IGroup) => {
        setVisibleAddModal(false);
        postApi('groups', group)
            .then(() => getGroups());
    }
    const editHandler = (group: IGroup) => {
        setEditGroup(group)
        setVisibleModal(true)
    }
    const addHandler = () => {
        setVisibleAddModal(true);
    }
    const showDetails = (group: IGroup) => {
        setGroupDetails(group);
    }
    const deleteHandler = async (id: number) => {
        if (window.confirm("Ar tikrai norite iðtrinti ðá áraðà?")) {
            try {
                await deleteApi(`groups/${id}`, {});

                const updatedGroups = groups.filter(group => group.id !== id);
                setGroups(updatedGroups);
                alert("Áraðas sëkmingai iðtrintas.");
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Failed to delete the gruop:", error.message);
                    alert("Failed to delete the group: " + error.message);
                } else {
                    console.error("Failed to delete the group:", error);
                    alert("Failed to delete the group: An unexpected error occurred.");
                }
            }
        }
    };

    useEffect(() => {
        getGroups().then(i => i)
    }, []);

    return (
        <div>
            {visibleModal && (
                <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title="Grupiø forma">
                    <GroupForm storeGroup={storeGroup} group={editGroup} />
                </Modal>
            )}
            {visibleAddModal && (
                <Modal visibleModal={visibleAddModal} setVisibleModal={setVisibleAddModal} title="Pridëti naujà grupæ">
                    <AddGroupForm saveNewGroup={saveNewGroup} />
                </Modal>
            )}
            {groupDetails && (
                <GroupDetailsModal group={groupDetails} onClose={() => setGroupDetails(undefined)} />
            )}
            <div className="text-3xl mb-4">Groups</div>
            <button type="button" onClick={addHandler} className="bg-blue-500 text-white border border-blue-700 rounded-lg py-2 px-4 mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Pridëti naujà</button>
            <div>
                {groups.map((group) => (
                    <div key={group.id} className="flex items-center justify-between mb-2">
                        <div style={{ flexGrow: 1 }}>
                            <button type="button" onClick={() => editHandler(group)}>
                                {group.groupName} </button>
                        </div>
                        <UserIcon className="h-5 w-5 text-blue-500 cursor-pointer" onClick={() => showDetails(group)} />
                        <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => deleteHandler(group.id)} />
                    </div>))}
            </div>
        </div>
    );
}