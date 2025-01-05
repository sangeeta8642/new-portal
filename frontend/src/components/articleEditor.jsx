import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const CreateArticle = () => {
    const [content, setContent] = useState("");

    const handleEditorChange = (content) => {
        setContent(content);
    };

    const handleSubmit = () => {
        // Logic to submit the article to the backend
        console.log("Article Content: ", content);
    };

    return (
        <div>
            <h1>Create Article</h1>
            <Editor
                apiKey={`${import.meta.env.VITE_TINYMCE_API_KEY}`} // Replace with your TinyMCE API key if needed
                initialValue="<p>Start writing your article here...</p>"
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        "advlist autolink lists link image charmap preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                        "image media"
                    ],
                    toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | \
            image media | link",
                    automatic_uploads: true,
                    file_picker_callback: (callback, value, meta) => {
                        if (meta.filetype === "image") {
                            const input = document.createElement("input");
                            input.setAttribute("type", "file");
                            input.setAttribute("accept", "image/*");
                            input.onchange = async function () {
                                const file = this.files[0];
                                const reader = new FileReader();
                                reader.onload = function () {
                                    callback(reader.result, {
                                        alt: file.name,
                                    });
                                };
                                reader.readAsDataURL(file);
                            };
                            input.click();
                        }
                    },
                }}
                onEditorChange={handleEditorChange}
            />

            <button onClick={handleSubmit}>Submit Article</button>
        </div>
    );
};

export default CreateArticle;
