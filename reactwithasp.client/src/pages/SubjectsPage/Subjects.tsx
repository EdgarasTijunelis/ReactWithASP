import { useEffect, useState } from "react"
import { ISubject } from "../../interfaces/ISubject";
import { getApi, putApi, postApi, deleteApi } from "../../api";
import { UserIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Modal } from "../components/Modal";
import { SubjectDetailsModal } from "./Components/SubjectDetailsModal"
import { SubjectForm } from "./Components/SubjectForm";
import { AddSubjectForm } from "./Components/AddSubjectForm";

export default function Subjects() {
    const [subjects, setSubjects] = useState<ISubject[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [editSubject, setEditSubject] = useState<ISubject | undefined>()
    const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false)
    const [subjectDetails, setSubjectDetails] = useState<ISubject | undefined>();

    const getSubjects = () => getApi<ISubject[]>('subjects').then(l => l && setSubjects(l))

    const storeSubject = (subject: ISubject) => {
        setVisibleModal(false)
        if (subject.id) {
            putApi(`subjects/${subject.id}`, subject).then(r => getSubjects()).then(i => i)
        }
    }
    const saveNewSubject= (subject: ISubject) => {
        setVisibleAddModal(false);
        postApi('subjects', subject)
            .then(() => getSubjects());
    }
    const editHandler = (subject: ISubject) => {
        setEditSubject(subject)
        setVisibleModal(true)
    }
    const addHandler = () => {
        setVisibleAddModal(true);
    }
    const showDetails = (subject: ISubject) => {
        setSubjectDetails(subject);
    }
    const deleteHandler = async (id: number) => {
        if (window.confirm("Ar tikrai norite iðtrinti ðá áraðà?")) {
            try {
                await deleteApi(`subjects/${id}`, {});

                const updatedSubjects = subjects.filter(subject => subject.id !== id);
                setSubjects(updatedSubjects);
                alert("Áraðas sëkmingai iðtrintas.");
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Failed to delete the subject:", error.message);
                    alert("Failed to delete the subject: " + error.message);
                } else {
                    console.error("Failed to delete the subject:", error);
                    alert("Failed to delete the subject: An unexpected error occurred.");
                }
            }
        }
    };

    useEffect(() => {
        getSubjects().then(i => i)
    }, []);

    return (
        <div>
            {visibleModal && (
                <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title="Dalykø forma">
                    <SubjectForm storeSubject={storeSubject} subject={editSubject} />
                </Modal>
            )}
            {visibleAddModal && (
                <Modal visibleModal={visibleAddModal} setVisibleModal={setVisibleAddModal} title="Pridëti naujà dalykà">
                    <AddSubjectForm saveNewSubject={saveNewSubject} />
                </Modal>
            )}
            {subjectDetails && (
                <SubjectDetailsModal subject={subjectDetails} onClose={() => setSubjectDetails(undefined)} />
            )}
            <div className="text-3xl mb-4">Subjects</div>
            <button type="button" onClick={addHandler} className="bg-blue-500 text-white border border-blue-700 rounded-lg py-2 px-4 mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Pridëti naujà</button>
            <div>
                {subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center justify-between mb-2">
                        <div style={{ flexGrow: 1 }}>
                            <button type="button" onClick={() => editHandler(subject)}>
                                {subject.subjName} </button>
                        </div>
                        <UserIcon className="h-5 w-5 text-blue-500 cursor-pointer" onClick={() => showDetails(subject)} />
                        <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => deleteHandler(subject.id)} />
                    </div>))}
            </div>
        </div>
    );
}