import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); //getting rid of the default nav behaviour
    if (!window.confirm("Are you sure you want to delete this note ?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted Successfully");
      setNotes((prev) => prev.filter(note => note._id !== id))
    } catch (error) {
      console.log("Error in handle delete", error);
      toast.error("Failed to delete the Note");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 transition-all duration-200 border-2 border-solid m-2 border-[#404040] hover:shadow-lg"
    >
      <div className="card-body hover:bg-[#2c3242]">
        <h2 className="card-title text-base-content">{note.title}</h2>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="justify-between card-actions mt-4 items-center">
          <span className="text-sm text-base-content/45">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
