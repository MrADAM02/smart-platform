CREATE TABLE `faqs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question_ar` text NOT NULL,
	`question_en` text NOT NULL,
	`answer_ar` text NOT NULL,
	`answer_en` text NOT NULL,
	`sort` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`icon` text DEFAULT 'lucide:box' NOT NULL,
	`name_ar` text NOT NULL,
	`name_en` text NOT NULL,
	`summary_ar` text DEFAULT '' NOT NULL,
	`summary_en` text DEFAULT '' NOT NULL,
	`features_ar` text DEFAULT '' NOT NULL,
	`features_en` text DEFAULT '' NOT NULL,
	`sort` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
CREATE TABLE `requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`product` text,
	`name` text NOT NULL,
	`company` text,
	`email` text NOT NULL,
	`phone` text,
	`message` text,
	`locale` text DEFAULT 'ar' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sectors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`icon` text DEFAULT 'lucide:building' NOT NULL,
	`title_ar` text NOT NULL,
	`title_en` text NOT NULL,
	`sort` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`icon` text DEFAULT 'lucide:layers' NOT NULL,
	`title_ar` text NOT NULL,
	`title_en` text NOT NULL,
	`summary_ar` text DEFAULT '' NOT NULL,
	`summary_en` text DEFAULT '' NOT NULL,
	`body_ar` text DEFAULT '' NOT NULL,
	`body_en` text DEFAULT '' NOT NULL,
	`highlight_ar` text DEFAULT '' NOT NULL,
	`highlight_en` text DEFAULT '' NOT NULL,
	`sort` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT true NOT NULL,
	`featured` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `services_slug_unique` ON `services` (`slug`);--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`value` integer NOT NULL,
	`suffix` text DEFAULT '+' NOT NULL,
	`label_ar` text NOT NULL,
	`label_en` text NOT NULL,
	`sort` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `steps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title_ar` text NOT NULL,
	`title_en` text NOT NULL,
	`description_ar` text DEFAULT '' NOT NULL,
	`description_en` text DEFAULT '' NOT NULL,
	`sort` integer DEFAULT 0 NOT NULL
);
