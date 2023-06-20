select * from users_matching join users on users_matching.users_id = users.id where users_id = 1 and status = "matched";
    SELECT DISTINCT ON (users.id)
    users.id AS target_user_id,
    users.username AS target_username,
    users.profile_pic as profile_pic,
    chatroom.message AS last_message,
    chatroom.updated_at
    FROM chatroom
    LEFT JOIN users ON (
        (users.id = chatroom.sender_id AND chatroom.receiver_id = 1) OR
        (users.id = chatroom.receiver_id AND chatroom.sender_id = 1)
      )
      AND chatroom.updated_at = (
        SELECT MAX(updated_at)
        FROM chatroom AS subquery
        WHERE
          (subquery.sender_id = users.id AND subquery.receiver_id = 1)
          OR
          (subquery.sender_id = 1 AND subquery.receiver_id = users.id)
      )
      ORDER BY users.id ASC, chatroom.updated_at DESC;



      select * from chatroom;

select users_id ,matched_users_id from users_matching where users_matching.status = 'matched' and users_id = 1 or matched_users_id = 1



i= i<a.length i++{

  
  a[i].users_id
  a[i].matched_users_id
} 


