import React from "react";

const CourseData = ({ course }) => {
  return (
    <>
      {course.map((curr) => {
        return (
          <div>
            <h1>{curr.id}</h1>
            <h2>{curr.name}</h2>
          </div>
        );
      })}
    </>
  );
};

export default CourseData;
