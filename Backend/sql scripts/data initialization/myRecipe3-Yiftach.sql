INSERT INTO dbo.users_recipes ( author, title, photoLink, time, veganVegetarian, glutenFree, details, instructions, yeild, ingredients, detailedInstructions)
VALUES ('7264f618-2d36-4cb6-9d21-c53a22166a47', 'Fruit n Yogurt Swirl Pops', 'https://res.cloudinary.com/ipemeryif/image/upload/v1591612416/54f0e29e836ff_-_fruit-yogurt-swirl-pops-recipe-wdy0714-s2_tt4utf.jpg', 25, 'vegetarian', 1,'Super fast and easy, these homemade pops are a healthier alternative to store-bought frozen treats.', 'Using a food processor, purée the fruit (and sugar, if using fresh fruit) until smooth. Pour into a resealable bag or squeeze bottle. Spoon the yogurt into a resealable bag or squeeze bottle. If using resealable bags, snip off a corner from each. Alternately squeeze the yogurt and purée into the molds to create swirls. Insert sticks according to directions and freeze overnight.', 10, '[{"amount": 1,"unit": "lb.","name": "fresh or frozen fruit"}, {"amount": 2,"unit": "tbsp","name": "granulated sugar (only if using fresh fruit)"},{"amount": 2,"unit": "cups","name": "vanilla yogurt"},{"amount": 10,"unit": "","name": "Ice pop molds"},{"amount": 10,"unit": "","name": "ice pop sticks"}]','[
    {
        "name": "",
        "steps": [
            {
                "number": 1,
                "step": "Using a food processor, purée the fruit (and sugar, if using fresh fruit) until smooth. Pour into a resealable bag or squeeze bottle.",
                "step_equipment": [
                    "resealable bag or squeeze bottle",
                    "food processor"
                ],
                "step_ingredients": [
                    "fresh or frozen fruit",
                    "granulated sugar"
                ]
            },
            {
                "number": 2,
                "step": "Spoon the yogurt into a resealable bag or squeeze bottle. If using resealable bags, snip off a corner from each. Alternately squeeze the yogurt and purée into the molds to create swirls. Insert sticks according to directions and freeze overnight.",
                "step_equipment": [
					"ice pop molds",
                    "ice pop sticks"
				],
                "step_ingredients": [
					"vanilla yogurt"
				]
            }
        ]
    }
]')