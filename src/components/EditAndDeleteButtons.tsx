import { TranslationRow } from "../types/TranslationRow";

interface EditAndDeleteButtonsProps {
  handleOnEdit: Function;
  translation: TranslationRow;
}

export default function EditAndDeleteButtons({
  handleOnEdit,
  translation,
}: EditAndDeleteButtonsProps) {
  return (
    <div id="edit-delete-buttons">
      <button
        onClick={(e) => handleOnEdit(e, translation)}
        className="card-edit-btn"
      >
        Edit
      </button>
      {/* <button
        onClick={(e) => onHandleDelete(e, translation.id)}
        className="card-delete-btn"
      >
        Delete
      </button>{" "} */}
    </div>
  );
}
