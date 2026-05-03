const courseData = [
  {
    module: "Basic HTML",
    lessons: [
      { title: "Build a Curriculum Outline",           type: "Workshop", id: "build-curriculum-outline"   },
      { title: "Build a Cat Photo App",                type: "Workshop", id: "build-cat-photo-app"        },
      { title: "Build a Recipe Page",                  type: "Lab",      id: "build-recipe-page"          },
      { title: "Build a Bookstore Page",               type: "Workshop", id: "build-bookstore-page"       },
      { title: "Build a Travel Agency Page",           type: "Lab",      id: "build-travel-agency"        },
      { title: "Build an HTML Music Player",           type: "Workshop", id: "build-html-music-player"    },
      { title: "Build an HTML Video Player",           type: "Workshop", id: "build-html-video-player"    },
      { title: "Build an HTML Audio and Video Player", type: "Lab",      id: "build-html-audio-video"     },
      { title: "Build a Heart Icon",                   type: "Workshop", id: "build-heart-icon"           },
      { title: "Build a Video Display Using iframe",   type: "Workshop", id: "build-video-iframe"         },
      { title: "Build a Video Compilation Page",       type: "Lab",      id: "build-video-compilation"    }
    ]
  },

  {
    module: "Semantic HTML",
    lessons: [
      { title: "Build a List of Major Web Browsers", type: "Workshop", id: "build-web-browsers-list" },
      { title: "Build Quincy's Job Tips Page",        type: "Workshop", id: "build-quincy-job-tips"   },
      { title: "Build a Cat Blog Page",               type: "Workshop", id: "build-cat-blog"          },
      { title: "Build an Event Hub",                  type: "Lab",      id: "build-event-hub"         }
    ]
  },

  {
    module: "Forms and Tables",
    lessons: [
      { title: "Build a Hotel Feedback Form", type: "Workshop", id: "build-hotel-feedback"   },
      { title: "Build a Final Exams Table",   type: "Workshop", id: "build-final-exams-table" },
      { title: "Build a Book Catalog Table",  type: "Lab",      id: "build-book-catalog"      }
    ]
  },

  {
    module: "Build a Survey Form",
    project: true,
    type: "Certification",
    id: "build-survey-form"
  },

  {
    module: "Accessibility",
    lessons: [
      { title: "Build a Tech Conference Schedule Table", type: "Workshop", id: "build-tech-conference-table" },
      { title: "Build an Accessible Audio Controller",   type: "Workshop", id: "build-accessible-audio"      },
      { title: "Build a Checkout Page",                  type: "Lab",      id: "build-checkout-page"         },
      { title: "Design a Movie Review Page",             type: "Lab",      id: "design-movie-review"         },
      { title: "Build a Multimedia Player",              type: "Lab",      id: "build-multimedia-player"     }
    ]
  }
];

renderCourse(".course-content", courseData, "responsive-web-design");
