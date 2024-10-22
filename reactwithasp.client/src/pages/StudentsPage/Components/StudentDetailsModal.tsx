import { IStudent } from "@/interfaces/IStudent";
import { Modal } from "@/pages/components/Modal";

interface StudentDetailsModalProps {
    student: IStudent;
    onClose: () => void;
}

export const StudentDetailsModal = ({ student, onClose }: StudentDetailsModalProps) => {
    return (
        <Modal visibleModal={!!student} setVisibleModal={onClose} title="Studento duomenys">
            <div className="p-4">
                <p><strong>First Name:</strong> {student.firstName}</p>
                <p><strong>Last Name:</strong> {student.lastName}</p>
                <p><strong>Email:</strong> {student.email}</p>
            </div>
        </Modal>
    );
};