const userFullProfile = `#graphql
query getUserProfile($username: String!) {
    allQuestionsCount {
        difficulty
        count
    }
    matchedUser(username: $username) {
        username
        githubUrl
        twitterUrl
        linkedinUrl
        contributions {
            points
            questionCount
            testcaseCount
        }
        profile {
            realName
            userAvatar
            birthday
            ranking
            reputation
            websites
            countryName
            company
            school
            skillTags
            aboutMe
            starRating
        }
        badges {
            id
            displayName
            icon
            creationDate
        }
        upcomingBadges {
            name
            icon
        }
        activeBadge {
            id
            displayName
            icon
            creationDate
        }
        submitStats {
            totalSubmissionNum {
                difficulty
                count
                submissions
            }
            acSubmissionNum {
                difficulty
                count
                submissions
            }
        }
        submissionCalendar
    }
    recentSubmissionList(username: $username, limit: 20) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
    }
}`;

const userBadges = `#graphql
query getUserBadges($username: String!) {
  matchedUser(username: $username) {
    badges {
      id
      displayName
      icon
      creationDate
    }
    upcomingBadges {
      name
      icon
    }
    activeBadge {
      id
      displayName
      icon
      creationDate
    }
  }
}`;

const userSubmissionStats = `#graphql
query getUserSubmissionStats($username: String!) {
  matchedUser(username: $username) {
    submitStats {
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}`;


const userCalendar = `#graphql
query getUserCalendar($username: String!) {
  matchedUser(username: $username) {
    submissionCalendar
  }
}`;

const tabLeet = `#graphql
query getUserBasicStats($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      ranking
      userAvatar
    }
    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}`;

export { userFullProfile, userBadges, userCalendar, tabLeet, userSubmissionStats };
