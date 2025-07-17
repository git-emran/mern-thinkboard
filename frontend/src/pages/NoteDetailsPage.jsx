import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Link, LoaderIcon, TrashIcon } from "lucide-react";
const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error in Fetching Notes", error);
        toast.error("Failed to Fetch notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting the note", error);
      toast.error("Failed to delete the note");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);
    navigate("/");
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note saved Successfully");
    } catch (error) {
      console.error("Error saving notes", error);
      toast.error("Error: Could not save the notes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10" />
    </div>;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-2" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <TrashIcon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          {/* card */}
          {note && (
            <div className="card bg-base-100">
              <div className="card-body">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Title</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Your Note Title"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                  <textarea
                    type="text"
                    className="input h-20 p-2 w-full"
                    placeholder="Write your Content here"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </fieldset>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
