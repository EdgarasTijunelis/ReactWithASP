import { useEffect, useState } from "react"
import { IStudent } from "../../interfaces/IStudent";
import { getApi, putApi, postApi } from "../../api";
import { Modal } from "../components/Modal";
import { StudentDetailsModal } from "../components/StudentDetailsModal"
import { StudentForm } from "./Components/StudentForm";
import { AddStudentForm } from "./Components/AddStudentForm";
import { UserIcon } from '@heroicons/react/24/solid'; 


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

    useEffect(() => {
        getStudents().then( i=>i)
    }, []);

    return (
        <div>
            {visibleModal && (
                <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} title="Studentø forma">
                    <StudentForm storeStudent={storeStudent} student={editStudent} />
                </Modal>
            )}
            {visibleAddModal && (
                <Modal visibleModal={visibleAddModal} setVisibleModal={setVisibleAddModal} title="Pridëti naujà studentà">
                    <AddStudentForm saveNewStudent={saveNewStudent} />
                </Modal>
            )}
            {studentDetails && (
                <StudentDetailsModal student={studentDetails} onClose={() => setStudentDetails(undefined)}/>
            )}
            <div className="text-3xl mb-4">Students</div>
            <button type="button" onClick={addHandler} className="bg-blue-500 text-white border border-blue-700 rounded-lg py-2 px-4 mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Pridëti naujà</button>
            <div>
                {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between mb-2">
                        <div>
                            <button type="button" onClick={() => editHandler(student)}>
                                {student.firstName} {student.lastName}</button>{student.email}
                        </div>
                        <UserIcon className="h-5 w-5 text-blue-500 cursor-pointer" onClick={() => showDetails(student)}/>
                    </div>
                ))}
            </div>
        </div>
    );
}