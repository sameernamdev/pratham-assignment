import React, { useMemo, useState } from "react";
import { initialCourses } from "./data/courses.js";
import CourseCard from "./components/CourseCard.jsx";
import CourseDetails from "./components/CourseDetails.jsx";

export default function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Search and filter courses.
const filteredCourses = useMemo(() => {
  return courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All categories" ||
      course.category === category;

    return matchesSearch && matchesCategory;
  });
}, [courses, search, category]);

  // Get the selected course from the latest course list.
  let selectedCourse = null;
  if (selectedCourseId !== null) {
    selectedCourse = courses.find(
      (course) => course.id === selectedCourseId
    );
  }

  // Mark one course as completed.
  function markComplete(courseId) {
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        return { ...course, progress: 100 };
      }
      return course;
    });
    setCourses(updatedCourses);
  }

  function clearFilters() {
    setSearch("");
    setCategory("All categories");
  }

  const completedCount = courses.filter(
    (course) => course.progress === 100
  ).length;

  let totalProgress = 0;
  courses.forEach((course) => {
    totalProgress = totalProgress + course.progress;
  });
  const averageProgress = Math.round(totalProgress / courses.length);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home"><span className="brand-mark">L</span><span>learn<span className="brand-light">space</span></span></a>
        <div className="sidebar-label">LEARNING</div>
        <button className="nav-item active">▦ &nbsp; My dashboard</button>
        <button className="nav-item" onClick={() => { setSelectedCourseId(null); clearFilters(); }}>◫ &nbsp; Course library</button>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon">✦</div><strong>Keep growing</strong><p>Small steps lead to big progress.</p></div>
          <div className="profile-mini"><div className="avatar">SN</div><div><strong>Student Name</strong><span>Learning account</span></div></div>
        </div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>My dashboard</strong></div>
          <div className="topbar-right"><span className="today-label">YOUR LEARNING SPACE</span><div className="top-avatar">SN</div></div>
        </header>

        {selectedCourse === null ? (
          <div className="dashboard-content">
            <section className="welcome-row">
              <div><span className="eyebrow">YOUR LEARNING JOURNEY</span><h1>Good things take <span>practice.</span></h1><p>Keep your momentum going. Your next skill is just a lesson away.</p></div>
              <div className="welcome-illustration"><span className="sun-shape"></span><span className="book-shape">↗</span><span className="sparkle">✳</span></div>
            </section>

            <section className="stats-grid">
              <div className="stat-card"><div className="stat-top"><span>Courses enrolled</span><span className="stat-icon lavender">▦</span></div><strong>{courses.length}</strong><span className="stat-note">Your learning journey</span></div>
              <div className="stat-card"><div className="stat-top"><span>Completed</span><span className="stat-icon mint">✓</span></div><strong>{completedCount}</strong><span className="stat-note">Courses finished</span></div>
              <div className="stat-card"><div className="stat-top"><span>Average progress</span><span className="stat-icon peach">↗</span></div><strong>{averageProgress}%</strong><span className="stat-note">Across all courses</span></div>
            </section>

            <section className="courses-section">
              <div className="section-heading">
                <div><span className="eyebrow">YOUR LIBRARY</span><h2>Continue learning <span className="course-count">{filteredCourses.length}</span></h2><p>Pick up where you left off.</p></div>
                <div className="filter-controls">
                  <label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses..." aria-label="Search courses by title" /></label>
                  <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
                    <option>All categories</option><option>Development</option><option>Design</option><option>Business</option>
                  </select>
                </div>
              </div>

              {filteredCourses.length > 0 ? (
                <div className="course-grid">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} onOpen={() => setSelectedCourseId(course.id)} onComplete={markComplete} />
                  ))}
                </div>
              ) : (
                <div className="empty-state"><div className="empty-icon">⌕</div><h3>No courses found</h3><p>Try a different search term or choose another category.</p><button className="primary-button" onClick={clearFilters}>Clear filters</button></div>
              )}
            </section>
            <footer className="page-footer"><span>© 2026 LearnSpace</span><span>Every lesson counts <span className="footer-heart">♥</span></span></footer>
          </div>
        ) : (
          <CourseDetails course={selectedCourse} onBack={() => setSelectedCourseId(null)} onComplete={markComplete} />
        )}
      </main>
    </div>
  );
}