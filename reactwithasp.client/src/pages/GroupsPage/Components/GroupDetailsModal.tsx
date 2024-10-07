import { IGroup} from "../../../interfaces/IGroup";
import { Modal } from "../../components/Modal";

interface GroupDetailsModalProps {
    group: IGroup;
    onClose: () => void;
}

export const GroupDetailsModal = ({ group, onClose }: GroupDetailsModalProps) => {
    return (
        <Modal visibleModal={!!group} setVisibleModal={onClose} title="Grupës duomenys">
            <div className="p-4">
                <p><strong>Group Name:</strong> {group.groupName}</p>
            </div>
        </Modal>
    );
};