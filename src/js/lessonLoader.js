function getLessonId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function findLessonById(modules, lessonId) {

  for (const module of modules) {
    if (!module.lessons) continue;

    for (const lesson of module.lessons) {
      if (lesson.id === lessonId) {
        return lesson;
      }
    }
  }

  return null;
}

function renderLesson() {
  const lessonId = getLessonId();
  const container = document.getElementById("lesson-content");

  if (!lessonId) {
    container.innerHTML = "<h1>No lesson selected</h1>";
    return;
  }

  const lesson = findLessonById(courseData, lessonId);

  if (!lesson) {
    container.innerHTML = "<h1>Lesson not found</h1>";
    return;
  }

  container.innerHTML = `
    <h1>${lesson.title}</h1>
    <p>This is the lesson: ${lesson.title}</p>
  `;

}

renderLesson();