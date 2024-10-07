import { useEffect, useState } from "react"
import { ILecturer } from "../../interfaces/ILecturer";
import { getApi, putApi, postApi,deleteApi } from "../../api";
import { UserIcon, TrashIcon } from '@heroicons/react/24/solid'; 
import { Modal } from "../components/Modal";
import { LecturerDetailsModal } from "./Components/LecturerDetailsModal"
import { LecturerForm } from "./Components/LecturerForm";
import { AddLecturerForm } from "./Components/AddLecturerForm";

export default function Lecturers() {
    const [lecturers, setLecturers] = useState<ILecturer[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [editLecturer, setEditLecturer] = useState<ILecturer | undefined>()
    const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false)
    const [lecturerDetails, setLecturerDetails] = useState<ILecturer | undefined>();

    const getLecturers = () => getApi<ILecturer[]>('lecturers').then(l => l && setLecturers(l))

    const storeLecturer = (lecturer: ILecturer) => {
        setVisibleModal(false)
        if (lecturer.id) {
            putApi(`lecturers/${lecturer.id}`, lecturer).then(r => getLecturers()).then(i => i)
        }
    }
    const saveNewLecturer = (lecturer: ILecturer) => {
        setVisibleAddModal(false);
        postApi('lecturers', lecturer)
            .then(() => getLecturers());
    }
    const editHandler = (lecturer: ILecturer) => {
        setEditLecturer(lecturer)
        setVisibleModal(true)
    }
    const addHandler = () => {
        setVisibleAddModal(true);
    }
    const showDetails = (lecturer: ILecturer) => {
        setLecturerDetails(lecturer);
    }
    const deleteHandler = async (id: number) => {
        if (window.confirm("Ar tikrai norite iðtrinti ðá áraðà?")) {
            try {
                await deleteApi(`lecturers/${id}`, {});

                const updatedLecturers = lecturers.filter(lecturer => lecturer.id !== id);
                setLecturers(updatedLecturers);
                alert("Áraðas sëkmingai iðtrintas.");
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Failed to delete the student:", error.message);
                    alert("Failed to delete the student: " + error.message);
                } else {
                    console.error("Failed to delete the student:", error);
                    alert("Failed to delete the student: An unexpected error occurred.");
                }
            }
        }
    };

    useEffect(() => {
        getLecturers().then(i => i)
    }, []);

    return (
        <div>
            {visibleModal && (
                <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title="Dëstytojø forma">
                    <LecturerForm storeLecturer={storeLecturer} lecturer={editLecturer} />
                </Modal>
            )}
            {visibleAddModal && (
                <Modal visibleModal={visibleAddModal} setVisibleModal={setVisibleAddModal} title="Pridëti naujà dëstytojà">
                    <AddLecturerForm saveNewLecturer={saveNewLecturer} />
                </Modal>
            )}
            {lecturerDetails && (
                <LecturerDetailsModal lecturer={lecturerDetails} onClose={() => setLecturerDetails(undefined)} />
            )}
            <div className="text-3xl mb-4">Lecturers</div>
            <button type="button" onClick={addHandler} className="bg-blue-500 text-white border border-blue-700 rounded-lg py-2 px-4 mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Pridëti naujà</button>
            <div>
                {lecturers.map((lecturer) => (
                    <div key={lecturer.id} className="flex items-center justify-between mb-2">
                        <div style={{ flexGrow: 1 }}>
                            <button type="button" onClick={() => editHandler(lecturer)}>
                                {lecturer.fullName} </button> {lecturer.email}
                        </div>
                        <UserIcon className="h-5 w-5 text-blue-500 cursor-pointer" onClick={() => showDetails(lecturer)} />
                        <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => deleteHandler(lecturer.id)} />
                    </div>))}
            </div>
        </div>
    );
}