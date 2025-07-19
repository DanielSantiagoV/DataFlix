// course-details.js
const courses = [
  {
    title: "¿Qué son las bases de datos?",
    video: "https://www.youtube.com/embed/6S8A-1jBD5Y",
    descripcion: "Descubre qué es una base de datos, su objetivo y su importancia en la vida diaria y en la organización de la información.",
    temas: [
      "¿Qué es una base de datos?",
      "¿Cuál es el objetivo principal de una base de datos?",
      "¿Qué diferencia hay entre una base de datos física y una digital?",
      "¿Por qué es importante que una base de datos sea estructurada?",
      "¿Dónde usamos bases de datos en la vida diaria?"
    ]
  },
  {
    title: "¿Qué son los datos?",
    video: "https://www.youtube.com/embed/4wo_wZWk_UM",
    descripcion: "Aprende qué es un dato, su papel en la toma de decisiones y los diferentes tipos de datos según su estructura.",
    temas: [
      "¿Qué es un dato?",
      "¿Qué papel juegan los datos en la toma de decisiones?",
      "¿Cuál es la diferencia entre dato e información?",
      "¿Cuál es un ejemplo cotidiano del uso de datos?",
      "¿Qué tipo de datos existen según su estructura?"
    ]
  },
  {
    title: "¿Cómo entender las bases de datos?",
    video: "https://www.youtube.com/embed/b2L1Cn5vxFw",
    descripcion: "Comprende la estructura de las bases de datos relacionales, la normalización y las relaciones entre tablas.",
    temas: [
      "¿Qué representa una tabla en una base de datos relacional?",
      "¿Qué es un registro en una tabla?",
      "¿Qué es la normalización?",
      "¿Qué es una relación entre tablas?",
      "¿Para qué se usan claves primarias y foráneas?"
    ]
  },
  {
    title: "¿Cómo hacer representaciones conceptuales de una base de datos?",
    video: "https://www.youtube.com/embed/6fcNDvQYZk0",
    descripcion: "Explora los modelos entidad-relación, los elementos de un diagrama E-R y su utilidad en el diseño de bases de datos.",
    temas: [
      "¿Qué es un modelo entidad-relación (E-R)?",
      "¿Qué elementos componen un diagrama E-R?",
      "¿Qué es una entidad débil?",
      "¿Qué representa el rombo en un diagrama E-R?",
      "¿Por qué es útil un diagrama E-R antes de construir una base de datos?"
    ]
  }
];
const idx = parseInt(localStorage.getItem('selectedCourse'));
if (isNaN(idx) || idx < 0 || idx >= courses.length) {
  window.location.href = 'courses.html';
}
const c = courses[idx];
const container = document.querySelector('.course-details-container');
container.innerHTML = `
  <div class="breadcrumb">
    <a href="courses.html">Cursos</a> <span class="sep">/</span> <span>${c.title}</span>
  </div>
  <div class="course-title">${c.title}</div>
  <div class="course-desc">${c.descripcion}</div>
  <div style="margin-bottom: 24px;"><iframe width="100%" height="340" src="${c.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
  <div class="section-title">Temas y Preguntas</div>
  <ul class="outline-list">
    ${c.temas.map(t => `<li class="outline-item"><div class="outline-info"><div class="outline-title">${t}</div></div></li>`).join('')}
  </ul>
  <div style="margin-top: 32px; display: flex; gap: 16px;">
    <a href="${c.video.replace('embed/', 'watch?v=')}" target="_blank" class="btn btn--primary">Ver Video en YouTube</a>
    <a href="quiz.html" class="btn btn--secondary">Ir al Quiz</a>
    <a href="courses.html" class="btn">Volver a Cursos</a>
  </div>
`; 