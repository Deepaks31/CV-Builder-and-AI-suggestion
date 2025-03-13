import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeEditor = () => {
  const { id } = useParams(); // Get template ID from URL
  const [templateHtml, setTemplateHtml] = useState("");

  useEffect(() => {
    // Load the template dynamically based on ID
    fetch(`/assets/template${id}.html`)
      .then((res) => res.text())
      .then((html) => setTemplateHtml(html))
      .catch((err) => console.error("Error loading template:", err));
  }, [id]);

  const handleSaveAsPDF = async () => {
    const input = document.getElementById("resume-content");

    // Create a new A4 size PDF (210mm x 297mm)
    const pdf = new jsPDF.default("p", "mm", "a4");
    const canvas = await html2canvas(input, {
      scale: 2, // Higher scale for better rendering
      useCORS: true, // Handle cross-origin images
    });

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("edited-resume.pdf");
  };

  return (
    <div style={styles.editorContainer}>
      {/* Editable Resume Template */}
      <div
        id="resume-content"
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: templateHtml }}
        style={styles.templateContainer}
      />

      {/* Save Button */}
      <button onClick={handleSaveAsPDF} style={styles.saveButton}>
        Save as PDF
      </button>
    </div>
  );
};

// Styling
const styles = {
  editorContainer: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh", // Ensures full-page scrolling
  },
  templateContainer: {
    width: "1000px", // A4 width at 96 DPI
    minHeight: "1123px", // Minimum A4 height at 96 DPI (will expand if content grows)
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fff",
    boxSizing: "border-box",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  saveButton: {
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
};

export default ResumeEditor;
