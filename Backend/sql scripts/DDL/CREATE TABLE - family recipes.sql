CREATE TABLE [dbo].[family_recipes]
(
    [recipe_id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
    [author] [UNIQUEIDENTIFIER] NOT NULL,
    [title] [varchar](300) NOT NULL,
    [photoLink] [varchar](300) NOT NULL,
    [time] [INTEGER] NOT NULL,
    [veganVegetarian] [varchar](10)NOT NULL CHECK (veganVegetarian IN('vegan', 'vegetarian', 'non')),
    [glutenFree] [bit] NOT NULL,
    [details] [text] NOT NULL,
    [instructions] [text] NOT NULL,
    [yeild] [INTEGER] NOT NULL,
    [ingredients] [text] NOT NULL,
	[detailedInstructions] [text],
    PRIMARY KEY (author, title),
    FOREIGN KEY (author) REFERENCES users(user_id)
)