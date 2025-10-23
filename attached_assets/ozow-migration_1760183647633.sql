-- TrueSelf Database Migration for Ozow Integration
-- UNFILTERED VENTURES (PTY)LTD

-- Add Ozow-specific fields to entries table
ALTER TABLE entries 
ADD COLUMN ozow_transaction_id VARCHAR(255) NULL COMMENT 'Ozow transaction ID from payment response',
ADD COLUMN ozow_status VARCHAR(50) NULL COMMENT 'Ozow payment status',
ADD COLUMN payment_gateway ENUM('payfast', 'ozow') DEFAULT 'ozow' COMMENT 'Payment gateway used for this entry';

-- Update existing entries to use Ozow as default gateway
UPDATE entries SET payment_gateway = 'ozow' WHERE payment_gateway IS NULL;

-- Add indexes for better performance
CREATE INDEX idx_ozow_transaction_id ON entries(ozow_transaction_id);
CREATE INDEX idx_payment_gateway ON entries(payment_gateway);
CREATE INDEX idx_payment_status ON entries(payment_status);

-- Add comments to existing columns for clarity
ALTER TABLE entries 
MODIFY COLUMN payment_id VARCHAR(255) COMMENT 'Unique payment identifier for tracking',
MODIFY COLUMN payment_status ENUM('pending', 'completed', 'failed', 'cancelled') COMMENT 'Current payment status',
MODIFY COLUMN payment_date TIMESTAMP NULL COMMENT 'Date when payment was processed';

-- Create a view for payment analytics
CREATE VIEW payment_analytics AS
SELECT 
    payment_gateway,
    payment_status,
    COUNT(*) as entry_count,
    SUM(CASE WHEN payment_status = 'completed' THEN 70.00 ELSE 0 END) as total_amount,
    SUM(CASE WHEN payment_status = 'completed' THEN 6.86 ELSE 0 END) as healthcare_donation,
    SUM(CASE WHEN payment_status = 'completed' THEN 2.94 ELSE 0 END) as mental_health_donation,
    DATE(payment_date) as payment_date
FROM entries 
WHERE payment_date IS NOT NULL
GROUP BY payment_gateway, payment_status, DATE(payment_date)
ORDER BY payment_date DESC;

-- Create a view for Ozow-specific transactions
CREATE VIEW ozow_transactions AS
SELECT 
    payment_id,
    name,
    email,
    phone,
    social_media,
    caption,
    ozow_transaction_id,
    ozow_status,
    payment_status,
    payment_date,
    created_at
FROM entries 
WHERE payment_gateway = 'ozow'
ORDER BY created_at DESC;

-- Insert a test record to verify the migration (optional)
-- INSERT INTO entries (
--     payment_id, 
--     name, 
--     email, 
--     phone, 
--     social_media, 
--     caption, 
--     selfie, 
--     payment_status, 
--     payment_gateway,
--     created_at
-- ) VALUES (
--     'TEST-OZOW-001',
--     'Test User',
--     'test@example.com',
--     '0821234567',
--     '@testuser',
--     'Test entry for Ozow integration',
--     'test-selfie.jpg',
--     'pending',
--     'ozow',
--     NOW()
-- );

-- Verify the migration
SELECT 
    'Migration completed successfully' as status,
    COUNT(*) as total_entries,
    COUNT(CASE WHEN payment_gateway = 'ozow' THEN 1 END) as ozow_entries,
    COUNT(CASE WHEN payment_gateway = 'payfast' THEN 1 END) as payfast_entries
FROM entries;






