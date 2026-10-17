import React from "react";
import ProgressBar from "./ProgressBar.jsx";
export default function CourseCard({ course, onOpen, onComplete }) {
  return (
    <article className="course-card">
      <button className={"course-art art-" + course.color} onClick={onOpen}>
        <span className="course-art-icon">{course.icon}</span>
        <span className="art-open">View course ↗</span>
      </button>
      <div className="course-card-body">
        <div className="course-meta">
          <span className="category-label">{course.category}</span>
          <span className="duration">{course.duration}</span>
        </div>
        <button className="course-title" onClick={onOpen}>{course.title}</button>
        <p className="course-description">{course.description}</p>
        <div className="progress-heading"><span>Progress</span><strong>{course.progress}%</strong></div>
        <ProgressBar progress={course.progress} />
        <div className="course-card-footer">
          <span className="lesson-count">{course.lessons} lessons · {course.level}</span>
          {course.progress === 100 ? (
            <button className="complete-button is-complete" disabled>✓ Completed</button>
          ) : (
            <button className="complete-button" onClick={() => onComplete(course.id)}>Mark complete</button>
          )}
        </div>
      </div>
    </article>
  );
}