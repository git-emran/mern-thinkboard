export function getAllNotes(req, res) {
  res.status(200).send("Got all notes");
}
export function getNote(req, res) {
  res.status(200).send("Got a note");
}

export function createNote(req, res) {
  res.status(200).send("Note Created Successfully");
}

export function updateNote(req, res) {
  res.status(200).send("Note Updated Successfully");
}
