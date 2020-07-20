DROP TABLE dbo.watched

CREATE TABLE [watched] (
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	[recipe_id] varchar(255) NOT NULL,
    [date] DATETIME NOT NULL
	PRIMARY KEY ([author], [recipe_id]),
    FOREIGN KEY ([author]) REFERENCES users([user_id])

)