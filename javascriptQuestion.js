// Scenario: You are given an array of objects representing users and their activities on a website.
// Each object contains a userId, activityType, and timestamp. Write a JavaScript function to analyze the
// data.

// Solution:

// Sample input data
const activities = [
    { userId: 1, activityType: 'login', timestamp: '2024-06-14T10:00:00Z' },
    { userId: 2, activityType: 'logout', timestamp: '2024-06-14T11:00:00Z' },
    { userId: 1, activityType: 'view', timestamp: '2024-06-14T12:00:00Z' },
    { userId: 3, activityType: 'login', timestamp: '2024-06-14T13:00:00Z' },
    { userId: 2, activityType: 'login', timestamp: '2024-06-14T14:00:00Z' },
    { userId: 1, activityType: 'logout', timestamp: '2024-06-14T15:00:00Z' },
  ];
  
  // Function to count the number of unique users
  function countUniqueUsers(data) {
    const uniqueUsers = new Set(data.map(activity => activity.userId));
    return uniqueUsers.size;
  }
  
  // Function to find the most common activity type
  function findMostCommonActivity(data) {
    const activityCount = {};
    data.forEach(activity => {
      if (!activityCount[activity.activityType]) {
        activityCount[activity.activityType] = 0;
      }
      activityCount[activity.activityType]++;
    });
    const mostCommonActivity = Object.keys(activityCount).reduce((a, b) => 
      activityCount[a] > activityCount[b] ? a : b
    );
    return mostCommonActivity;
  }
  
  // Function to generate a timeline of activities for each user, sorted by timestamp
  function generateUserTimelines(data) {
    const userTimelines = {};
    data.forEach(activity => {
      if (!userTimelines[activity.userId]) {
        userTimelines[activity.userId] = [];
      }
      userTimelines[activity.userId].push({
        activityType: activity.activityType,
        timestamp: new Date(activity.timestamp)
      });
    });
    
    // Sort the activities by timestamp for each user
    Object.keys(userTimelines).forEach(userId => {
      userTimelines[userId].sort((a, b) => a.timestamp - b.timestamp);
    });
  
    return userTimelines;
  }
  
  // Example usage:
  console.log('Number of unique users:', countUniqueUsers(activities));
  console.log('Most common activity type:', findMostCommonActivity(activities));
  console.log('User timelines:', generateUserTimelines(activities));

  
// Example OUTPUT - 

// Number of unique users: 3
// Most common activity type: login
// User timelines: {
//   '1': [
//     { activityType: 'login', timestamp: 2024-06-14T10:00:00.000Z },
//     { activityType: 'view', timestamp: 2024-06-14T12:00:00.000Z },
//     { activityType: 'logout', timestamp: 2024-06-14T15:00:00.000Z }
//   ],
//   '2': [
//     { activityType: 'logout', timestamp: 2024-06-14T11:00:00.000Z },
//     { activityType: 'login', timestamp: 2024-06-14T14:00:00.000Z }
//   ],
//   '3': [ { activityType: 'login', timestamp: 2024-06-14T13:00:00.000Z } ]
// }