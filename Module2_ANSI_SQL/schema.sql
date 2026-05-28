CREATE DATABASE IF NOT EXISTS event_management;

USE event_management;

CREATE TABLE users (

    user_id INT PRIMARY KEY AUTO_INCREMENT,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    city VARCHAR(100) NOT NULL,

    registration_date DATE NOT NULL

);

CREATE TABLE events (

    event_id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(200) NOT NULL,

    description TEXT,

    city VARCHAR(100) NOT NULL,

    start_date DATETIME NOT NULL,

    end_date DATETIME NOT NULL,

    status ENUM('upcoming','completed','cancelled'),

    organizer_id INT,

    FOREIGN KEY (organizer_id) REFERENCES users(user_id)

);

CREATE TABLE sessions (

    session_id INT PRIMARY KEY AUTO_INCREMENT,

    event_id INT,

    title VARCHAR(200) NOT NULL,

    speaker_name VARCHAR(100) NOT NULL,

    start_time DATETIME NOT NULL,

    end_time DATETIME NOT NULL,

    FOREIGN KEY (event_id) REFERENCES events(event_id)

);

CREATE TABLE registrations (

    registration_id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT,

    event_id INT,

    registration_date DATE NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(user_id),

    FOREIGN KEY (event_id) REFERENCES events(event_id)

);

CREATE TABLE feedback (

    feedback_id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT,

    event_id INT,

    rating INT CHECK (rating BETWEEN 1 AND 5),

    comments TEXT,

    feedback_date DATE NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(user_id),

    FOREIGN KEY (event_id) REFERENCES events(event_id)

);

CREATE TABLE resources (

    resource_id INT PRIMARY KEY AUTO_INCREMENT,

    event_id INT,

    resource_type ENUM('pdf','image','link'),

    resource_url VARCHAR(255) NOT NULL,

    uploaded_at DATETIME NOT NULL,

    FOREIGN KEY (event_id) REFERENCES events(event_id)

);