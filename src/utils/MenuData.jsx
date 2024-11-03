import veg from "../assets/images/veg.svg"
import nonveg from "../assets/images/non_veg.svg"
import salad from '../assets/images/salad.jpg'

const data = [
    {
        id: "1",
        title: "Sandwich",
        dishes: [
            {
                item_id: '1',
                imgSrc: salad,
                altText: "",
                orderLink: "#",
                veg_non_veg: nonveg,
                name: "Urban Shredded Chicken Sandwich",
                price: 149,
                description: "Whole Grain oats soaked overnight in milk, dry fruits, raisins, exotic fruits, banana, chia, sunflower and pumpkin seeds.",
                nutrition: {
                    kcal: "250 kcal",
                    protein: "11g protein",
                    carbs: "30g Carbs",
                    fat: "5g Fat"
                }
            },
            {
                item_id: '2',
                imgSrc: salad,
                altText: "",
                orderLink: "#",
                veg_non_veg: veg,
                name: "Grilled Paneer Sandwich",
                price: 149,
                description: "Whole Grain oats soaked overnight in milk, dry fruits, raisins, exotic fruits, banana, chia, sunflower and pumpkin seeds.",
                nutrition: {
                    kcal: "250 kcal",
                    protein: "11g protein",
                    carbs: "30g Carbs",
                    fat: "5g Fat"
                }
            },
            {
                item_id: '3',
                imgSrc: salad,
                altText: "",
                orderLink: "#",
                veg_non_veg: veg,
                name: "Egg Cubes Sandwich",
                price: 119,
                description: "Whole Grain oats soaked overnight in milk, dry fruits, raisins, exotic fruits, banana, chia, sunflower and pumpkin seeds.",
                nutrition: {
                    kcal: "250 kcal",
                    protein: "11g protein",
                    carbs: "30g Carbs",
                    fat: "5g Fat"
                }
            }
        ]
    },
    {
        id: "2",
        title: "Salads",
        dishes: [
            {
                item_id: '4',
                imgSrc: salad,
                altText: "",
                orderLink: "#",
                veg_non_veg: nonveg,
                name: "Urban Shredded Chicken Salad",
                price: 149,
                description: "Whole Grain oats soaked overnight in milk, dry fruits, raisins, exotic fruits, banana, chia, sunflower and pumpkin seeds.",
                nutrition: {
                    kcal: "250 kcal",
                    protein: "11g protein",
                    carbs: "30g Carbs",
                    fat: "5g Fat"
                }
            },
            {
                item_id: '5',
                imgSrc: salad,
                altText: "",
                orderLink: "#",
                veg_non_veg: veg,
                name: "Grilled Paneer Salad",
                price: 149,
                description: "Whole Grain oats soaked overnight in milk, dry fruits, raisins, exotic fruits, banana, chia, sunflower and pumpkin seeds.",
                nutrition: {
                    kcal: "250 kcal",
                    protein: "11g protein",
                    carbs: "30g Carbs",
                    fat: "5g Fat"
                }
            },
            {
                item_id: '6',
                imgSrc: salad,
                altText: "",
                orderLink: "#",
                veg_non_veg: veg,
                name: "Egg Cubes Salad",
                price: 119,
                description: "Whole Grain oats soaked overnight in milk, dry fruits, raisins, exotic fruits, banana, chia, sunflower and pumpkin seeds.",
                nutrition: {
                    kcal: "250 kcal",
                    protein: "11g protein",
                    carbs: "30g Carbs",
                    fat: "5g Fat"
                }
            }
        ]
    }
];

export default data;