import { IStudProg } from "../../../interfaces/IStudProg";
import { Modal } from "../../components/Modal";

interface ProgrammeDetailsModalProps {
    programme: IStudProg;
    onClose: () => void;
}

export const ProgrammeDetailsModal = ({ programme, onClose }: ProgrammeDetailsModalProps) => {
    return (
        <Modal visibleModal={!!programme} setVisibleModal={onClose} title="Studij� program� duomenys">
            <div className="p-4">
                <p><strong>Studij� programos pavadinimas:</strong> {programme.progName}</p>
            </div>
        </Modal>
    );
};