export function getAllNotes(req, res) {
  res.status(200).json("Got all notes");
}
export function getNote(req, res) {
  res.status(200).json("Got a note");
}

export function createNote(req, res) {
  res.status(200).json("Note Created Successfully");
}

export function updateNote(req, res) {
  res.status(200).json("Note Updated Successfully");
}
export function deleteNote(req, res) {
  res.status(200).json("Note Updated Successfully");
}
