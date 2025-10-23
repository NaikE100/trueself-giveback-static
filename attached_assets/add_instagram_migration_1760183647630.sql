-- Migration script to add Instagram handle to existing entries table
-- Run this if you already have an entries table without the instagram column

-- Add instagram column to existing entries table
ALTER TABLE entries ADD COLUMN instagram VARCHAR(100) AFTER phone;

-- This migration is safe to run multiple times (it will fail gracefully if column already exists)
-- You can run this in your DirectAdmin MySQL database to add the Instagram field



