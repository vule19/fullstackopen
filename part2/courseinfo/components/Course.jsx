const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <div>
        {course.parts.map(part =>
          <div key={part.id}>
            {part.name} {part.exercises}
          </div>
        )}
      </div>
      <strong>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
    </div>
  )
}

export default Course