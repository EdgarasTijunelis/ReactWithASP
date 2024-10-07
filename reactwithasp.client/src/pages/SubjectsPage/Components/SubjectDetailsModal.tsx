import { ISubject } from "../../../interfaces/ISubject";
import { Modal } from "../../components/Modal";

interface SubjectDetailsModalProps {
    subject: ISubject;
    onClose: () => void;
}

export const SubjectDetailsModal = ({ subject, onClose }: SubjectDetailsModalProps) => {
    return (
        <Modal visibleModal={!!subject} setVisibleModal={onClose} title="Dalyko duomenys">
            <div className="p-4">
                <p><strong>Dalyko pavadinimas:</strong> {subject.subjName}</p>
            </div>
        </Modal>
    );
};