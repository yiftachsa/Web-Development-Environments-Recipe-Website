CREATE TABLE [dbo].[users]
(
	[user_id] [UNIQUEIDENTIFIER] PRIMARY KEY NOT NULL default NEWID(),
	[username] [varchar](30) NOT NULL UNIQUE,
	[password] [varchar](300) NOT NULL,
	[firstName] [varchar](30) NOT NULL,
	[lastName] [varchar](30) NOT NULL,
	[country] [varchar](40) NOT NULL,
	[email] [varchar](40) NOT NULL,
	[photoLink] [varchar](300)
)

