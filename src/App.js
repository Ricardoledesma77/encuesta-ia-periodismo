import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, RotateCcw } from 'lucide-react';

export default function EncuestaCyberperiodismo() {
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({
    perfil: {},
    uso_ia: {},
    tareas: {},
    criterios: {},
    percepciones: {},
    formacion: {},
    futuro: {}
  });
  const [submitted, setSubmitted] = useState(false);

  // Cargar datos guardados del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('encuesta_cyberperiodismo');
    if (saved) {
      setResponses(JSON.parse(saved));
    }
  }, []);

  // Guardar automáticamente
  useEffect(() => {
    localStorage.setItem('encuesta_cyberperiodismo', JSON.stringify(responses));
  }, [responses]);

  const sections = [
    {
      title: "Perfil Profesional",
      subtitle: "Cuéntanos sobre vos",
      questions: [
        { id: 'edad', label: 'Edad', type: 'select', options: ['18-25', '26-30', '31-40', '40+'] },
        { id: 'genero', label: 'Género', type: 'select', options: ['Masculino', 'Femenino', 'No binario', 'Prefiero no decir'] },
        { id: 'egreso', label: '¿Año de egreso o cursada?', type: 'number' },
        { id: 'especialidad', label: 'Especialidad/área de periodismo', type: 'text' }
      ]
    },
    {
      title: "Uso de IA en Periodismo",
      subtitle: "¿Cómo utilizás herramientas de IA?",
      questions: [
        { id: 'frecuencia', label: 'Frecuencia de uso de IA', type: 'select', options: ['Diariamente', 'Varias veces por semana', 'Semanalmente', 'Ocasionalmente', 'Nunca'] },
        { id: 'herramientas', label: 'Herramientas que utilizás (marca todas las que apliquen)', type: 'checkbox', options: ['ChatGPT', 'Gemini', 'Claude', 'Copilot', 'Otras', 'Ninguna'] },
        { id: 'conocimiento', label: 'Nivel de conocimiento en IA', type: 'select', options: ['Básico', 'Intermedio', 'Avanzado', 'Experto'] }
      ]
    },
    {
      title: "Tareas Periodísticas",
      subtitle: "¿En qué tareas aplicás IA?",
      questions: [
        { id: 'tareas', label: 'Selecciona todas las tareas donde utilizás IA', type: 'checkbox', options: ['Investigación', 'Redacción', 'Análisis de datos', 'Verificación', 'Generación de headlines', 'Edición', 'Otro'] },
        { id: 'confianza_tareas', label: '¿Qué tan confiable es usar IA en estas tareas?', type: 'select', options: ['Muy confiable', 'Confiable', 'Moderadamente confiable', 'Poco confiable', 'Nada confiable'] }
      ]
    },
    {
      title: "Criterios Éticos",
      subtitle: "¿Cómo evaluás la ética en IA periodística?",
      questions: [
        { id: 'transparencia', label: 'Importancia de declarar el uso de IA', type: 'select', options: ['Crítico', 'Muy importante', 'Importante', 'Poco importante', 'Innecesario'] },
        { id: 'sesgos', label: 'Preocupación por sesgos en IA', type: 'select', options: ['Muy preocupado', 'Preocupado', 'Neutral', 'Poco preocupado', 'No me preocupa'] },
        { id: 'privacidad', label: 'Datos personales en prompts de IA', type: 'select', options: ['Nunca', 'Rara vez', 'A veces', 'Frecuentemente', 'Siempre'] }
      ]
    },
    {
      title: "Percepciones sobre IA",
      subtitle: "¿Cómo ves el futuro de IA en periodismo?",
      questions: [
        { id: 'impacto', label: 'Impacto general de IA en periodismo', type: 'select', options: ['Muy positivo', 'Positivo', 'Neutral', 'Negativo', 'Muy negativo'] },
        { id: 'amenaza', label: '¿La IA representa una amenaza para periodistas?', type: 'select', options: ['Sí, definitivamente', 'Probablemente', 'Neutral', 'Probablemente no', 'No en absoluto'] },
        { id: 'oportunidad', label: 'Oportunidades que ve en IA', type: 'textarea', placeholder: 'Comparte tu perspectiva...' }
      ]
    },
    {
      title: "Formación y Conocimiento",
      subtitle: "Tu experiencia educativa con IA",
      questions: [
        { id: 'capacitacion', label: '¿Recibiste capacitación formal en IA?', type: 'select', options: ['Sí, en la universidad', 'Sí, autodidacta', 'Sí, en cursos externos', 'No'] },
        { id: 'necesidad', label: 'Necesidad de más formación en IA ética', type: 'select', options: ['Muy necesario', 'Necesario', 'Moderadamente necesario', 'Poco necesario', 'No es necesario'] }
      ]
    },
    {
      title: "Visión Futura",
      subtitle: "Pensamientos finales",
      questions: [
        { id: 'vision', label: '¿Qué te gustaría que pase con la IA en periodismo?', type: 'textarea', placeholder: 'Comparte tu visión para el futuro...' },
        { id: 'comentarios', label: 'Comentarios adicionales (opcional)', type: 'textarea', placeholder: 'Cualquier otro pensamiento...' }
      ]
    }
  ];

  const updateResponse = (section, id, value) => {
    setResponses(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [id]: value
      }
    }));
  };

  const handleCheckbox = (section, id, option) => {
    const current = responses[section][id] || [];
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    updateResponse(section, id, updated);
  };

  const downloadJSON = () => {
    const data = {
      timestamp: new Date().toISOString(),
      ...responses
    };
    const element = document.createElement('a');
    element.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    element.download = `encuesta_cyberperiodismo_${new Date().getTime()}.json`;
    element.click();
  };

  const resetForm = () => {
    localStorage.removeItem('encuesta_cyberperiodismo');
    setResponses({
      perfil: {},
      uso_ia: {},
      tareas: {},
      criterios: {},
      percepciones: {},
      formacion: {},
      futuro: {}
    });
    setSubmitted(false);
    setCurrentSection(0);
  };

  const sectionKey = Object.keys(responses)[currentSection];
  const section = sections[currentSection];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#1a1a2e] to-[#0a0a14] p-4 flex items-center justify-center">
        <div className="backdrop-blur-md bg-white bg-opacity-5 border border-[#00e5ff] border-opacity-30 rounded-2xl p-8 max-w-md text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-[#00e5ff] mb-2">¡Encuesta Completada!</h2>
          <p className="text-[#e5e7eb] mb-6">Tus respuestas han sido guardadas localmente.</p>
          <button
            onClick={downloadJSON}
            className="w-full bg-gradient-to-r from-[#00e5ff] to-[#b847ff] text-[#0a0a14] font-bold py-3 rounded-lg mb-3 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#00e5ff]/50 transition-all"
          >
            <Download size={20} /> Descargar mis respuestas
          </button>
          <button
            onClick={resetForm}
            className="w-full bg-[#1a1a2e] border border-[#7c3aed] text-[#7c3aed] font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#7c3aed] hover:text-[#0a0a14] transition-all"
          >
            <RotateCcw size={20} /> Nueva respuesta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#1a1a2e] to-[#0a0a14] p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00e5ff] via-[#b847ff] to-[#7c3aed] bg-clip-text text-transparent mb-2">
            Encuesta Cyberperiodismo
          </h1>
          <p className="text-[#b847ff] text-lg">IA + Periodismo: Perspectivas Críticas</p>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#1a1a2e] rounded-full overflow-hidden border border-[#00e5ff] border-opacity-20">
          <div
            className="h-full bg-gradient-to-r from-[#00e5ff] to-[#b847ff] transition-all duration-500"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
        <p className="text-[#7c3aed] text-sm mt-2 text-center">Sección {currentSection + 1} de {sections.length}</p>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-md bg-white bg-opacity-5 border border-[#00e5ff] border-opacity-30 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#00e5ff] mb-2">{section.title}</h2>
          <p className="text-[#b847ff] mb-6">{section.subtitle}</p>

          <div className="space-y-6">
            {section.questions.map(q => (
              <div key={q.id}>
                <label className="text-[#e5e7eb] font-semibold block mb-3">{q.label}</label>

                {q.type === 'select' && (
                  <select
                    value={responses[sectionKey][q.id] || ''}
                    onChange={(e) => updateResponse(sectionKey, q.id, e.target.value)}
                    className="w-full bg-[#1a1a2e] border border-[#7c3aed] border-opacity-50 text-[#e5e7eb] rounded-lg p-3 focus:border-[#00e5ff] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:ring-opacity-30 transition-all"
                  >
                    <option value="">Selecciona una opción</option>
                    {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                )}

                {q.type === 'text' && (
                  <input
                    type="text"
                    value={responses[sectionKey][q.id] || ''}
                    onChange={(e) => updateResponse(sectionKey, q.id, e.target.value)}
                    className="w-full bg-[#1a1a2e] border border-[#7c3aed] border-opacity-50 text-[#e5e7eb] rounded-lg p-3 focus:border-[#00e5ff] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:ring-opacity-30 transition-all"
                  />
                )}

                {q.type === 'number' && (
                  <input
                    type="number"
                    value={responses[sectionKey][q.id] || ''}
                    onChange={(e) => updateResponse(sectionKey, q.id, e.target.value)}
                    className="w-full bg-[#1a1a2e] border border-[#7c3aed] border-opacity-50 text-[#e5e7eb] rounded-lg p-3 focus:border-[#00e5ff] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:ring-opacity-30 transition-all"
                  />
                )}

                {q.type === 'textarea' && (
                  <textarea
                    value={responses[sectionKey][q.id] || ''}
                    onChange={(e) => updateResponse(sectionKey, q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full bg-[#1a1a2e] border border-[#7c3aed] border-opacity-50 text-[#e5e7eb] rounded-lg p-3 focus:border-[#00e5ff] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:ring-opacity-30 transition-all resize-none h-24"
                  />
                )}

                {q.type === 'checkbox' && (
                  <div className="space-y-2">
                    {q.options.map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(responses[sectionKey][q.id] || []).includes(opt)}
                          onChange={() => handleCheckbox(sectionKey, q.id, opt)}
                          className="w-5 h-5 rounded border-[#7c3aed] bg-[#1a1a2e] accent-[#00e5ff]"
                        />
                        <span className="text-[#e5e7eb]">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="flex items-center gap-2 px-6 py-3 bg-[#1a1a2e] border border-[#7c3aed] text-[#7c3aed] rounded-lg hover:bg-[#7c3aed] hover:text-[#0a0a14] disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold"
          >
            <ChevronLeft size={20} /> Anterior
          </button>

          <button
            onClick={() => {
              if (currentSection === sections.length - 1) {
                setSubmitted(true);
              } else {
                setCurrentSection(Math.min(sections.length - 1, currentSection + 1));
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00e5ff] to-[#b847ff] text-[#0a0a14] rounded-lg hover:shadow-lg hover:shadow-[#00e5ff]/50 transition-all font-semibold"
          >
            {currentSection === sections.length - 1 ? 'Enviar' : 'Siguiente'} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
