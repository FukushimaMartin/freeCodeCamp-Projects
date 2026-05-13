const courseData = [
  {
    module: "Basic CSS",
    lessons: [
      { title: "Design a Cafe Menu",          type: "Workshop", id: "design-cafe-menu"      },
      { title: "Design a Business Card",       type: "Lab",      id: "design-business-card"  },
      { title: "Build a Stylized To-Do List",  type: "Lab",      id: "build-todo-list"        },
      { title: "Design a Blog Post Card",      type: "Lab",      id: "design-blog-post-card" }
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
    lessons: [
      { title: "Design a Greeting Card",             type: "Workshop", id: "design-greeting-card"        },
      { title: "Design a Parent Teacher Conference Form", type: "Workshop", id: "design-parent-teacher-form" },
      { title: "Build a Job Application Form",       type: "Lab",      id: "build-job-application-form"  }
    ]
  },
  {
    module: "Colors",
    lessons: [
      { title: "Build a Set of Colored Markers", type: "Workshop", id: "build-colored-markers" },
      { title: "Design a Set of Colored Boxes",  type: "Lab",      id: "design-colored-boxes"  }
    ]
  },
  {
    module: "Styling Forms",
    lessons: [
      { title: "Design a Registration Form",      type: "Workshop", id: "design-registration-form"  },
      { title: "Design a Contact Form",           type: "Lab",      id: "design-contact-form"       },
      { title: "Build a Game Settings Panel",     type: "Workshop", id: "build-game-settings-panel" },
      { title: "Design a Feature Selection Page", type: "Lab",      id: "design-feature-selection"  }
    ]
  },
  {
    module: "The Box Model",
    lessons: [
      { title: "Design a Rothko Painting",    type: "Workshop", id: "design-rothko-painting"  },
      { title: "Build a Confidential Email Page", type: "Lab",  id: "build-confidential-email" }
    ]
  },
  {
    module: "Flexbox",
    lessons: [
      { title: "Build a Flexbox Photo Gallery",      type: "Workshop", id: "build-flexbox-photo-gallery" },
      { title: "Design a Set of Colorful Boxes",     type: "Workshop", id: "design-colorful-boxes"       },
      { title: "Design a Pricing Plans Layout Page", type: "Lab",      id: "design-pricing-plans"        }
    ]
  },
  {
    module: "Build a Page of Playing Cards",
    project: true,
    type: "Certification",
    id: "build-playing-cards"
  },
  {
    module: "Typography",
    lessons: [
      { title: "Build a Nutritional Label",    type: "Workshop", id: "build-nutritional-label"   },
      { title: "Build a Newspaper Article",    type: "Lab",      id: "build-newspaper-article"   }
    ]
  },
  {
    module: "Accessibility",
    lessons: [
      { title: "Build a Quiz Webpage",  type: "Workshop", id: "build-quiz-webpage"  },
      { title: "Build a Tribute Page",  type: "Lab",      id: "build-tribute-page"  }
    ]
  },
  {
    module: "Positioning",
    lessons: [
      { title: "Build a Cat Painting",    type: "Workshop", id: "build-cat-painting"    },
      { title: "Build a House Painting",  type: "Lab",      id: "build-house-painting"  }
    ]
  },
  {
    module: "Attribute Selectors",
    lessons: [
      { title: "Build a Balance Sheet", type: "Workshop", id: "build-balance-sheet" }
    ]
  },
  {
    module: "Build a Book Inventory App",
    project: true,
    type: "Certification",
    id: "build-book-inventory"
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
