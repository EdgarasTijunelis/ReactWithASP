import { useEffect, useState } from "react"
import { IStudent } from "@/interfaces/IStudent";
import { getApi, putApi, postApi,deleteApi } from "@/api";
import { Modal } from "@/pages/components/Modal";
import { StudentDetailsModal } from "@/pages/StudentsPage/Components/StudentDetailsModal"
import { StudentForm } from "@/pages/StudentsPage/Components/StudentForm";
import { AddStudentForm } from "@/pages/StudentsPage/Components/AddStudentForm";
import { UserIcon,TrashIcon } from '@heroicons/react/24/solid'; 


export default function Students() {
    const [students, setStudents] = useState<IStudent[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [editStudent, setEditStudent] = useState<IStudent | undefined>()
    const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false)
    const [studentDetails, setStudentDetails] = useState<IStudent | undefined>();

    const getStudents = () => getApi<IStudent[]>('students').then( s => s && setStudents(s))

    const storeStudent = (student: IStudent) => {
        setVisibleModal(false)
        if (student.id) {
            putApi(`students/${student.id}`, student).then(r => getStudents()).then(i => i)
        }
    }
    const saveNewStudent = (student: IStudent) => {
        setVisibleAddModal(false);
        postApi('students', student)
            .then(() => getStudents());
    }
    const editHandler = (student: IStudent) => {
        setEditStudent(student)
        setVisibleModal(true)
    }
    const addHandler = () => {
        setVisibleAddModal(true);
    }
    const showDetails = (student: IStudent) => {
        setStudentDetails(student);
    }
    const deleteHandler = async (id:number) => {
        if (window.confirm("Ar tikrai norite ištrinti šį įrašą?")) {
            try {
                await deleteApi(`students/${id}`, {}); 

                const updatedStudents = students.filter(student => student.id !== id);
                setStudents(updatedStudents);
                alert("Įrašas sėkmingai ištrintas.");
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
        getStudents().then( i=>i)
    }, []);

        return (
        <div>
            {visibleModal && (
                <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title="Studentų forma">
                    <StudentForm storeStudent={storeStudent} student={editStudent} />
                </Modal>
            )}
            {visibleAddModal && (
                <Modal visibleModal={visibleAddModal} setVisibleModal={setVisibleAddModal} title="Pridėti naują studentą">
                    <AddStudentForm saveNewStudent={saveNewStudent} />
                </Modal>
            )}
            {studentDetails && (
                <StudentDetailsModal student={studentDetails} onClose={() => setStudentDetails(undefined)} />
            )}
            <div className="text-3xl mb-4">Students</div>
            <button type="button" onClick={addHandler} className="bg-blue-500 text-white border border-blue-700 rounded-lg py-2 px-4 mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Pridėti naują</button>
            <div>
                {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between mb-2">
                        <div style={{ flexGrow: 1 }}>
                            <button type="button" onClick={() => editHandler(student)}>
                                {student.firstName} {student.lastName} </button>{student.email}
                        </div>
                        <UserIcon className="h-5 w-5 text-blue-500 cursor-pointer" onClick={() => showDetails(student)} />
                        <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => deleteHandler(student.id)} />
                    </div>))}
            </div>
        </div>     
        );
}