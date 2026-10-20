CREATE TABLE `page_views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`day` text NOT NULL,
	`path` text NOT NULL,
	`locale` text DEFAULT 'ar' NOT NULL,
	`referrer` text,
	`device` text DEFAULT 'desktop' NOT NULL,
	`country` text,
	`visitor` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `page_views_day_idx` ON `page_views` (`day`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`icon` text DEFAULT 'lucide:briefcase' NOT NULL,
	`title_ar` text NOT NULL,
	`title_en` text NOT NULL,
	`client_ar` text DEFAULT '' NOT NULL,
	`client_en` text DEFAULT '' NOT NULL,
	`sector_ar` text DEFAULT '' NOT NULL,
	`sector_en` text DEFAULT '' NOT NULL,
	`year` integer,
	`summary_ar` text DEFAULT '' NOT NULL,
	`summary_en` text DEFAULT '' NOT NULL,
	`sort` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`featured` integer DEFAULT true NOT NULL
);
