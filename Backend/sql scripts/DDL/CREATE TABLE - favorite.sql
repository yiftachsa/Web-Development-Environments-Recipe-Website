DROP TABLE dbo.favorite
CREATE TABLE [favorite] (
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	[recipe_id] varchar(255) NOT NULL,
	PRIMARY KEY ([author], [recipe_id]),
    FOREIGN KEY ([author]) REFERENCES users([user_id])
)