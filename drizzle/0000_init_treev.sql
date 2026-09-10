CREATE TABLE `meta` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `proofs` (
	`id` text PRIMARY KEY NOT NULL,
	`node_id` text NOT NULL,
	`note` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`node_id`) REFERENCES `skill_nodes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `skill_nodes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`order` integer NOT NULL,
	`state` text NOT NULL,
	`xp_reward` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `streaks` (
	`id` text PRIMARY KEY NOT NULL,
	`current_days` integer NOT NULL,
	`longest_days` integer NOT NULL,
	`last_proof_date` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`level` integer NOT NULL,
	`title` text NOT NULL,
	`xp` integer NOT NULL,
	`avatar_uri` text
);
