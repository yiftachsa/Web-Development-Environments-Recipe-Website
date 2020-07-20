CREATE TABLE [dbo].[meal_plan]
(
    [user_id] [UNIQUEIDENTIFIER] NOT NULL,
    [recipe_id] [INTEGER] NOT NULL,
    [position] [INTEGER] NOT NULL,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)