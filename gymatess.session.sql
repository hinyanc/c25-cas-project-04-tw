SELECT
    users.id, 
    is_pt, 
    username, 
    profile_pic,
    (gym_center.gym_center) AS gym_center,
    (gym_location.gym_location) AS gym_location, 
    json_agg(interest.name) AS interest_name, 
    bio,
    (users_matching.status) AS match_status
FROM
    users
JOIN users_interest ON users_interest.users_id = users.id
JOIN interest ON users_interest.interest_id = interest.id
JOIN user_gym_center ON user_gym_center.users_id = users.id
JOIN gym_center ON user_gym_center.gym_center_id = gym_center.id
JOIN user_gym_location ON user_gym_location.users_id = users.id
JOIN gym_location ON user_gym_location.gym_location_id = gym_location.id
JOIN 
GROUP BY
    is_pt, username, bio, gym_center, gym_location;




select height, weight from users where users.id = 3



SELECT interest.name 
FROM users_interest 
JOIN users ON users_interest.users_id = users.id 
JOIN interest ON users_interest.interest_id = interest.id
WHERE users_id = 2;



SELECT * FROM user_gym_center;

SELECT * FROM users_interest;

select exists (select * from users_matching where users_id = 1 and matched_users_id = 2 or users_id = 2 and matched_users_id =1) 

select * from users_matching where users_matching.status = 'matched' and users_id = 1 or matched_users_id = 1 

select * from users_matching

SELECT MAX(MAX(users.weight / height / height)*10000) FROM users WHERE id = 1