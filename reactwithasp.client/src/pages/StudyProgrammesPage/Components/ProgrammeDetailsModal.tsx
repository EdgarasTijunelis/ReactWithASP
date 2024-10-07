import { IStudProg } from "../../../interfaces/IStudProg";
import { Modal } from "../../components/Modal";

interface ProgrammeDetailsModalProps {
    programme: IStudProg;
    onClose: () => void;
}

export const ProgrammeDetailsModal = ({ programme, onClose }: ProgrammeDetailsModalProps) => {
    return (
        <Modal visibleModal={!!programme} setVisibleModal={onClose} title="Studijø programø duomenys">
            <div className="p-4">
                <p><strong>Studijø programos pavadinimas:</strong> {programme.progName}</p>
            </div>
        </Modal>
    );
};