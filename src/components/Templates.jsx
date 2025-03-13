import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/templates.css';

const templates = [
  { id: 1, name: 'Professional Resume', image: '/assets/template1.png' },
  { id: 2, name: 'Creative Resume', image: '/assets/template2.png' },
  { id: 3, name: 'Minimal Resume', image: '/assets/template3.png' },
  { id: 4, name: 'Corporate Resume', image: '/assets/template4.png' },
  { id: 5, name: 'Modern Resume', image: '/assets/template5.png' },
  { id: 6, name: 'Executive Resume', image: '/assets/template6.png' },
];

const Templates = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (id) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div className="templates-container">
      <h2>Select a Resume Template</h2>
      <div className="templates-list">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => handleSelectTemplate(template.id)}
          >
            <img src={template.image} alt={template.name} />
            <div className="template-name">{template.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
// import React from 'react';