// Buffer Line 
const data= [
	{
		"id": 1,
		"is_pt": false,
		"gender": "Male",
		"username": "Alex",
		"profile_pic": "alex.jpeg",
		"gym_center": "Anytime Fitness",
		"gym_location": "Eastern",
		"interest_name": [
			"Yoga",
			"Weightlifting",
			"Injury recover"
		],
		"bio": "Impedit asperiores rerum optio dolore molestiae nesciunt eaque alias libero."
	},
	{
		"id": 2,
		"is_pt": true,
		"gender": "Female",
		"username": "So xee",
		"profile_pic": "soxee.jpeg",
		"gym_center": "Anytime Fitness",
		"gym_location": "Yau Tsim Mong",
		"interest_name": [
			"Pilates",
			"Aerobic",
			"Boxing"
		],
		"bio": "Harum rerum dolores vitae."
	},
	{
		"id": 4,
		"is_pt": true,
		"gender": "Female",
		"username": "Jennie",
		"profile_pic": "jennie.jpeg",
		"gym_center": "Anytime Fitness",
		"gym_location": "Tuen Mun",
		"interest_name": [
			"Yoga",
			"Cardio",
			"Pilates"
		],
		"bio": "Incidunt odit porro doloremque assumenda magnam ab laboriosam."
	},
	{
		"id": 5,
		"is_pt": false,
		"gender": "Male",
		"username": "Bruce",
		"profile_pic": "bruce.jpeg",
		"gym_center": "Snap Fitness",
		"gym_location": "Kwun Tong",
		"interest_name": [
			"Stretching",
			"Aerobic",
			"Boxing"
		],
		"bio": "Vel adipisci impedit harum aspernatur voluptatibus asperiores."
	},
	{
		"id": 6,
		"is_pt": true,
		"gender": "Female",
		"username": "Jisoo",
		"profile_pic": "jisoo.jpeg",
		"gym_center": "LCSD",
		"gym_location": "North",
		"interest_name": [
			"Weightlifting",
			"Cardio",
			"Injury recover"
		],
		"bio": "Incidunt odio pariatur modi vel dolore impedit quam."
	},
	{
		"id": 7,
		"is_pt": true,
		"gender": "Male",
		"username": "Adams",
		"profile_pic": "adams.jpeg",
		"gym_center": "24/7 Fitness",
		"gym_location": "Kowloon City",
		"interest_name": [
			"Yoga",
			"Aerobic",
			"Weightlifting"
		],
		"bio": "Magni ipsum cupiditate."
	},
	{
		"id": 8,
		"is_pt": true,
		"gender": "Female",
		"username": "Lisa",
		"profile_pic": "lisa.jpeg",
		"gym_center": "24/7 Fitness",
		"gym_location": "Kwun Tong",
		"interest_name": [
			"Injury recover",
			"Boxing",
			"Pilates"
		],
		"bio": "Sunt dolores fugit est dicta aut nulla."
	},
	{
		"id": 10,
		"is_pt": true,
		"gender": "Female",
		"username": "Rose",
		"profile_pic": "rose.jpeg",
		"gym_center": "Physical",
		"gym_location": "Wong Tai Sin",
		"interest_name": [
			"Boxing",
			"Cardio",
			"Aerobic"
		],
		"bio": "Quas error saepe architecto itaque."
	}
]

let isPTArray = [], notPTArray= []
data.map((profile)=>{
    profile.is_pt ? isPTArray.push(profile): notPTArray.push(profile)
})

// console.log(`sth`)
// console.log(isPTArray)
// console.log(notPTArray)

let filteredObject = {}
filteredObject["allUsers"] = data
filteredObject["is_pt"] = isPTArray
filteredObject["not_pt"] = notPTArray

console.log(filteredObject)

// React 

const [preference, updatePreference] = useState<string>("all_users")

// Pres select buttons
// update preference

filteredObject[preference] // Show these users