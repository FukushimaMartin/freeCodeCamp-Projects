const courseData = [
  {
    module: "Basic HTML",
    lessons: [
      { title: "Say Hello to HTML Elements", type: "Lab", id: "say-hello-html" },
      { title: "Headline with the strong Element", type: "Lab", id: "headline-strong" },
      { title: "Inform with the Paragraph Element", type: "Lab", id: "inform-paragraph" }
    ]
  },

  {
    module: "Semantic HTML",
    lessons: [
      { title: "Create your tribute page", type: "Workshop", id: "tribute-page" },
      { title: "Add images and links", type: "Workshop", id: "add-images-links" },
      { title: "Style with CSS", type: "Workshop", id: "style-with-css" }
    ]
  },

  {
    module: "Forms and Tables",
    lessons: [
      { title: "Form structure", type: "Workshop", id: "form-structure" },
      { title: "Accessibility basics", type: "Workshop", id: "accessibility-basics" },
      { title: "Responsive layout", type: "Workshop", id: "responsive-layout" }
    ]
  },

  {
    module: "Survey Form",
    project: true,
    type: "Certification"
  },

  {
    module: "Accessibility",
    lessons: [
      { title: "Form structure", type: "Workshop", id: "form-structure" },
      { title: "Accessibility basics", type: "Workshop", id: "accessibility-basics" },
      { title: "Responsive layout", type: "Workshop", id: "responsive-layout" }
    ]
  }
];

renderCourse(".course-content", courseData);