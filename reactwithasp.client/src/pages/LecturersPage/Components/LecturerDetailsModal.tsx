import { ILecturer } from "../../../interfaces/ILecturer";
import { Modal } from "../../components/Modal";

interface LecturerDetailsModalProps {
    lecturer: ILecturer;
    onClose: () => void;
}

export const LecturerDetailsModal = ({ lecturer, onClose }: LecturerDetailsModalProps) => {
    return (
        <Modal visibleModal={!!lecturer} setVisibleModal={onClose} title="Dëstytojo duomenys">
            <div className="p-4">
                <p><strong>Full Name:</strong> {lecturer.fullName}</p>
                <p><strong>Email:</strong> {lecturer.email}</p>
            </div>
        </Modal>
    );
};