USE [master]
GO
/****** Object:  Database [ChatbotDB]    Script Date: 1/17/2020 8:38:20 AM ******/
CREATE DATABASE [ChatbotDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ChatbotDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\ChatbotDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ChatbotDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\ChatbotDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [ChatbotDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ChatbotDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ChatbotDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ChatbotDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ChatbotDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ChatbotDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ChatbotDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [ChatbotDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ChatbotDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ChatbotDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ChatbotDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ChatbotDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ChatbotDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ChatbotDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ChatbotDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ChatbotDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ChatbotDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ChatbotDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ChatbotDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ChatbotDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ChatbotDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ChatbotDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ChatbotDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ChatbotDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ChatbotDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ChatbotDB] SET  MULTI_USER 
GO
ALTER DATABASE [ChatbotDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ChatbotDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ChatbotDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ChatbotDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ChatbotDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ChatbotDB] SET QUERY_STORE = OFF
GO
USE [ChatbotDB]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 1/17/2020 8:38:20 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 1/17/2020 8:38:20 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invoices]    Script Date: 1/17/2020 8:38:20 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_Items]    Script Date: 1/17/2020 8:38:20 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 1/17/2020 8:38:20 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 1/17/2020 8:38:20 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Phone]    Script Date: 1/17/2020 8:38:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Phone](
	[Phone_ID] [int] NOT NULL,
	[Announced Day] [date] NULL,
	[Dimensions] [nchar](10) NULL,
	[Weight] [nchar](10) NULL,
	[SIM] [nchar](10) NULL,
	[Screen Type] [nchar](10) NULL,
	[Screen Size] [nchar](10) NULL,
	[Screen Resolution] [nchar](10) NULL,
	[OS] [nchar](10) NULL,
	[Chipset] [nchar](10) NULL,
	[RAM] [nchar](10) NULL,
	[Interal Storage] [nchar](10) NULL,
	[Main Camera] [nchar](10) NULL,
	[Main Camera Feature] [nchar](10) NULL,
	[Selfie Camera] [nchar](10) NULL,
	[Selfie Camera Feature] [nchar](10) NULL,
	[WLAN] [nchar](10) NULL,
	[Bluetooth] [nchar](10) NULL,
	[GPS] [nchar](10) NULL,
	[NFC] [nchar](10) NULL,
	[USB] [nchar](10) NULL,
	[Unlock] [nchar](10) NULL,
	[Battery] [nchar](10) NULL,
	[Charging] [nchar](10) NULL,
	[Colors] [nchar](10) NULL,
 CONSTRAINT [PK_Phone] PRIMARY KEY CLUSTERED 
(
	[Phone_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 1/17/2020 8:38:20 AM ******/
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
	[ProductDetail_ID] [int] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Product_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Review]    Script Date: 1/17/2020 8:38:20 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shipments]    Script Date: 1/17/2020 8:38:20 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
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
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Phone] FOREIGN KEY([ProductDetail_ID])
REFERENCES [dbo].[Phone] ([Phone_ID])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Phone]
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
USE [master]
GO
ALTER DATABASE [ChatbotDB] SET  READ_WRITE 
GO
