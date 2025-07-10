import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
actor {
  // Profile Type
  type Profile = {
    name: Text;
    email: Text;
    bio: Text;
    location: Text;
    website: Text;
    twitter: Text;
    github: Text;
    linkedin: Text;
  };
  // Course Type
  type Course = {
    id: Text;
    title: Text;
    description: Text;
    instructor: Text;
  };
  // Storage
  let profiles = HashMap.HashMap<Principal, Profile>(10, Principal.equal, Principal.hash);
  let courses = HashMap.HashMap<Text, Course>(10, Text.equal, Text.hash);
  let enrollments = HashMap.HashMap<Principal, [Text]>(10, Principal.equal, Principal.hash);
  let completions = HashMap.HashMap<Principal, [Text]>(10, Principal.equal, Principal.hash);
let claimedRewards = HashMap.HashMap<Principal, [Text]>(10, Principal.equal, Principal.hash);


  var nextCourseId: Nat = 0;
  // Store User Profile
  public shared (msg) func setProfile(p: Profile): async Text {
    let caller = msg.caller;
    profiles.put(caller, p);
    return "Profile saved successfully";
  };
  // Get Current User Profile
public shared (msg)  func getProfile(): async ?Profile {
    let caller = msg.caller;
    profiles.get(caller);
  };
  // Create Course
  public func createCourse(title: Text, description: Text, instructor: Text): async Text {
    let id = "course_" # Nat.toText(nextCourseId);
    let course: Course = {
      id = id;
      title = title;
      description = description;
      instructor = instructor;
    };
    courses.put(id, course);
    nextCourseId += 1;
    return "Course created with ID: " # id;
  };
  // Get All Courses
  public query func getAllCourses(): async [Course] {
    var result: [Course] = [];
    for ((_, course) in courses.entries()) {
      result := Array.append(result, [course]);
    };
    result
  };
  // Enroll in Course
  public shared  (msg) func enroll(courseId: Text): async Text {
    let caller = msg.caller;
    let current = enrollments.get(caller);

    let updated = switch (current) {
      case (?list) {
        if (Array.find<Text>(list, func(c) { c == courseId }) != null) {
          return "Already enrolled.";
        };
        Array.append<Text>(list, [courseId])
      };
      case null [courseId];
    };
    enrollments.put(caller, updated);
    return "Enrolled successfully!";
  };
  // Get Courses of Current User
  public shared  (msg)  func getMyCourses(): async [Text] {
    let caller = msg.caller;
    switch (enrollments.get(caller)) {
      case (?list) list;
      case null [];
    }
  };
  // Delete Course
  public func deleteCourse(courseId: Text): async Text {
    let removed = courses.remove(courseId);
    if (removed != null) {
      return "Course deleted.";
    } else {
      return "Course not found.";
    }
  };
  // Update Course
  public func updateCourse(courseId: Text, newTitle: Text, newDesc: Text): async Text {
    switch (courses.get(courseId)) {
      case (?course) {
        let updatedCourse: Course = {
          id = courseId;
          title = newTitle;
          description = newDesc;
          instructor = course.instructor;
        };
        courses.put(courseId, updatedCourse);
        return "Course updated.";
      };
      case null "Course not found.";
    }
  };
  public shared (msg) func completeCourse(courseId: Text): async Text {
  let caller = msg.caller;
  let completed = switch (completions.get(caller)) {
     case (?list) list;
     case null [];
  };

  // Avoid duplicate
  if (Array.find<Text>(completed, func(c) { c == courseId }) != null) {
    return "Already marked as completed.";
  };

  completions.put(caller, Array.append(completed, [courseId]));
  return "Course marked as completed!";
};

public  shared (msg) func getCompletedCourses(): async [Text] {
  let caller = msg.caller;
  switch (completions.get(caller)) {
    case null  [];
    case (?list) list;
  }
};
public shared (msg) func claimReward(courseId: Text): async Text {
  let caller = msg.caller;

  // Must have completed course
  let completed = switch (completions.get(caller)) {
    case (?list) list;
    case null return "You have not completed this course.";
  };

  if (Array.find<Text>(completed, func(c) { c == courseId }) == null) {
    return "Course not marked as completed.";
  };

  // Already claimed?
  let claimed = switch (claimedRewards.get(caller)) {
    case (?list) list;
    case null  [];
  };

  if (Array.find<Text>(claimed, func(c) { c == courseId }) != null) {
    return "Reward already claimed.";
  };

  claimedRewards.put(caller, Array.append(claimed, [courseId]));

  return "Reward claimed for course: " # courseId;
};

};

