import { useEffect, useState } from "react"
import { IStudProg} from "../../interfaces/IStudProg";
import { getApi, putApi, postApi, deleteApi } from "../../api";
import { UserIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Modal } from "../components/Modal";
import { ProgrammeDetailsModal } from "./Components/ProgrammeDetailsModal"
import { ProgrammeForm } from "./Components/ProgrammeForm";
import { AddProgrammeForm } from "./Components/AddProgrammeForm";

export default function Programmes() {
    const [programmes, setProgrammes] = useState<IStudProg[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [editProgramme, setEditProgramme] = useState<IStudProg | undefined>()
    const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false)
    const [programmeDetails, setProgrammeDetails] = useState<IStudProg | undefined>();

    const getProgrammes = () => getApi<IStudProg[]>('StudyProgrammes').then(l => l && setProgrammes(l))

    const storeProgramme = (programme: IStudProg) => {
        setVisibleModal(false)
        if (programme.id) {
            putApi(`StudyProgrammes/${programme.id}`, programme).then(r => getProgrammes()).then(i => i)
        }
    }
    const saveNewProgramme = (programme: IStudProg) => {
        setVisibleAddModal(false);
        postApi('StudyProgrammes', programme)
            .then(() => getProgrammes());
    }
    const editHandler = (programme: IStudProg) => {
        setEditProgramme(programme)
        setVisibleModal(true)
    }
    const addHandler = () => {
        setVisibleAddModal(true);
    }
    const showDetails = (programme: IStudProg) => {
        setProgrammeDetails(programme);
    }
    const deleteHandler = async (id: number) => {
        if (window.confirm("Ar tikrai norite iðtrinti ðià studijø programà?")) {
            try {
                await deleteApi(`StudyProgrammes/${id}`, {});

                const updatedProgrammes = programmes.filter(programme => programme.id !== id);
                setProgrammes(updatedProgrammes);
                alert("Áraðas sëkmingai iðtrintas.");
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Failed to delete the study programme:", error.message);
                    alert("Failed to delete the study programme: " + error.message);
                } else {
                    console.error("Failed to delete the study programme:", error);
                    alert("Failed to delete the study programme: An unexpected error occurred.");
                }
            }
        }
    };

    useEffect(() => {
        getProgrammes().then(i => i)
    }, []);

    return (
        <div>
            {visibleModal && (
                <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title="Studijø programø forma">
                    <ProgrammeForm storeProgramme={storeProgramme} programme={editProgramme} />
                </Modal>
            )}
            {visibleAddModal && (
                <Modal visibleModal={visibleAddModal} setVisibleModal={setVisibleAddModal} title="Pridëti naujà studijø programà">
                    <AddProgrammeForm saveNewProgramme={saveNewProgramme} />
                </Modal>
            )}
            {programmeDetails && (
                <ProgrammeDetailsModal programme={programmeDetails} onClose={() => setProgrammeDetails(undefined)} />
            )}
            <div className="text-3xl mb-4">Study Programmes</div>
            <button type="button" onClick={addHandler} className="bg-blue-500 text-white border border-blue-700 rounded-lg py-2 px-4 mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Pridëti naujà</button>
            <div>
                {programmes.map((programme) => (
                    <div key={programme.id} className="flex items-center justify-between mb-2">
                        <div style={{ flexGrow: 1 }}>
                            <button type="button" onClick={() => editHandler(programme)}>
                                {programme.progName} </button>
                        </div>
                        <UserIcon className="h-5 w-5 text-blue-500 cursor-pointer" onClick={() => showDetails(programme)} />
                        <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => deleteHandler(programme.id)} />
                    </div>))}
            </div>
        </div>
    );
}