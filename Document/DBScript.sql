USE [OnlineShopping]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 12/25/2019 10:22:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[Category_ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](40) NULL,
	[Created] [datetime] NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[Category_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 12/25/2019 10:22:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[Customer_ID] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NULL,
	[Phone] [nvarchar](12) NULL,
	[Password] [nvarchar](30) NULL,
	[Picture] [nvarchar](100) NULL,
	[Addr1] [nvarchar](50) NULL,
	[Addr2] [nvarchar](50) NULL,
	[City] [nvarchar](30) NULL,
	[Stage] [nvarchar](30) NULL,
	[Country] [nvarchar](30) NULL,
	[Created] [datetime] NULL,
	[isSeller] [bit] NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[Customer_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invoices]    Script Date: 12/25/2019 10:22:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoices](
	[Invoice_Number] [int] IDENTITY(1,1) NOT NULL,
	[Order_ID] [int] NULL,
	[Invoice_Status_Code] [int] NULL,
	[Invoice_Date] [datetime] NULL,
	[Invoice_Description] [nvarchar](50) NULL,
 CONSTRAINT [PK_Invoice] PRIMARY KEY CLUSTERED 
(
	[Invoice_Number] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_Items]    Script Date: 12/25/2019 10:22:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_Items](
	[Order_Item_ID] [int] IDENTITY(1,1) NOT NULL,
	[Order_ID] [int] NULL,
	[Product_ID] [int] NULL,
	[Quantity] [int] NULL,
	[Price] [money] NULL,
 CONSTRAINT [PK_Order_Items] PRIMARY KEY CLUSTERED 
(
	[Order_Item_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 12/25/2019 10:22:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Order_ID] [int] IDENTITY(1,1) NOT NULL,
	[Customer_ID] [int] NULL,
	[Order_Status_Code] [int] NULL,
	[Order_Date] [datetime] NULL,
	[Ship_Date] [datetime] NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[Order_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 12/25/2019 10:22:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[Payment_ID] [int] IDENTITY(1,1) NOT NULL,
	[Invoice_Number] [int] NULL,
	[Payment_Type] [bit] NULL,
	[Payment_Date] [datetime] NULL,
	[Payment_Amount] [money] NULL,
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[Payment_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 12/25/2019 10:22:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[Product_ID] [int] IDENTITY(1,1) NOT NULL,
	[Category_ID] [int] NULL,
	[Image] [nvarchar](100) NULL,
	[Title] [nvarchar](50) NULL,
	[Description] [nvarchar](50) NULL,
	[Price] [money] NULL,
	[Created] [datetime] NULL,
	[OwnerID] [int] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Product_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Review]    Script Date: 12/25/2019 10:22:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Review](
	[Review_ID] [int] IDENTITY(1,1) NOT NULL,
	[Product_ID] [int] NULL,
	[Ratings] [int] NULL,
	[Comment] [nvarchar](100) NULL,
	[Created] [datetime] NULL,
	[Customer_ID] [int] NULL,
 CONSTRAINT [PK_Review] PRIMARY KEY CLUSTERED 
(
	[Review_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shipments]    Script Date: 12/25/2019 10:22:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shipments](
	[Shipment_ID] [int] IDENTITY(1,1) NOT NULL,
	[Order_ID] [int] NULL,
	[Invoice_Number] [int] NULL,
	[Shipment_tracking_number] [nvarchar](40) NULL,
	[Shipment_Date] [datetime] NULL,
 CONSTRAINT [PK_Shipment] PRIMARY KEY CLUSTERED 
(
	[Shipment_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (1, N'Phones', CAST(N'2019-11-16T01:39:50.200' AS DateTime))
INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (2, N'Books', CAST(N'2019-11-16T01:39:50.200' AS DateTime))
INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (3, N'Cosmetics', CAST(N'2019-11-16T01:39:50.200' AS DateTime))
INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (4, N'tivi', CAST(N'2019-11-22T02:08:42.313' AS DateTime))
INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (5, N'Computer', CAST(N'2019-11-22T02:26:20.570' AS DateTime))
INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (6, N'Shoe', CAST(N'2019-11-22T02:30:29.903' AS DateTime))
INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (7, N'Camera', CAST(N'2019-11-22T02:30:58.880' AS DateTime))
INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (8, N'Tablet', CAST(N'2019-11-22T04:24:39.763' AS DateTime))
INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (9, N'Watch', CAST(N'2019-11-22T15:10:48.723' AS DateTime))
INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (10, N'Laptop', CAST(N'2019-11-27T00:29:44.660' AS DateTime))
INSERT [dbo].[Category] ([Category_ID], [Name], [Created]) VALUES (11, N'PhuKien', CAST(N'2019-11-28T14:44:41.073' AS DateTime))
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[Customer] ON 

INSERT [dbo].[Customer] ([Customer_ID], [Email], [Name], [Phone], [Password], [Picture], [Addr1], [Addr2], [City], [Stage], [Country], [Created], [isSeller]) VALUES (2, N'huynhtrongnghia.htn@gmail.com', N'Huỳnh Trọng Nghĩa', N'0968376192', N'Nghia2612', NULL, N'180 Tô Hiệu', NULL, N'Hồ Chí Minh', N'Quận Tân Phú', N'Việt Nam', CAST(N'2019-11-16T01:35:33.270' AS DateTime), 1)
INSERT [dbo].[Customer] ([Customer_ID], [Email], [Name], [Phone], [Password], [Picture], [Addr1], [Addr2], [City], [Stage], [Country], [Created], [isSeller]) VALUES (3, N'test@gmail.com', N'test', N'0968376192', N'zxc123', NULL, N'69 Tô Hiệu', NULL, N'Hồ Chí Minh', N'Quận Tân Phú', N'Việt Nam', CAST(N'2019-11-16T01:36:02.890' AS DateTime), 0)
INSERT [dbo].[Customer] ([Customer_ID], [Email], [Name], [Phone], [Password], [Picture], [Addr1], [Addr2], [City], [Stage], [Country], [Created], [isSeller]) VALUES (4, N'xitun1233@gmail.com', N'Nguyễn Tiến Đạt', N'0939653939', N'zxc123', NULL, N'116 Tân Hòa Đông', N'79 Tô Hiến Thành', N'Hồ Chí Minh', N'Quận 6', N'Việt Nam', CAST(N'2019-11-18T17:02:04.503' AS DateTime), 0)
INSERT [dbo].[Customer] ([Customer_ID], [Email], [Name], [Phone], [Password], [Picture], [Addr1], [Addr2], [City], [Stage], [Country], [Created], [isSeller]) VALUES (5, N'nvhp301649712@gmail.com', N'Hằng Phương', N'0962425164', N'Phuong1604', NULL, N'227 Nguyễn Văn Cừ', NULL, N'Hồ Chí Minh', N'Quận 5', N'Việt Nam', CAST(N'2019-11-18T23:47:24.933' AS DateTime), NULL)
INSERT [dbo].[Customer] ([Customer_ID], [Email], [Name], [Phone], [Password], [Picture], [Addr1], [Addr2], [City], [Stage], [Country], [Created], [isSeller]) VALUES (6, N'minhanpro1234@gmail.com', N'Lê Minh Ân', N'0901010287', N'csdlnc', NULL, N'117 Tân Hòa Đông, Phường 14, Quận 6 (Cafe Newlink)', NULL, N'Quận 6', N'Hồ Chí Minh', N'Vietnam', CAST(N'2019-11-19T22:26:34.953' AS DateTime), 1)
INSERT [dbo].[Customer] ([Customer_ID], [Email], [Name], [Phone], [Password], [Picture], [Addr1], [Addr2], [City], [Stage], [Country], [Created], [isSeller]) VALUES (7, N'truongtuan0102@gmail.com', N'Tuấn', N'0983832833', N'tuan123', NULL, N'651 Điện Biên Phủ', N'', N'Hồ Chí Minh', N'Quận 10', N'Việt Nam', CAST(N'2019-11-19T22:28:07.733' AS DateTime), 1)
INSERT [dbo].[Customer] ([Customer_ID], [Email], [Name], [Phone], [Password], [Picture], [Addr1], [Addr2], [City], [Stage], [Country], [Created], [isSeller]) VALUES (8, N'zxczxczxcxzc@gmail.com', N'Thiên Phước', N'0789345893', N'23423', NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2019-11-19T22:28:55.913' AS DateTime), NULL)
INSERT [dbo].[Customer] ([Customer_ID], [Email], [Name], [Phone], [Password], [Picture], [Addr1], [Addr2], [City], [Stage], [Country], [Created], [isSeller]) VALUES (9, N'huynhtanminh@gmail.com', N'Huỳnh Tấn Minh', N'09112233445', N'zxc123', NULL, N'153A Lý thường kiệt ( Toyota Lý thường kiệt)', NULL, N'Quận Tân Bình', N'Hồ Chí Minh', N'Viet Nam', CAST(N'2019-11-19T22:29:29.003' AS DateTime), NULL)
INSERT [dbo].[Customer] ([Customer_ID], [Email], [Name], [Phone], [Password], [Picture], [Addr1], [Addr2], [City], [Stage], [Country], [Created], [isSeller]) VALUES (10, N'test1@gmail.com', N'Nguyễn Văn A', N'0986380524', N'zxc123', NULL, N'285 CMT8', NULL, N'Ho Chi Minh City', N'Quận Tân Bình', N'Vietnam', CAST(N'2019-11-28T14:39:40.493' AS DateTime), 1)
INSERT [dbo].[Customer] ([Customer_ID], [Email], [Name], [Phone], [Password], [Picture], [Addr1], [Addr2], [City], [Stage], [Country], [Created], [isSeller]) VALUES (11, N'test2@gmail.com', N'Trần Hồ Thiện Sinh', N'0983363808', N'zxc123', NULL, N'66 Trường Chinh', NULL, N'Hồ Chí Minh', N'Quận Tân Bình', N'Vietnam', CAST(N'2019-11-28T14:51:08.580' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Customer] OFF
SET IDENTITY_INSERT [dbo].[Invoices] ON 

INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (7, 7, 1, CAST(N'2019-11-28T01:33:58.620' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (8, 8, 1, CAST(N'2019-11-28T01:43:32.550' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (9, 9, 2, CAST(N'2019-11-28T02:04:54.793' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (10, 10, 1, CAST(N'2019-11-28T02:09:34.087' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (11, 11, 3, CAST(N'2019-11-28T04:28:01.880' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (12, 12, 1, CAST(N'2019-11-28T05:04:20.690' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (13, 13, 2, CAST(N'2019-11-28T14:25:47.553' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (14, 14, 1, CAST(N'2019-11-28T14:32:41.140' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (15, 15, 1, CAST(N'2019-11-28T14:53:02.760' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (16, 16, 1, CAST(N'2019-11-28T14:53:59.847' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (17, 17, 2, CAST(N'2019-11-28T16:25:40.453' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (18, 18, 3, CAST(N'2019-11-28T16:25:57.837' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (19, 19, 2, CAST(N'2019-11-28T18:46:19.567' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (20, 20, 1, CAST(N'2019-12-03T11:14:48.090' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (21, 21, 3, CAST(N'2019-12-11T15:16:43.867' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (22, 22, 1, CAST(N'2019-12-11T15:17:32.790' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (23, 23, 1, CAST(N'2019-12-25T13:57:13.907' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (24, 24, 2, CAST(N'2019-12-25T14:01:38.450' AS DateTime), N'test')
INSERT [dbo].[Invoices] ([Invoice_Number], [Order_ID], [Invoice_Status_Code], [Invoice_Date], [Invoice_Description]) VALUES (25, 25, 3, CAST(N'2019-12-25T14:03:06.113' AS DateTime), N'test')
SET IDENTITY_INSERT [dbo].[Invoices] OFF
SET IDENTITY_INSERT [dbo].[Order_Items] ON 

INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (1, 7, 16, 1, 11390000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (2, 7, 7, 3, 53099.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (3, 8, 18, 1, 5690000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (4, 8, 15, 2, 8990000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (5, 9, 4, 1, 33990000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (6, 10, 7, 1, 53099.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (7, 10, 9, 2, 49998.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (8, 11, 7, 5, 53099.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (9, 11, 5, 1, 26990000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (10, 12, 14, 1, 4990000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (11, 12, 11, 3, 6990000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (12, 12, 19, 1, 37690000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (13, 13, 19, 1, 37690000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (14, 14, 12, 1, 22990000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (15, 14, 20, 2, 800000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (16, 14, 12, 1, 22990000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (17, 16, 12, 1, 22990000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (18, 16, 20, 2, 800000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (19, 17, 24, 2, 1090000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (20, 18, 22, 1, 1190000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (21, 18, 23, 1, 1190000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (22, 19, 12, 1, 22990000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (23, 19, 20, 2, 800000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (24, 20, 15, 1, 8990000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (25, 20, 24, 2, 1090000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (26, 21, 24, 2, 1090000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (27, 21, 22, 1, 1190000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (28, 22, 24, 2, 1090000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (29, 23, 22, 1, 1190000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (30, 23, 23, 2, 1190000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (31, 23, 19, 1, 37690000.0000)
INSERT [dbo].[Order_Items] ([Order_Item_ID], [Order_ID], [Product_ID], [Quantity], [Price]) VALUES (32, 25, 16, 1, 11390000.0000)
SET IDENTITY_INSERT [dbo].[Order_Items] OFF
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (7, 2, 2, CAST(N'2019-11-28T01:33:58.600' AS DateTime), CAST(N'2019-12-01T01:33:58.600' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (8, 9, 2, CAST(N'2019-11-28T01:43:32.543' AS DateTime), CAST(N'2019-12-01T01:43:32.543' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (9, 5, 1, CAST(N'2019-11-28T02:04:54.790' AS DateTime), CAST(N'2019-12-01T02:04:54.790' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (10, 5, 2, CAST(N'2019-11-28T02:09:34.083' AS DateTime), CAST(N'2019-12-01T02:09:34.083' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (11, 2, 3, CAST(N'2019-11-28T04:28:01.880' AS DateTime), CAST(N'2019-12-01T04:28:01.880' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (12, 9, 2, CAST(N'2019-11-28T05:04:20.680' AS DateTime), CAST(N'2019-12-01T05:04:20.680' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (13, 2, 1, CAST(N'2019-11-28T14:25:47.550' AS DateTime), CAST(N'2019-12-01T14:25:47.550' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (14, 2, 2, CAST(N'2019-11-28T14:32:41.123' AS DateTime), CAST(N'2019-12-01T14:32:41.123' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (15, 11, 2, CAST(N'2019-11-28T14:53:02.753' AS DateTime), CAST(N'2019-12-01T14:53:02.753' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (16, 11, 2, CAST(N'2019-11-28T14:53:59.840' AS DateTime), CAST(N'2019-12-01T14:53:59.840' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (17, 9, 1, CAST(N'2019-11-28T16:25:40.450' AS DateTime), CAST(N'2019-12-01T16:25:40.450' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (18, 9, 3, CAST(N'2019-11-28T16:25:57.830' AS DateTime), CAST(N'2019-12-01T16:25:57.830' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (19, 2, 1, CAST(N'2019-11-28T18:46:19.563' AS DateTime), CAST(N'2019-12-01T18:46:19.563' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (20, 2, 2, CAST(N'2019-12-03T11:14:48.080' AS DateTime), CAST(N'2019-12-06T11:14:48.080' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (21, 2, 3, CAST(N'2019-12-11T15:16:43.863' AS DateTime), CAST(N'2019-12-14T15:16:43.863' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (22, 2, 2, CAST(N'2019-12-11T15:17:32.787' AS DateTime), CAST(N'2019-12-14T15:17:32.787' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (23, 2, 2, CAST(N'2019-12-25T13:57:13.900' AS DateTime), CAST(N'2019-12-28T13:57:13.900' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (24, 2, 1, CAST(N'2019-12-25T14:01:38.440' AS DateTime), CAST(N'2019-12-28T14:01:38.440' AS DateTime))
INSERT [dbo].[Orders] ([Order_ID], [Customer_ID], [Order_Status_Code], [Order_Date], [Ship_Date]) VALUES (25, 2, 3, CAST(N'2019-12-25T14:03:06.110' AS DateTime), CAST(N'2019-12-28T14:03:06.110' AS DateTime))
SET IDENTITY_INSERT [dbo].[Orders] OFF
SET IDENTITY_INSERT [dbo].[Payments] ON 

INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (1, 7, 1, CAST(N'2019-11-28T01:33:58.643' AS DateTime), 11549297.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (2, 8, 1, CAST(N'2019-11-28T01:43:32.573' AS DateTime), 23670000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (3, 9, 0, CAST(N'2019-11-28T02:04:54.803' AS DateTime), 33990000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (4, 10, 1, CAST(N'2019-11-28T02:09:34.097' AS DateTime), 153095.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (5, 11, 0, CAST(N'2019-11-28T04:28:01.890' AS DateTime), 27255495.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (6, 12, 1, CAST(N'2019-11-28T05:04:20.707' AS DateTime), 63650000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (7, 13, 0, CAST(N'2019-11-28T14:25:47.560' AS DateTime), 37690000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (8, 14, 1, CAST(N'2019-11-28T14:32:41.150' AS DateTime), 22990000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (9, 15, 1, CAST(N'2019-11-28T14:53:02.770' AS DateTime), 24590000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (10, 16, 1, CAST(N'2019-11-28T14:53:59.863' AS DateTime), 24590000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (11, 17, 0, CAST(N'2019-11-28T16:25:40.463' AS DateTime), 2180000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (12, 18, 0, CAST(N'2019-11-28T16:25:57.843' AS DateTime), 2380000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (13, 19, 0, CAST(N'2019-11-28T18:46:19.577' AS DateTime), 24590000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (14, 20, 1, CAST(N'2019-12-03T11:14:48.123' AS DateTime), 11170000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (15, 21, 0, CAST(N'2019-12-11T15:16:43.877' AS DateTime), 3370000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (16, 22, 1, CAST(N'2019-12-11T15:17:32.800' AS DateTime), 2180000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (17, 23, 1, CAST(N'2019-12-25T13:57:13.913' AS DateTime), 3570000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (18, 24, 0, CAST(N'2019-12-25T14:01:38.457' AS DateTime), 37690000.0000)
INSERT [dbo].[Payments] ([Payment_ID], [Invoice_Number], [Payment_Type], [Payment_Date], [Payment_Amount]) VALUES (19, 25, 0, CAST(N'2019-12-25T14:03:06.120' AS DateTime), 11390000.0000)
SET IDENTITY_INSERT [dbo].[Payments] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (4, 1, N'https://cdn.tgdd.vn/Products/Images/42/200533/iphone-11-pro-max-green-400x460.png', N'iPhone 11 Pro Max 64GB', N'Trong nều người mong muốn sở hữu trên tay và s', 33990000.0000, CAST(N'2019-11-16T01:48:00.853' AS DateTime), 2)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (5, 1, N'https://cdn.tgdd.vn/Products/Images/42/206176/samsung-galaxy-note-10-plus-silver-400x460.png', N'Samsung Note 10 Plus', N'Đặc điểm nổi bật của Samsung Galaxy Note 10+', 26990000.0000, CAST(N'2019-11-16T01:48:53.500' AS DateTime), 2)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (7, 2, N'https://salt.tikicdn.com/cache/550x550/ts/product/47/05/40/ee3acc4b88f6d464a97b8edc285807bf.jpg', N'Đắc Nhân Tâm', N'Tại sao Đắc Nhân Tâm luôn ', 53099.0000, CAST(N'2019-11-16T01:50:29.820' AS DateTime), 6)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (9, 2, N'https://salt.tikicdn.com/cache/550x550/ts/product/66/5f/5a/312bac222584d52fea5e9d644369b254.jpg', N'Nhà Giả Kim', N'Đdfgdfgdfgf', 49998.0000, CAST(N'2019-11-16T01:52:12.857' AS DateTime), 6)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (10, 1, N'https://amazonowebappilication.s3-ap-southeast-1.amazonaws.com/1574336857968', N'iPhone 11 64GB', N'iPhone 11 64gb chính hãng VN/A', 18990000.0000, CAST(N'2019-11-21T23:39:46.313' AS DateTime), 2)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (11, 1, N'https://amazonowebappilication.s3.amazonaws.com/1574355184620', N'Samsung A50s Xanh', N'Hệ thống 3 camera nhiều tính năng', 6990000.0000, CAST(N'2019-11-21T23:53:05.400' AS DateTime), 2)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (12, 1, N'https://amazonowebappilication.s3.ap-southeast-1.amazonaws.com/1574355366994', N'Điện thoại Samsung Galaxy S10+', N'Thiết kế sang trọng, bóng bẩy', 22990000.0000, CAST(N'2019-11-21T23:56:07.320' AS DateTime), 6)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (13, 1, N'https://amazonowebappilication.s3.amazonaws.com/1574370043925', N'Oppo A9 (2020)', N'zxc', 6990000.0000, CAST(N'2019-11-22T04:00:44.593' AS DateTime), 2)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (14, 1, N'https://amazonowebappilication.s3.amazonaws.com/1574370270766', N'Xiaomi Redmi Note 8 (4GB/64GB)', N'4 camera chất lượng hàng đầu', 4990000.0000, CAST(N'2019-11-22T04:04:31.430' AS DateTime), 2)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (15, 8, N'https://amazonowebappilication.s3.amazonaws.com/1574371530762', N'iPad Wifi 32GB (2018)', N'Pad 6th Wifi 32GB với nhiều nâng cấp', 8990000.0000, CAST(N'2019-11-22T04:25:31.557' AS DateTime), 2)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (16, 9, N'https://amazonowebappilication.s3.amazonaws.com/1574410397781', N'Apple Watch S4 GPS 44mm viền nhôm dây cao su', N'Màn hình 44m giúp hiển thị thông tin dễ nhì', 11390000.0000, CAST(N'2019-11-22T15:13:18.273' AS DateTime), 7)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (17, 9, N'https://amazonowebappilication.s3.ap-southeast-1.amazonaws.com/1574410485398', N'Apple Watch S4 GPS 44mm viền nhôm dây vải', N'viền nhôm dây vải', 11990000.0000, CAST(N'2019-11-22T15:14:45.690' AS DateTime), 7)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (18, 9, N'https://amazonowebappilication.s3.ap-southeast-1.amazonaws.com/1574410531940', N'Apple Watch S3 GPS, 38mm viền nhôm, dây cao su', N'38mm viền nhôm, dây cao su', 5690000.0000, CAST(N'2019-11-22T15:15:32.247' AS DateTime), 7)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (19, 10, N'https://amazonowebappilication.s3.amazonaws.com/1574849374589', N'Laptop MacBook Pro 2018 Touch i5 2.3GHz/8GB/256GB', N'Màn hình Retina độ phân giải 2K', 37690000.0000, CAST(N'2019-11-27T17:09:35.190' AS DateTime), 7)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (20, 11, N'https://amazonowebappilication.s3.amazonaws.com/1574927248396', N'Anker PowerCore Lite A1232 10.000 mAh Type-C', N'Thiết kế gọn nhẹ, siêu mỏng, dễ dàng mang theo ', 800000.0000, CAST(N'2019-11-28T14:47:29.090' AS DateTime), 10)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (21, 11, N'https://amazonowebappilication.s3.ap-southeast-1.amazonaws.com/1574927291808', N'Polymer 10.000 mAh Energizer UE10046 Xám', N'thiết kế bo tròn, gọn nhẹ, dễ dàng mang theo', 550000.0000, CAST(N'2019-11-28T14:48:12.130' AS DateTime), 10)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (22, 11, N'https://amazonowebappilication.s3.ap-southeast-1.amazonaws.com/1574927331801', N'Tai nghe chụp tai Bluetooth Sony WH-CH510/BC Đen', N'thiết kế phù hợp với các người yêu âm nhạc', 1190000.0000, CAST(N'2019-11-28T14:48:52.047' AS DateTime), 10)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (23, 11, N'https://amazonowebappilication.s3.ap-southeast-1.amazonaws.com/1574927365018', N'Bao da Galaxy Note 10 Plus LED View Samsung Đen', N'Kiểu dáng thời trang và đẹp mắt, độc và lạ.', 1190000.0000, CAST(N'2019-11-28T14:49:25.250' AS DateTime), 10)
INSERT [dbo].[Product] ([Product_ID], [Category_ID], [Image], [Title], [Description], [Price], [Created], [OwnerID]) VALUES (24, 11, N'https://amazonowebappilication.s3.ap-southeast-1.amazonaws.com/1574927412270', N'Cáp Type C - Lightning 2m Apple MKQ42 Trắng', N'Dây dài 2 m thoải mái để bạn vừa sạc vừa dùng máy', 1090000.0000, CAST(N'2019-11-28T14:50:12.550' AS DateTime), 10)
SET IDENTITY_INSERT [dbo].[Product] OFF
SET IDENTITY_INSERT [dbo].[Review] ON 

INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (1, 4, 5, N'Camera quá đẹp', CAST(N'2019-11-23T15:13:03.983' AS DateTime), 2)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (2, 4, 5, N'Pin trâu', CAST(N'2019-11-23T15:13:16.077' AS DateTime), 3)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (3, 4, 4, N'Cấu hình tốt', CAST(N'2019-11-23T15:13:50.013' AS DateTime), 4)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (4, 5, 4, N'Máy tốt, pin xài được lâu nhưng đặt hàng hơi lâu mới nhận được', CAST(N'2019-11-23T15:22:54.480' AS DateTime), 4)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (5, 5, 5, N'Note 10 không còn gì để bàn cãi về hiệu năng', CAST(N'2019-11-24T00:30:33.807' AS DateTime), 9)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (6, 4, 5, N'Face ID nhanh, Camera chụp ban đêm siêu nét', CAST(N'2019-11-24T00:56:31.027' AS DateTime), 7)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (7, 7, 5, N'Sách hay và ý nghĩa', CAST(N'2019-11-24T01:01:44.420' AS DateTime), 5)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (8, 7, 4, N'Sách hay nhưng có nhiều phần hơi khó hiểu', CAST(N'2019-11-24T01:02:31.630' AS DateTime), 2)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (9, 11, 3, N'test', CAST(N'2019-11-24T01:55:16.080' AS DateTime), 3)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (10, 11, 4, N'zzzz', CAST(N'2019-11-24T01:55:38.800' AS DateTime), 2)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (11, 10, 3, N'dssd', CAST(N'2019-11-24T02:21:23.900' AS DateTime), 2)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (12, 12, 5, N'good', CAST(N'2019-11-24T02:21:45.483' AS DateTime), 2)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (13, 10, 5, N'Màu xanh mint đẹp', CAST(N'2019-11-24T02:23:30.250' AS DateTime), 8)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (14, 16, 5, N'Sản phẩm đẹp, sang trọng', CAST(N'2019-11-27T00:29:10.283' AS DateTime), 4)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (15, 19, 5, N'Máy cấu hình mạnh, đẹp', CAST(N'2019-11-28T14:25:40.837' AS DateTime), 2)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (16, 20, 5, N'Thương hiệu Anker không còn gì để bàn ', CAST(N'2019-11-28T14:54:44.583' AS DateTime), 11)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (17, 5, 3, N'zxc', CAST(N'2019-12-11T19:27:50.553' AS DateTime), 2)
INSERT [dbo].[Review] ([Review_ID], [Product_ID], [Ratings], [Comment], [Created], [Customer_ID]) VALUES (18, 22, 4, N'Good', CAST(N'2019-12-25T13:55:23.430' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[Review] OFF
SET IDENTITY_INSERT [dbo].[Shipments] ON 

INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (1, 7, 7, N'1GHNA8F7', CAST(N'2019-12-01T01:33:58.637' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (2, 8, 8, N'2GHN20D6', CAST(N'2019-12-01T01:43:32.567' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (3, 9, 9, N'3GHNF097', CAST(N'2019-12-01T02:04:54.800' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (4, 10, 10, N'4GHN0CB4', CAST(N'2019-12-01T02:09:34.093' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (5, 11, 11, N'5GHN8CBE', CAST(N'2019-12-01T04:28:01.887' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (6, 12, 12, N'6GHN4311', CAST(N'2019-12-01T05:04:20.703' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (7, 13, 13, N'7GHNAE9F', CAST(N'2019-12-01T14:25:47.560' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (8, 14, 14, N'8GHN16CA', CAST(N'2019-12-01T14:32:41.150' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (9, 15, 15, N'9GHN245A', CAST(N'2019-12-01T14:53:02.767' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (10, 16, 16, N'10GHN5405', CAST(N'2019-12-01T14:53:59.860' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (11, 17, 17, N'11GHN6222', CAST(N'2019-12-01T16:25:40.460' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (12, 18, 18, N'12GHNC570', CAST(N'2019-12-01T16:25:57.840' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (13, 19, 19, N'13GHN9000', CAST(N'2019-12-01T18:46:19.573' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (14, 20, 20, N'14GHNE026', CAST(N'2019-12-06T11:14:48.117' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (15, 21, 21, N'15GHN421F', CAST(N'2019-12-14T15:16:43.873' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (16, 22, 22, N'16GHN5689', CAST(N'2019-12-14T15:17:32.797' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (17, 23, 23, N'17GHN70E3', CAST(N'2019-12-28T13:57:13.910' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (18, 24, 24, N'18GHNA753', CAST(N'2019-12-28T14:01:38.453' AS DateTime))
INSERT [dbo].[Shipments] ([Shipment_ID], [Order_ID], [Invoice_Number], [Shipment_tracking_number], [Shipment_Date]) VALUES (19, 25, 25, N'19GHNE384', CAST(N'2019-12-28T14:03:06.117' AS DateTime))
SET IDENTITY_INSERT [dbo].[Shipments] OFF
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_Orders] FOREIGN KEY([Order_ID])
REFERENCES [dbo].[Orders] ([Order_ID])
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoices_Orders]
GO
ALTER TABLE [dbo].[Order_Items]  WITH CHECK ADD  CONSTRAINT [FK_Order_Items_Orders] FOREIGN KEY([Order_ID])
REFERENCES [dbo].[Orders] ([Order_ID])
GO
ALTER TABLE [dbo].[Order_Items] CHECK CONSTRAINT [FK_Order_Items_Orders]
GO
ALTER TABLE [dbo].[Order_Items]  WITH CHECK ADD  CONSTRAINT [FK_Order_Items_Product] FOREIGN KEY([Product_ID])
REFERENCES [dbo].[Product] ([Product_ID])
GO
ALTER TABLE [dbo].[Order_Items] CHECK CONSTRAINT [FK_Order_Items_Product]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Customer] FOREIGN KEY([Customer_ID])
REFERENCES [dbo].[Customer] ([Customer_ID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Customer]
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD  CONSTRAINT [FK_Payments_Invoices] FOREIGN KEY([Invoice_Number])
REFERENCES [dbo].[Invoices] ([Invoice_Number])
GO
ALTER TABLE [dbo].[Payments] CHECK CONSTRAINT [FK_Payments_Invoices]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Category] FOREIGN KEY([Category_ID])
REFERENCES [dbo].[Category] ([Category_ID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Category]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Customer] FOREIGN KEY([OwnerID])
REFERENCES [dbo].[Customer] ([Customer_ID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Customer]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Product] FOREIGN KEY([Product_ID])
REFERENCES [dbo].[Product] ([Product_ID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Product]
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD  CONSTRAINT [FK_Review_Customer] FOREIGN KEY([Customer_ID])
REFERENCES [dbo].[Customer] ([Customer_ID])
GO
ALTER TABLE [dbo].[Review] CHECK CONSTRAINT [FK_Review_Customer]
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD  CONSTRAINT [FK_Review_Product] FOREIGN KEY([Product_ID])
REFERENCES [dbo].[Product] ([Product_ID])
GO
ALTER TABLE [dbo].[Review] CHECK CONSTRAINT [FK_Review_Product]
GO
ALTER TABLE [dbo].[Shipments]  WITH CHECK ADD  CONSTRAINT [FK_Shipments_Invoices] FOREIGN KEY([Invoice_Number])
REFERENCES [dbo].[Invoices] ([Invoice_Number])
GO
ALTER TABLE [dbo].[Shipments] CHECK CONSTRAINT [FK_Shipments_Invoices]
GO
ALTER TABLE [dbo].[Shipments]  WITH CHECK ADD  CONSTRAINT [FK_Shipments_Orders] FOREIGN KEY([Order_ID])
REFERENCES [dbo].[Orders] ([Order_ID])
GO
ALTER TABLE [dbo].[Shipments] CHECK CONSTRAINT [FK_Shipments_Orders]
GO
