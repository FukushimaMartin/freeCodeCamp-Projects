const courseData = [
  {
    module: "Basic HTML",
    lessons: [
      { title: "Say Hello to HTML Elements", type: "Lab" },
      { title: "Headline with the strong Element", type: "Lab" },
      { title: "Inform with the Paragraph Element", type: "Lab" }
    ]
  },

  {
    module: "Semantic HTML",
    lessons: [
      { title: "Create your tribute page", type: "Workshop" },
      { title: "Add images and links", type: "Workshop" },
      { title: "Style with CSS", type: "Workshop" }
    ]
  },

  {
    module: "Forms and Tables",
    lessons: [
      { title: "Form structure", type: "Workshop" },
      { title: "Accessibility basics", type: "Workshop" },
      { title: "Responsive layout", type: "Workshop" }
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
      { title: "Form structure", type: "Workshop" },
      { title: "Accessibility basics", type: "Workshop" },
      { title: "Responsive layout", type: "Workshop" }
    ]
  }
];

renderCourse(".course-content", courseData);