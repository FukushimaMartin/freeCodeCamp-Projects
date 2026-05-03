const courseData = [
  {
    module: "Basic CSS",
    lessons: [
      { title: "Design a Cafe Menu",      type: "Workshop", id: "design-cafe-menu"      },
      { title: "Design a Business Card",  type: "Lab",      id: "design-business-card"  },
      { title: "Build a Stylized To-Do List", type: "Lab", id: "build-todo-list"        },
      { title: "Design a Blog Post Card", type: "Lab",      id: "design-blog-post-card" }
    ]
  },

  {
    module: "Absolute and Relative Units",
    lessons: [
      { title: "Build an Event Flyer Page", type: "Lab", id: "build-event-flyer" }
    ]
  },

  {
    module: "Pseudo Classes and Elements",
    lessons: []
  },

  {
    module: "Colors",
    lessons: []
  },

  {
    module: "Styling Forms",
    lessons: []
  },

  {
    module: "The Box Model",
    lessons: []
  },

  {
    module: "Flexbox",
    lessons: []
  },

  {
    module: "Build a Page of Playing Cards",
    project: true,
    type: "Certification"
  },

  {
    module: "Typography",
    lessons: []
  },

  {
    module: "Accessibility",
    lessons: []
  },

  {
    module: "Positioning",
    lessons: []
  },

  {
    module: "Attribute Selectors",
    lessons: []
  },

  {
    module: "Build a Book Inventory App",
    project: true,
    type: "Certification"
  },

  {
    module: "Responsive Design",
    lessons: []
  },

  {
    module: "Build a Technical Documentation Page",
    project: true,
    type: "Certification"
  },

  {
    module: "Variables",
    lessons: []
  },

  {
    module: "Grid",
    lessons: []
  },

  {
    module: "Build a Product Landing Page",
    project: true,
    type: "Certification"
  },

  {
    module: "Animations",
    lessons: []
  }
];

renderCourse(".course-content", courseData, "css");
