import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../HomePage.css";

function HomePage() {
    const [userName, setUserName] = useState("User");
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user_name");
        if (storedUser) {
            setUserName(storedUser);
        }
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await axios.get("/notes", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotes(response.data);
        } catch (err) {
            console.error("Error fetching notes", err);
        }
    };

    const handleAddOrUpdateNote = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to add notes!");
            return;
        }

        try {
            if (editingNote) {
                await axios.put(
                    `/notes/${editingNote.id}`,
                    { title, content },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Note updated successfully!");
            } else {
                await axios.post(
                    "/notes",
                    { title, content },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Note added successfully!");
            }

            setShowModal(false);
            setTitle("");
            setContent("");
            setEditingNote(null);
            fetchNotes();
        } catch (err) {
            console.error(err);
            alert("Error saving note");
        }
    };

    const handleDeleteNote = async () => {
        const token = localStorage.getItem("token");
        if (!token || !editingNote) return;

        try {
            await axios.delete(`/notes/${editingNote.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Note deleted successfully!");
            setShowModal(false);
            setEditingNote(null);
            fetchNotes();
        } catch (err) {
            console.error(err);
            alert("Error deleting note");
        }
    };

    const openEditModal = (note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
        setShowModal(true);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear stored data
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_email");

        // Navigate to login and replace history so user cannot go back
        navigate("/", { replace: true });
    };

    return (
        <div className="notes-page">
            <nav className="navbar">
                <div className="logo">Keep Notes</div>
                <ul className="nav-links">
                    <li>About</li>
                    <li>Notes</li>
                    <li>Account</li>
                    <li onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</li>
                </ul>
            </nav>

            <div className="breadcrumb">
                Homepage / <span>Your Notes</span>
            </div>

            <h1 className="greeting">Good Morning {userName}!</h1>

            {/* Notes Grid */}
            <div className="notes-grid">
                {notes.map((note) => (
                    <div
                        className="note-card"
                        key={note.id}
                        onClick={() => openEditModal(note)}
                    >
                        <div className="note-header">
                            <p style={{ margin: "5px" }}>{note.title}</p>
                        </div>
                        <div className="note-content">
                            <p>{note.content}</p>
                        </div>
                        <div className="note-footer">
                            <small>
                                Last Modified:{" "}
                                {new Date(note.last_update).toDateString()}
                            </small>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Add Notes Button */}
            <button
                className="fab"
                onClick={() => {
                    setEditingNote(null);
                    setTitle("");
                    setContent("");
                    setShowModal(true);
                }}
            >
                <img
                    src="/images/edit.png"
                    alt="Add Note"
                    className="fab-icon"
                />
            </button>

            {/* Add/Edit Note Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <span>
                                {editingNote ? editingNote.title : "Add Note"}
                            </span>
                            <button
                                className="close-btn"
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingNote(null);
                                }}
                            >
                                <img
                                    src="/images/close.png"
                                    alt="Close"
                                    className="close-icon"
                                />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="note-input-container">
                                {!editingNote && (
                                    <input
                                        type="text"
                                        className="note-title-input"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                )}

                                <textarea
                                    className="note-content-input"
                                    placeholder="Enter content..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="add-btn"
                                onClick={handleAddOrUpdateNote}
                            >
                                {editingNote ? "Save" : "Add"}
                            </button>
                            {editingNote && (
                                <button
                                    className="delete-btn"
                                    onClick={handleDeleteNote}
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingNote(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default HomePage;
