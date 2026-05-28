USE event_management;

-- =====================================================
-- EXERCISE 1
-- User Upcoming Events
-- =====================================================

SELECT
    u.full_name,
    u.city,
    e.title,
    e.start_date,
    e.status
FROM users u
JOIN registrations r
    ON u.user_id = r.user_id
JOIN events e
    ON r.event_id = e.event_id
WHERE e.status = 'upcoming'
AND u.city = e.city
ORDER BY e.start_date;

-- =====================================================
-- EXERCISE 2
-- Top Rated Events
-- =====================================================

SELECT
    e.title,
    AVG(f.rating) AS average_rating,
    COUNT(f.feedback_id) AS total_feedbacks
FROM events e
JOIN feedback f
    ON e.event_id = f.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(f.feedback_id) >= 1
ORDER BY average_rating DESC;

-- =====================================================
-- EXERCISE 3
-- Inactive Users
-- =====================================================

SELECT
    u.user_id,
    u.full_name,
    u.email
FROM users u
LEFT JOIN registrations r
    ON u.user_id = r.user_id
WHERE r.registration_date IS NULL
OR r.registration_date < CURDATE() - INTERVAL 90 DAY;

-- =====================================================
-- EXERCISE 4
-- Peak Session Hours
-- =====================================================

SELECT
    e.title,
    COUNT(s.session_id) AS morning_sessions
FROM events e
JOIN sessions s
    ON e.event_id = s.event_id
WHERE TIME(s.start_time) BETWEEN '10:00:00' AND '12:00:00'
GROUP BY e.event_id, e.title;

-- =====================================================
-- EXERCISE 5
-- Most Active Cities
-- =====================================================

SELECT
    u.city,
    COUNT(DISTINCT r.user_id) AS total_users
FROM users u
JOIN registrations r
    ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY total_users DESC
LIMIT 5;

-- =====================================================
-- EXERCISE 6
-- Event Resource Summary
-- =====================================================

SELECT
    e.title,
    COUNT(r.resource_id) AS total_resources
FROM events e
LEFT JOIN resources r
    ON e.event_id = r.event_id
GROUP BY e.event_id, e.title;

-- =====================================================
-- EXERCISE 7
-- Low Feedback Alerts
-- =====================================================

SELECT
    u.full_name,
    e.title,
    f.rating,
    f.comments
FROM feedback f
JOIN users u
    ON f.user_id = u.user_id
JOIN events e
    ON f.event_id = e.event_id
WHERE f.rating < 3;

-- =====================================================
-- EXERCISE 8
-- Sessions per Upcoming Event
-- =====================================================

SELECT
    e.title,
    COUNT(s.session_id) AS total_sessions
FROM events e
LEFT JOIN sessions s
    ON e.event_id = s.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id, e.title;

-- =====================================================
-- EXERCISE 9
-- Organizer Event Summary
-- =====================================================

SELECT
    u.full_name AS organizer_name,
    e.status,
    COUNT(e.event_id) AS total_events
FROM users u
JOIN events e
    ON u.user_id = e.organizer_id
GROUP BY u.user_id, u.full_name, e.status;

-- =====================================================
-- EXERCISE 10
-- Feedback Gap
-- =====================================================

SELECT DISTINCT
    e.title
FROM events e
JOIN registrations r
    ON e.event_id = r.event_id
LEFT JOIN feedback f
    ON e.event_id = f.event_id
WHERE f.feedback_id IS NULL;

-- =====================================================
-- EXERCISE 11
-- Daily New User Count
-- =====================================================

SELECT
    registration_date,
    COUNT(user_id) AS total_users
FROM users
WHERE registration_date >= CURDATE() - INTERVAL 7 DAY
GROUP BY registration_date
ORDER BY registration_date;

-- =====================================================
-- EXERCISE 12
-- Event with Maximum Sessions
-- =====================================================

SELECT
    e.title,
    COUNT(s.session_id) AS total_sessions
FROM events e
JOIN sessions s
    ON e.event_id = s.event_id
GROUP BY e.event_id, e.title
HAVING COUNT(s.session_id) = (
    SELECT MAX(session_count)
    FROM (
        SELECT COUNT(session_id) AS session_count
        FROM sessions
        GROUP BY event_id
    ) AS temp
);

-- =====================================================
-- EXERCISE 13
-- Average Rating per City
-- =====================================================

SELECT
    e.city,
    AVG(f.rating) AS average_rating
FROM events e
JOIN feedback f
    ON e.event_id = f.event_id
GROUP BY e.city;

-- =====================================================
-- EXERCISE 14
-- Most Registered Events
-- =====================================================

SELECT
    e.title,
    COUNT(r.registration_id) AS total_registrations
FROM events e
JOIN registrations r
    ON e.event_id = r.event_id
GROUP BY e.event_id, e.title
ORDER BY total_registrations DESC
LIMIT 3;

-- =====================================================
-- EXERCISE 15
-- Event Session Time Conflict
-- =====================================================

SELECT
    s1.event_id,
    s1.title AS session_one,
    s2.title AS session_two
FROM sessions s1
JOIN sessions s2
    ON s1.event_id = s2.event_id
    AND s1.session_id < s2.session_id
WHERE s1.start_time < s2.end_time
AND s1.end_time > s2.start_time;

-- =====================================================
-- EXERCISE 16
-- Unregistered Active Users
-- =====================================================

SELECT
    u.user_id,
    u.full_name
FROM users u
LEFT JOIN registrations r
    ON u.user_id = r.user_id
WHERE u.registration_date >= CURDATE() - INTERVAL 30 DAY
AND r.registration_id IS NULL;

-- =====================================================
-- EXERCISE 17
-- Multi-Session Speakers
-- =====================================================

SELECT
    speaker_name,
    COUNT(session_id) AS total_sessions
FROM sessions
GROUP BY speaker_name
HAVING COUNT(session_id) > 1;

-- =====================================================
-- EXERCISE 18
-- Resource Availability Check
-- =====================================================

SELECT
    e.title
FROM events e
LEFT JOIN resources r
    ON e.event_id = r.event_id
WHERE r.resource_id IS NULL;

-- =====================================================
-- EXERCISE 19
-- Completed Events with Feedback Summary
-- =====================================================

SELECT
    e.title,
    COUNT(DISTINCT r.registration_id) AS total_registrations,
    AVG(f.rating) AS average_rating
FROM events e
LEFT JOIN registrations r
    ON e.event_id = r.event_id
LEFT JOIN feedback f
    ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id, e.title;

-- =====================================================
-- EXERCISE 20
-- User Engagement Index
-- =====================================================

SELECT
    u.full_name,
    COUNT(DISTINCT r.event_id) AS events_attended,
    COUNT(DISTINCT f.feedback_id) AS feedbacks_submitted
FROM users u
LEFT JOIN registrations r
    ON u.user_id = r.user_id
LEFT JOIN feedback f
    ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name;

-- =====================================================
-- EXERCISE 21
-- Top Feedback Providers
-- =====================================================

SELECT
    u.full_name,
    COUNT(f.feedback_id) AS total_feedbacks
FROM users u
JOIN feedback f
    ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name
ORDER BY total_feedbacks DESC
LIMIT 5;

-- =====================================================
-- EXERCISE 22
-- Duplicate Registrations Check
-- =====================================================

SELECT
    user_id,
    event_id,
    COUNT(*) AS duplicate_count
FROM registrations
GROUP BY user_id, event_id
HAVING COUNT(*) > 1;

-- =====================================================
-- EXERCISE 23
-- Registration Trends
-- =====================================================

SELECT
    DATE_FORMAT(registration_date, '%Y-%m') AS month,
    COUNT(registration_id) AS total_registrations
FROM registrations
WHERE registration_date >= CURDATE() - INTERVAL 12 MONTH
GROUP BY month
ORDER BY month;

-- =====================================================
-- EXERCISE 24
-- Average Session Duration per Event
-- =====================================================

SELECT
    e.title,
    AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time))
    AS average_duration_minutes
FROM events e
JOIN sessions s
    ON e.event_id = s.event_id
GROUP BY e.event_id, e.title;

-- =====================================================
-- EXERCISE 25
-- Events Without Sessions
-- =====================================================

SELECT
    e.title
FROM events e
LEFT JOIN sessions s
    ON e.event_id = s.event_id
WHERE s.session_id IS NULL;