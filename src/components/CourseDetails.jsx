import ProgressBar from "./ProgressBar.jsx";

export default function CourseDetails({ course, onBack, onComplete }) {
  return (
    <section className="details-page">
      <button className="back-button" onClick={onBack}>← Back to all courses</button>
      <div className="details-layout">
        <div className={"details-hero art-" + course.color}>
          <span className="details-icon">{course.icon}</span>
          <span className="details-category">{course.category}</span>
        </div>
        <div className="details-content">
          <span className="eyebrow">COURSE OVERVIEW</span>
          <h1>{course.title}</h1>
          <p className="details-description">{course.description}</p>
          <div className="details-stats">
            <div><span>Duration</span><strong>{course.duration}</strong></div>
            <div><span>Lessons</span><strong>{course.lessons}</strong></div>
            <div><span>Level</span><strong>{course.level}</strong></div>
          </div>
          <div className="details-progress">
            <div className="progress-heading"><span>Course progress</span><strong>{course.progress}%</strong></div>
            <ProgressBar progress={course.progress} />
          </div>
          {course.progress === 100 ? (
            <button className="primary-button" disabled>✓ Course completed</button>
          ) : (
            <button className="primary-button" onClick={() => onComplete(course.id)}>Mark course as completed</button>
          )}
        </div>
      </div>
    </section>
  );
}